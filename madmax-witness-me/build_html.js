const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>기억해줘! (WITNESS ME!) - 매드맥스 분노의 도로</title>
  <link rel="stylesheet" href="style.css?t=${Date.now()}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Cinzel+Decorative:wght@700;900&family=Orbitron:wght@700;900&family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body class="wasteland-theme">
  <!-- 파티클 캔버스 (화염, 모래폭풍, 크롬 분진, 배기구 백파이어) -->
  <canvas id="fx-canvas"></canvas>

  <!-- 발할라 오버드라이브 풀스크린 배너 -->
  <div class="valhalla-banner" id="valhallaBanner">
    <div class="valhalla-banner-text" id="valhallaBannerText">⚡ WITNESS ME! SHINY AND CHROME! ⚡</div>
  </div>

  <!-- HTTPS 보안 배지 -->
  <div class="https-badge">
    <span class="rivet left"></span>
    <span class="lock-icon">🔒</span>
    <span class="protocol-text">HTTPS : VALHALLA SECURE V8</span>
    <span class="v8-badge">V8 HD MASTER</span>
    <span class="rivet right"></span>
  </div>

  <main class="container">
    <!-- 헤더 타이틀 -->
    <header class="header">
      <div class="subtitle-en">MAD MAX : FURY ROAD</div>
      <h1 class="main-title glitch-text" id="pageMainTitle" data-text="기억해줘!">기억해줘!</h1>
      <div class="witness-en" id="pageWitnessEn">WITNESS ME!</div>
    </header>

    <!-- 워보이 초고화질 HD 비디오 디스플레이 영역 -->
    <div class="warboy-card" id="warboyCard">
      <!-- 네 모서리 리벳 장식 -->
      <div class="corner-bolt top-left"></div>
      <div class="corner-bolt top-right"></div>
      <div class="corner-bolt bottom-left"></div>
      <div class="corner-bolt bottom-right"></div>

      <!-- 씬 모드 표시 배지 -->
      <div class="scene-badge" id="sceneBadge">🎬 HD 명장면: "기억해줘! (WITNESS ME!)"</div>

      <div class="visual-container" id="visualContainer">
        <!-- 초고화질 HD 비디오 플레이어 -->
        <video id="warboyVideo" class="warboy-video" autoplay loop muted playsinline preload="auto">
          <source id="videoSource" src="morsov_witness.mp4" type="video/mp4">
        </video>
        
        <!-- 영화관 실제 극장 공식 자막 오버레이 -->
        <div class="movie-subtitle-wrap">
          <div class="movie-subtitle" id="movieSubtitle">기 억 해 줘 !</div>
        </div>

        <div class="spray-flash-overlay" id="sprayOverlay"></div>
        <div class="chrome-splatter" id="chromeSplatter"></div>
        <!-- V8 불꽃 백파이어 배기구 -->
        <div class="exhaust-flame left" id="flameLeft"></div>
        <div class="exhaust-flame right" id="flameRight"></div>
      </div>

      <!-- V8 타코미터 & 계기판 상태 바 -->
      <div class="status-bar">
        <div class="stat-item rpm-item">
          <span class="stat-label">V8 RPM</span>
          <div class="rpm-meter">
            <div class="rpm-bar" id="rpmBar"></div>
          </div>
          <span class="rpm-value" id="rpmValue">1,200</span>
        </div>

        <div class="stat-item">
          <span class="stat-label">발할라 게이지</span>
          <div class="valhalla-meter">
            <div class="meter-fill" id="meterFill" style="width: 35%;"></div>
          </div>
        </div>

        <div class="stat-item">
          <span class="stat-label">증인들</span>
          <span class="stat-value" id="witnessCount">8,888</span>
        </div>
      </div>
    </div>

    <!-- 인터랙션 컨트롤 패널 -->
    <div class="controls-grid">
      <!-- 1. 기억해줘! (WITNESS ME!) 명장면 버튼 -->
      <button class="btn btn-witness-me highlight-btn" id="witnessMeBtn" title="단축키: 1 또는 W">
        <span class="btn-icon">🔥</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">기억해줘! (WITNESS ME!)</strong>
          <span class="btn-sub">HD WARBOY JUMP [1 / W]</span>
        </span>
      </button>

      <!-- 2. 기억할게! (WITNESSED!) 화답 버튼 -->
      <button class="btn btn-witness" id="witnessedBtn" title="단축키: 2 또는 E">
        <span class="btn-icon">💀</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">기억할게! (WITNESSED!)</strong>
          <span class="btn-sub">TO VALHALLA! [2 / E]</span>
        </span>
      </button>

      <!-- 3. FA솔루션 뿌시기! (파괴 폭발 버튼) -->
      <button class="btn btn-destroy-fa" id="destroyFaBtn" title="단축키: F">
        <span class="btn-icon">💥</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">FA솔루션 뿌시기!</strong>
          <span class="btn-sub">SMASH FA SOLUTION! [F]</span>
        </span>
      </button>

      <!-- 4. 크롬 락카 치이익! (Shiny & Chrome) -->
      <button class="btn btn-chrome" id="sprayBtn" title="단축키: C">
        <span class="btn-icon">🥫</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">크롬 락카 치이익!</strong>
          <span class="btn-sub">SHINY AND CHROME [C]</span>
        </span>
      </button>

      <!-- 5. V8 풀 악셀 굉음 -->
      <button class="btn btn-v8" id="v8RevBtn" title="단축키: Space">
        <span class="btn-icon">⚡</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">V8 풀 악셀 배기음!</strong>
          <span class="btn-sub">PEDAL TO METAL [Space]</span>
        </span>
      </button>

      <!-- 6. 기타맨 BGM & 기타 씬 토글 -->
      <button class="btn btn-sound" id="soundBtn" title="단축키: M">
        <span class="btn-icon" id="soundIcon">🎸</span>
        <span class="btn-text-wrap">
          <strong class="btn-title">두프 워리어 기타 BGM</strong>
          <span class="btn-sub" id="soundSub">HEAVY RIFF [M]</span>
        </span>
      </button>

      <!-- 7. 다른 명대사 릴레이 (2열 차지) -->
      <button class="btn btn-quote full-width" id="nextQuoteBtn" title="단축키: Q">
        <span class="btn-icon">📜</span>
        <span class="btn-text-wrap">
          <strong class="btn-title" id="quoteMainText">워보이 명대사 릴레이</strong>
          <span class="btn-sub" id="quoteSubText">"나는 살고, 죽고, 또다시 산다!" [Q]</span>
        </span>
      </button>
    </div>

    <!-- 키보드 조작 안내 툴바 -->
    <div class="keyboard-guide">
      <span>⌨️ <strong>키보드 조작:</strong></span>
      <kbd>1 / W</kbd> 기억해줘!
      <kbd>2 / E</kbd> 기억할게!
      <kbd>F</kbd> FA솔루션 뿌시기
      <kbd>C</kbd> 크롬 락카
      <kbd>Space</kbd> V8 풀악셀
      <kbd>M</kbd> 기타 사운드
      <kbd>Q</kbd> 명대사
    </div>

    <!-- 푸터 -->
    <footer class="footer">
      <div class="copyright">
        MAD MAX: FURY ROAD TRIBUTE &bull; HTTPS SECURE SERVER &bull; IMMORTAN JOE PRAISED
      </div>
    </footer>
  </main>

  <script src="app.js?t=${Date.now()}"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html, 'utf8');
console.log('HTML_WITH_FA_DESTROY_BUILT_SUCCESSFULLY');
