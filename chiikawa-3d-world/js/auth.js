// ==========================================================================
// 치이카와 3D 월드 - Firebase Auth & Cloud Firestore 연동 매니저
// ==========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlcCCyDQPx-YdgKJaQnFu8mDuN9OI2pqI",
  authDomain: "chiikawa-world.firebaseapp.com",
  projectId: "chiikawa-world",
  storageBucket: "chiikawa-world.firebasestorage.app",
  messagingSenderId: "68314924141",
  appId: "1:68314924141:web:ea1f3ca70e9f039823eb64",
  measurementId: "G-7WZ9S9700N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export class FirebaseManager {
  constructor(gameApp) {
    this.gameApp = gameApp;
    this.currentUser = null;
    this.isSyncing = false;
    this.lastSavedJson = '';

    this.initAuthListener();
  }

  initAuthListener() {
    let isInitialCheck = true;
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;
      this.updateAuthUI(user);

      if (user) {
        console.log("Firebase 로그인 성공:", user.email || user.displayName);
        if (typeof showToast === 'function') {
          showToast(`☁️ [${user.displayName || user.email.split('@')[0]}]님 계정으로 클라우드에 연결되었습니다!`);
        }
        await this.loadUserDataFromCloud();
        // 이미 로그인된 유저라면 시작 모달을 자동으로 닫음
        this.closeAuthModal();
      } else {
        console.log("게스트 모드로 진행 중");
        // 첫 화면에 로그인 및 회원가입 모달 자동 팝업!
        if (isInitialCheck) {
          setTimeout(() => {
            if (!this.currentUser) {
              this.openAuthModal();
            }
          }, 350);
        }
      }
      isInitialCheck = false;
    });
  }

  updateAuthUI(user) {
    const btnAuth = document.getElementById('hud-btn-auth');
    const authStatusText = document.getElementById('hud-auth-status');
    const modalProfile = document.getElementById('auth-modal-profile');
    const modalForms = document.getElementById('auth-modal-forms');

    if (!btnAuth || !authStatusText) return;

    if (user) {
      const name = user.displayName || user.email.split('@')[0];
      authStatusText.innerHTML = `☁️ <span style="color:#22c55e;">동기화됨</span>: <b>${name}</b>`;
      btnAuth.innerText = "👤 내 계정";
      if (modalProfile) modalProfile.style.display = 'block';
      if (modalForms) modalForms.style.display = 'none';

      const emailEl = document.getElementById('profile-email');
      const nameEl = document.getElementById('profile-name');
      if (emailEl) emailEl.innerText = user.email || 'Google 계정';
      if (nameEl) nameEl.innerText = name;
    } else {
      authStatusText.innerHTML = `💾 <span style="color:#f59e0b;">로컬 게스트</span>`;
      btnAuth.innerText = "🔑 로그인 / 백업";
      if (modalProfile) modalProfile.style.display = 'none';
      if (modalForms) modalForms.style.display = 'block';
    }
  }

  // Google 1초 간편 로그인
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.closeAuthModal();
      return result.user;
    } catch (err) {
      console.error("구글 로그인 실패:", err);
      alert(`구글 로그인 실패: ${err.message}`);
    }
  }

  // 이메일 로그인
  async loginWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.closeAuthModal();
      return result.user;
    } catch (err) {
      console.error("이메일 로그인 실패:", err);
      alert(`로그인 실패: ${err.message}`);
    }
  }

  // 이메일 회원가입
  async registerWithEmail(email, password, nickname) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (nickname) {
        await updateProfile(result.user, { displayName: nickname });
      }
      this.closeAuthModal();
      return result.user;
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert(`회원가입 실패: ${err.message}`);
    }
  }

  // 로그아웃
  async logout() {
    try {
      await signOut(auth);
      if (typeof showToast === 'function') {
        showToast("🚪 로그아웃되었습니다. 로컬 데이터로 전환됩니다.");
      }
      this.closeAuthModal();
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  }

  // 클라우드에서 유저 게임 세이브 데이터 불러오기
  async loadUserDataFromCloud() {
    if (!this.currentUser) return;
    try {
      const userDocRef = doc(db, "users", this.currentUser.uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        console.log("클라우드 세이브 데이터 수신:", cloudData);

        if (this.gameApp && cloudData.stats) {
          // 로컬 데이터와 비교하여 더 높은 진행도(더 높은 레벨 or 코인)가 있다면 병합
          const localStats = this.gameApp.stats;
          const mergedStats = {
            ...localStats,
            ...cloudData.stats,
            level: Math.max(localStats.level || 1, cloudData.stats.level || 1),
            coins: Math.max(localStats.coins || 0, cloudData.stats.coins || 0),
            weaponLv: Math.max(localStats.weaponLv || 1, cloudData.stats.weaponLv || 1),
            certLevel: Math.max(localStats.certLevel || 0, cloudData.stats.certLevel || 0),
            maxUnlockedStage: Math.max(localStats.maxUnlockedStage || 1, cloudData.stats.maxUnlockedStage || 1),
            weedsPulled: Math.max(localStats.weedsPulled || 0, cloudData.stats.weedsPulled || 0),
            monstersDefeated: Math.max(localStats.monstersDefeated || 0, cloudData.stats.monstersDefeated || 0)
          };

          this.gameApp.stats = mergedStats;
          this.gameApp.saveData(); // 로컬에도 갱신
          this.gameApp.updateHud();

          if (cloudData.activeCharKey && this.gameApp.activeCharKey !== cloudData.activeCharKey) {
            this.gameApp.spawnPlayer(cloudData.activeCharKey);
          }

          if (typeof showToast === 'function') {
            showToast("📥 클라우드 세이브 데이터를 성공적으로 동기화했습니다!");
          }
        }
      } else {
        // 첫 신규 유저 -> 현재 로컬 데이터를 클라우드로 최초 업로드
        console.log("신규 클라우드 유저: 로컬 세이브를 클라우드로 전송");
        await this.saveUserDataToCloud();
      }
    } catch (err) {
      console.error("클라우드 세이브 불러오기 실패:", err);
    }
  }

  // 클라우드 Firestore에 유저 게임 데이터 자동 저장
  async saveUserDataToCloud() {
    if (!this.currentUser || !this.gameApp) return;

    const dataToSave = {
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName || this.currentUser.email.split('@')[0],
      email: this.currentUser.email || '',
      activeCharKey: this.gameApp.activeCharKey,
      stats: this.gameApp.stats,
      updatedAt: serverTimestamp()
    };

    const curJson = JSON.stringify(dataToSave.stats);
    if (curJson === this.lastSavedJson && !this.isSyncing) {
      return; // 변경사항 없음
    }

    try {
      this.isSyncing = true;
      const userDocRef = doc(db, "users", this.currentUser.uid);
      await setDoc(userDocRef, dataToSave, { merge: true });
      this.lastSavedJson = curJson;
      console.log("☁️ Firestore 클라우드 저장 완료");
    } catch (err) {
      console.error("Firestore 저장 실패:", err);
    } finally {
      this.isSyncing = false;
    }
  }

  // 실시간 토벌 랭킹 리더보드 가져오기
  async fetchLeaderboard() {
    try {
      const q = query(
        collection(db, "users"), 
        orderBy("stats.maxUnlockedStage", "desc"),
        orderBy("stats.level", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const rankList = [];

      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        rankList.push({
          name: d.displayName || '토벌자',
          charKey: d.activeCharKey || 'chiikawa',
          level: d.stats?.level || 1,
          stage: d.stats?.maxUnlockedStage || 1,
          monsters: d.stats?.monstersDefeated || 0
        });
      });

      return rankList;
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
      return [];
    }
  }

  openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('visible');
    }
  }

  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.remove('visible');
    }
  }
}
