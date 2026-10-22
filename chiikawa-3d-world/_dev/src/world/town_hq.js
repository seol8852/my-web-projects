// ==========================================================================
// 치이카와 3D 월드 - 마을 구조물 & 소품 고퀄리티 리메이크 (town_hq.js)
//  · 기존 단순 도형(박스·원뿔) 구조물을 디테일한 툰 모델로 교체
//    (치이카와 하우스 · 분수 · 라멘 포차 · 의상실 · 풍차 · 캠핑장 · 온천 · 포털 · 유적)
//  · 손그림 느낌의 캔버스 텍스처 (나무판자, 기와, 돌벽, 회벽, 줄무늬 천)
//  · 마을 소품: 가로등, 벤치, 화분, 울타리, 표지판, 나무통·상자, 우체통, 덤불
//  · models3d.js의 같은 이름 함수를 덮어쓰기 (main.js 수정 최소화)
// ==========================================================================
const TOWNHQ = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const GM = () => (typeof getToonGradientMap === 'function' ? getToonGradientMap() : null);
  const outline = (m, t = 0.03, c) => { if (typeof addCartoonOutline === 'function') addCartoonOutline(m, t, c); return m; };
  const shadow = (m, cast = true, recv = true) => { m.castShadow = cast; m.receiveShadow = recv; return m; };
  let RS = 12345; // 난수 상태 (빌더마다 이름으로 고정 → 구운 모델과 실제 배치·충돌이 항상 일치)
  const rnd = () => { RS = (RS * 16807) % 2147483647; return RS / 2147483647; };
  const animated = []; // 매 프레임 갱신할 소품 (연기, 불꽃, 물줄기, 등불)

  // ------------------------------------------------------------------
  // 손그림 캔버스 텍스처
  // ------------------------------------------------------------------
  const texCache = {};
  function canvasTex(name, size, draw, repeat = [1, 1]) {
    const key = `${name}|${repeat.join('x')}`;
    if (texCache[key]) return texCache[key];
    let base = texCache[name];
    if (!base) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      draw(c.getContext('2d'), size);
      base = new THREE.CanvasTexture(c);
      base.wrapS = base.wrapT = THREE.RepeatWrapping;
      base.anisotropy = 4;
      texCache[name] = base;
    }
    if (repeat[0] === 1 && repeat[1] === 1) return base;
    const t = base.clone();
    t.needsUpdate = true;
    t.repeat.set(repeat[0], repeat[1]);
    texCache[key] = t;
    return t;
  }
  const hex = n => '#' + n.toString(16).padStart(6, '0');
  function jitter(ctx, s, n, col, a, size) {
    ctx.fillStyle = col;
    for (let i = 0; i < n; i++) {
      ctx.globalAlpha = a * (0.4 + rnd() * 0.6);
      ctx.fillRect(rnd() * s, rnd() * s, size * (0.5 + rnd()), size * (0.5 + rnd()));
    }
    ctx.globalAlpha = 1;
  }
  const TEX = {
    // 나무 판자 (세로 줄)
    plank: () => canvasTex('plank', 256, (ctx, s) => {
      const cols = ['#c98a4f', '#b9783f', '#d39858', '#be8146'];
      const n = 6;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = cols[i % cols.length];
        ctx.fillRect((i * s) / n, 0, s / n, s);
        ctx.strokeStyle = 'rgba(90,50,20,0.25)';
        ctx.lineWidth = 1.5;
        for (let k = 0; k < 4; k++) {
          ctx.beginPath();
          const x = (i * s) / n + 6 + rnd() * (s / n - 12);
          ctx.moveTo(x, 0);
          ctx.bezierCurveTo(x + 4, s * 0.3, x - 4, s * 0.6, x + 2, s);
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(70,35,10,0.55)';
        ctx.fillRect((i * s) / n, 0, 3, s);
        if (rnd() < 0.7) {
          ctx.beginPath();
          ctx.ellipse((i + 0.5) * s / n, rnd() * s, 4, 7, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(90,50,20,0.4)';
          ctx.fill();
        }
      }
    }),
    // 가로 판자 (데크, 벽)
    plankH: () => canvasTex('plankH', 256, (ctx, s) => {
      const cols = ['#d9a066', '#c88d55', '#e0aa70', '#cf9660'];
      const n = 7;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = cols[i % cols.length];
        ctx.fillRect(0, (i * s) / n, s, s / n);
        ctx.fillStyle = 'rgba(90,50,20,0.5)';
        ctx.fillRect(0, (i * s) / n, s, 3);
        const off = rnd() * s;
        ctx.fillRect(off, (i * s) / n, 3, s / n);
      }
      jitter(ctx, s, 300, '#7a4520', 0.15, 3);
    }),
    // 비늘 기와 (지붕)
    shingle: () => canvasTex('shingle', 256, (ctx, s) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, s, s);
      const rows = 8, cols = 8;
      for (let r = 0; r < rows; r++) {
        for (let c = -1; c <= cols; c++) {
          const x = (c + (r % 2) * 0.5) * (s / cols);
          const y = r * (s / rows);
          const g = 0.82 + ((r * 7 + c * 3) % 5) * 0.04;
          ctx.fillStyle = `rgb(${Math.round(255 * g)},${Math.round(255 * g)},${Math.round(255 * g)})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + s / cols, y);
          ctx.lineTo(x + s / cols, y + (s / rows) * 0.6);
          ctx.arc(x + s / cols / 2, y + (s / rows) * 0.6, s / cols / 2, 0, Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = 'rgba(60,30,40,0.35)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }),
    // 회벽 (살짝 얼룩진 크림색)
    plaster: () => canvasTex('plaster', 256, (ctx, s) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, s, s);
      jitter(ctx, s, 900, '#d9cbb4', 0.12, 6);
      jitter(ctx, s, 400, '#ffffff', 0.3, 5);
    }),
    // 돌담 / 벽돌
    brick: () => canvasTex('brick', 256, (ctx, s) => {
      ctx.fillStyle = '#7d5a4a';
      ctx.fillRect(0, 0, s, s);
      const rows = 8, cols = 4;
      for (let r = 0; r < rows; r++) {
        for (let c = -1; c <= cols; c++) {
          const x = (c + (r % 2) * 0.5) * (s / cols) + 3;
          const y = r * (s / rows) + 3;
          const g = 0.85 + rnd() * 0.25;
          ctx.fillStyle = `rgb(${Math.round(196 * g)},${Math.round(116 * g)},${Math.round(92 * g)})`;
          ctx.fillRect(x, y, s / cols - 6, s / rows - 6);
        }
      }
    }),
    cobble: () => canvasTex('cobble', 256, (ctx, s) => {
      ctx.fillStyle = '#8f8a80';
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 70; i++) {
        const x = rnd() * s, y = rnd() * s, r = 12 + rnd() * 16;
        const g = 0.8 + rnd() * 0.35;
        ctx.fillStyle = `rgb(${Math.round(200 * g)},${Math.round(194 * g)},${Math.round(182 * g)})`;
        ctx.beginPath();
        ctx.ellipse(x, y, r, r * (0.7 + rnd() * 0.3), rnd() * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(70,65,60,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }),
    stripe: (a = '#ff6b8a', b = '#ffffff') => canvasTex(`stripe${a}${b}`, 128, (ctx, s) => {
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = i % 2 ? b : a;
        ctx.fillRect((i * s) / 8, 0, s / 8, s);
      }
    }),
    ringWood: () => canvasTex('ringWood', 128, (ctx, s) => {
      ctx.fillStyle = '#e3b77c';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(140,90,40,0.6)';
      for (let r = 6; r < s / 2; r += 7) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s / 2, s / 2, r + rnd() * 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }),
    stone: () => canvasTex('stone', 256, (ctx, s) => {
      ctx.fillStyle = '#c9c4ba';
      ctx.fillRect(0, 0, s, s);
      jitter(ctx, s, 1200, '#8d877c', 0.18, 4);
      ctx.strokeStyle = 'rgba(90,85,78,0.45)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        let x = rnd() * s, y = rnd() * s;
        ctx.moveTo(x, y);
        for (let k = 0; k < 4; k++) { x += (rnd() - 0.5) * 50; y += rnd() * 30; ctx.lineTo(x, y); }
        ctx.stroke();
      }
    }),
    moss: () => canvasTex('moss', 256, (ctx, s) => {
      ctx.fillStyle = '#b8b2a6';
      ctx.fillRect(0, 0, s, s);
      jitter(ctx, s, 900, '#7f796e', 0.2, 5);
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(${90 + rnd() * 30},${140 + rnd() * 40},${60 + rnd() * 20},0.55)`;
        ctx.beginPath();
        ctx.ellipse(rnd() * s, rnd() * s * 0.4 + s * 0.6, 8 + rnd() * 20, 5 + rnd() * 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }),
    noren: (text, bg, fg) => canvasTex(`noren${text}${bg}`, 256, (ctx, s) => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      for (let i = 1; i < 4; i++) ctx.fillRect((i * s) / 4 - 2, s * 0.35, 4, s);
      ctx.fillStyle = fg;
      ctx.font = `900 ${Math.round(s * 0.28)}px Pretendard, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, s / 2, s * 0.22);
    })
  };

  // 재질 헬퍼
  const matCache = {};
  function toon(color, texFn, repeat, extra = {}) {
    const baseT = texFn ? texFn() : null; // 텍스처 uuid로 캐시 (색이 다른 줄무늬가 섞이지 않도록)
    const key = `${color}|${baseT ? baseT.uuid : ''}|${repeat ? repeat.join('x') : ''}|${JSON.stringify(extra)}`;
    if (matCache[key]) return matCache[key];
    const opt = Object.assign({ color, gradientMap: GM() }, extra);
    if (baseT) {
      let t = baseT;
      if (repeat) { t = t.clone(); t.needsUpdate = true; t.repeat.set(repeat[0], repeat[1]); }
      opt.map = t;
    }
    return (matCache[key] = new THREE.MeshToonMaterial(opt));
  }
  const basic = (color, extra = {}) => new THREE.MeshBasicMaterial(Object.assign({ color }, extra));

  // 둥근 모서리 박스 (베벨)
  function roundBox(w, h, d, r = 0.15, seg = 3) {
    r = Math.min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01);
    const s = new THREE.Shape();
    const x = -w / 2 + r, y = -h / 2 + r, ww = w - 2 * r, hh = h - 2 * r;
    s.moveTo(x, y);
    s.lineTo(x + ww, y);
    s.lineTo(x + ww, y + hh);
    s.lineTo(x, y + hh);
    s.lineTo(x, y);
    const g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.01, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r, bevelSegments: seg, curveSegments: 4 });
    g.translate(0, 0, -(d - 2 * r) / 2);
    g.computeVertexNormals();
    return g;
  }
  // 아치형 (문/창) 셰이프
  function archShape(w, h) {
    const s = new THREE.Shape();
    const r = w / 2;
    s.moveTo(-r, 0);
    s.lineTo(r, 0);
    s.lineTo(r, h - r);
    s.absarc(0, h - r, r, 0, Math.PI, false);
    s.lineTo(-r, 0);
    return s;
  }
  function mesh(geo, mat, cast = true) {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = cast;
    m.receiveShadow = true;
    return m;
  }
  function glowSprite(color, size, opacity = 0.8) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: typeof fxTex === 'function' ? fxTex('glow') : null, color, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sp.scale.setScalar(size);
    return sp;
  }

  // ------------------------------------------------------------------
  // 공용 소품
  // ------------------------------------------------------------------
  function flowerCluster(colors = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc], n = 6, spread = 0.5) {
    const g = new THREE.Group();
    const stem = toon(0x4f9a2f);
    for (let i = 0; i < n; i++) {
      const f = new THREE.Group();
      const st = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 5), stem, false);
      st.position.y = 0.22;
      f.add(st);
      const col = colors[i % colors.length];
      for (let k = 0; k < 5; k++) {
        const pt = mesh(new THREE.SphereGeometry(0.09, 6, 5), toon(col), false);
        const a = (k / 5) * Math.PI * 2;
        pt.position.set(Math.cos(a) * 0.09, 0.47, Math.sin(a) * 0.09);
        pt.scale.y = 0.5;
        f.add(pt);
      }
      const c = mesh(new THREE.SphereGeometry(0.06, 6, 5), toon(0xfacc15), false);
      c.position.y = 0.49;
      f.add(c);
      f.position.set((rnd() - 0.5) * spread * 2, 0, (rnd() - 0.5) * spread * 2);
      f.scale.setScalar(0.8 + rnd() * 0.5);
      g.add(f);
    }
    return g;
  }
  function flowerBox(w = 1.6) {
    const g = new THREE.Group();
    const box = mesh(roundBox(w, 0.38, 0.45, 0.06), toon(0xffffff, TEX.plankH, [1, 0.3]));
    box.position.y = 0.19;
    outline(box, 0.03);
    g.add(box);
    const soil = mesh(new THREE.BoxGeometry(w - 0.12, 0.05, 0.33), toon(0x6b4423), false);
    soil.position.y = 0.37;
    g.add(soil);
    const fl = flowerCluster(undefined, Math.round(w * 4), 0.1);
    fl.scale.set(1, 0.7, 1);
    fl.children.forEach((f, i) => { f.position.set(-w / 2 + 0.15 + (i / Math.max(1, fl.children.length - 1)) * (w - 0.3), 0.36, (rnd() - 0.5) * 0.16); });
    g.add(fl);
    return g;
  }
  function pot(color = 0xe07a5f, plant = 'flower') {
    const g = new THREE.Group();
    const pts = [V(0.0, 0), V(0.32, 0), V(0.42, 0.55), V(0.48, 0.6), V(0.48, 0.7), V(0.0, 0.7)].map(v => new THREE.Vector2(v.x, v.y));
    const p = mesh(new THREE.LatheGeometry(pts, 16), toon(color));
    outline(p, 0.04);
    g.add(p);
    g.userData.colliders = [{ c: [0, 0], r: 0.5, h: 0.7, stand: true }];
    if (plant === 'bush') {
      const b = mesh(new THREE.IcosahedronGeometry(0.55, 1), toon(0x5fae3e));
      b.position.y = 1.05;
      outline(b, 0.04);
      g.add(b);
    } else {
      const fl = flowerCluster(undefined, 5, 0.18);
      fl.position.y = 0.62;
      g.add(fl);
      g.userData.colliders = [{ c: [0, 0], r: 0.5, h: 0.7, stand: true }];
      const leaves = mesh(new THREE.IcosahedronGeometry(0.38, 0), toon(0x6cbf4a), false);
      leaves.position.y = 0.75;
      leaves.scale.y = 0.6;
      g.add(leaves);
    }
    return g;
  }
  function streetLamp() {
    const g = new THREE.Group();
    const iron = toon(0x3b3550);
    const base = mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.5, 10), iron);
    base.position.y = 0.25;
    g.add(base);
    const post = mesh(new THREE.CylinderGeometry(0.1, 0.13, 3.6, 10), iron);
    post.position.y = 2.2;
    outline(post, 0.05);
    g.add(post);
    const ringM = mesh(new THREE.TorusGeometry(0.16, 0.05, 6, 12), iron, false);
    ringM.rotation.x = Math.PI / 2;
    ringM.position.y = 1.2;
    g.add(ringM);
    const arm = mesh(new THREE.TorusGeometry(0.45, 0.05, 6, 12, Math.PI), iron, false);
    arm.position.set(0.45, 4.0, 0);
    g.add(arm);
    // 랜턴 (유리 + 지붕)
    const lantern = new THREE.Group();
    lantern.position.set(0.9, 3.55, 0);
    const glass = mesh(new THREE.CylinderGeometry(0.22, 0.17, 0.5, 6), basic(0xfff1b8), false);
    lantern.add(glass);
    const cap = mesh(new THREE.ConeGeometry(0.33, 0.28, 6), iron, false);
    cap.position.y = 0.38;
    lantern.add(cap);
    const bottom = mesh(new THREE.CylinderGeometry(0.2, 0.12, 0.08, 6), iron, false);
    bottom.position.y = -0.28;
    lantern.add(bottom);
    const glow = glowSprite(0xffd27a, 2.4, 0.55);
    lantern.add(glow);
    g.add(lantern);
    animated.push({ type: 'lamp', glow, glass, phase: rnd() * 6 });
    g.userData.colliders = [{ c: [0, 0], r: 0.42, h: 4.3 }];
    return g;
  }
  function bench() {
    const g = new THREE.Group();
    const wood = toon(0xffffff, TEX.plankH, [1, 0.5]);
    const iron = toon(0x3b3550);
    for (let i = 0; i < 3; i++) {
      const slat = mesh(roundBox(2.4, 0.08, 0.22, 0.03), wood);
      slat.position.set(0, 0.62, -0.25 + i * 0.25);
      g.add(slat);
    }
    for (let i = 0; i < 2; i++) {
      const back = mesh(roundBox(2.4, 0.2, 0.06, 0.03), wood);
      back.position.set(0, 0.95 + i * 0.28, -0.42);
      back.rotation.x = -0.15;
      g.add(back);
    }
    [-1.0, 1.0].forEach(x => {
      const leg = mesh(roundBox(0.1, 0.62, 0.7, 0.03), iron);
      leg.position.set(x, 0.31, -0.05);
      g.add(leg);
      const bl = mesh(roundBox(0.08, 0.75, 0.08, 0.02), iron);
      bl.position.set(x, 0.95, -0.42);
      g.add(bl);
    });
    outline(g.children[0], 0.04);
    g.userData.colliders = [{ b: [0, -0.1], w: 2.5, d: 0.9, h: 0.7, stand: true }];
    return g;
  }
  function barrel() {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      pts.push(new THREE.Vector2(0.5 + Math.sin(t * Math.PI) * 0.1, t * 1.3));
    }
    const g = new THREE.Group();
    const b = mesh(new THREE.LatheGeometry(pts, 16), toon(0xffffff, TEX.plank, [2, 1]));
    outline(b, 0.03);
    g.add(b);
    [0.15, 0.65, 1.15].forEach(y => {
      const band = mesh(new THREE.TorusGeometry(0.53 + Math.sin((y / 1.3) * Math.PI) * 0.1, 0.035, 5, 18), toon(0x52525b), false);
      band.rotation.x = Math.PI / 2;
      band.position.y = y;
      g.add(band);
    });
    const top = mesh(new THREE.CircleGeometry(0.5, 16), toon(0xffffff, TEX.ringWood), false);
    top.rotation.x = -Math.PI / 2;
    top.position.y = 1.3;
    g.add(top);
    g.userData.colliders = [{ c: [0, 0], r: 0.62, h: 1.3, stand: true }];
    return g;
  }
  function crate(s = 1) {
    const g = new THREE.Group();
    const b = mesh(roundBox(s, s, s, 0.05), toon(0xffffff, TEX.plankH, [1, 0.6]));
    b.position.y = s / 2;
    outline(b, 0.03);
    g.add(b);
    const beam = toon(0x9a6232);
    [-1, 1].forEach(side => {
      const x = mesh(new THREE.BoxGeometry(s * 1.32, 0.09, 0.06), beam, false);
      x.rotation.z = side * Math.PI / 4;
      x.position.set(0, s / 2, s / 2 + 0.02);
      g.add(x);
    });
    g.userData.colliders = [{ b: [0, 0], w: s, d: s, h: s, stand: true }];
    return g;
  }
  function fence(len = 6, posts = 4) {
    const g = new THREE.Group();
    const wood = toon(0xffffff, TEX.plank, [0.3, 1]);
    for (let i = 0; i < posts; i++) {
      const x = -len / 2 + (i / (posts - 1)) * len;
      const p = mesh(roundBox(0.22, 1.3, 0.22, 0.05), wood);
      p.position.set(x, 0.65, 0);
      const tip = mesh(new THREE.ConeGeometry(0.16, 0.25, 4), wood, false);
      tip.position.set(x, 1.42, 0);
      tip.rotation.y = Math.PI / 4;
      g.add(p, tip);
    }
    [0.45, 0.95].forEach(y => {
      const rail = mesh(roundBox(len, 0.12, 0.08, 0.03), wood);
      rail.position.set(0, y, 0.12);
      g.add(rail);
    });
    g.userData.colliders = [{ b: [0, 0.05], w: len + 0.2, d: 0.45, h: 1.5 }];
    return g;
  }
  function bush(r = 1) {
    const g = new THREE.Group();
    const cols = [0x5fae3e, 0x6cbf4a, 0x4e9a33];
    for (let i = 0; i < 4; i++) {
      const b = mesh(new THREE.IcosahedronGeometry(r * (0.6 + rnd() * 0.35), 1), toon(cols[i % 3]));
      b.position.set((rnd() - 0.5) * r, r * 0.45 + rnd() * r * 0.2, (rnd() - 0.5) * r);
      b.scale.y = 0.8;
      outline(b, 0.03);
      g.add(b);
    }
    if (rnd() < 0.5) {
      for (let i = 0; i < 4; i++) {
        const be = mesh(new THREE.SphereGeometry(0.1 * r, 6, 5), toon(rnd() < 0.5 ? 0xff6b8a : 0xfff5f7), false);
        const a = rnd() * Math.PI * 2;
        be.position.set(Math.cos(a) * r * 0.75, r * 0.7 + rnd() * r * 0.3, Math.sin(a) * r * 0.75);
        g.add(be);
      }
    }
    return g;
  }
  function signpost(labels) {
    const g = new THREE.Group();
    const wood = toon(0xffffff, TEX.plank, [0.4, 1]);
    const post = mesh(roundBox(0.25, 3.4, 0.25, 0.06), wood);
    post.position.y = 1.7;
    outline(post, 0.04);
    g.add(post);
    labels.forEach((lb, i) => {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 64;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#f5d7a1';
      ctx.fillRect(0, 0, 256, 64);
      ctx.strokeStyle = '#8a5a2b';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, 250, 58);
      ctx.fillStyle = '#5b3412';
      ctx.font = '900 30px Pretendard, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(lb.text, 128, 34);
      const t = new THREE.CanvasTexture(c);
      t.anisotropy = 4;
      const board = new THREE.Group();
      const b = mesh(new THREE.BoxGeometry(1.9, 0.45, 0.08), [toon(0xd9a066), toon(0xd9a066), toon(0xd9a066), toon(0xd9a066), basic(0xffffff, { map: t }), basic(0xffffff, { map: t })]);
      b.position.x = 0.85;
      board.add(b);
      const tip = mesh(new THREE.CylinderGeometry(0, 0.32, 0.45, 3), toon(0xd9a066), false);
      tip.rotation.z = -Math.PI / 2;
      tip.rotation.x = Math.PI / 2;
      tip.position.x = 1.95;
      board.add(tip);
      board.position.y = 2.9 - i * 0.6;
      board.rotation.y = lb.yaw;
      g.add(board);
    });
    g.userData.colliders = [{ c: [0, 0], r: 0.3, h: 3.4 }];
    return g;
  }
  function mailbox() {
    const g = new THREE.Group();
    const post = mesh(roundBox(0.16, 1.1, 0.16, 0.04), toon(0xffffff, TEX.plank, [0.3, 1]));
    post.position.y = 0.55;
    g.add(post);
    const box = new THREE.Group();
    const body = mesh(roundBox(0.5, 0.4, 0.75, 0.08), toon(0xff6b8a));
    outline(body, 0.05);
    box.add(body);
    const top = mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.75, 12, 1, false, 0, Math.PI), toon(0xff6b8a), false);
    top.rotation.z = Math.PI / 2;
    top.rotation.y = Math.PI / 2;
    top.position.y = 0.2;
    box.add(top);
    const flag = mesh(new THREE.BoxGeometry(0.04, 0.3, 0.14), toon(0xfacc15), false);
    flag.position.set(0.27, 0.3, -0.1);
    box.add(flag);
    box.position.y = 1.25;
    g.add(box);
    g.userData.colliders = [{ c: [0, 0], r: 0.38, h: 1.6 }];
    return g;
  }
  function paperLantern(color = 0xff4d4d, size = 0.6) {
    const g = new THREE.Group();
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(new THREE.Vector2(Math.sin(t * Math.PI) * size * 0.75 + 0.05, (t - 0.5) * size * 1.6));
    }
    const body = mesh(new THREE.LatheGeometry(pts, 14), basic(color), false);
    g.add(body);
    for (let k = -2; k <= 2; k++) {
      const rib = mesh(new THREE.TorusGeometry(Math.cos((k / 3) * Math.PI / 2) * size * 0.75 + 0.05, 0.015, 4, 16), basic(0x7f1d1d), false);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = (k / 6) * size * 1.6 * 0.95;
      g.add(rib);
    }
    [-1, 1].forEach(s => {
      const cap = mesh(new THREE.CylinderGeometry(size * 0.3, size * 0.3, 0.1, 10), toon(0x1f1f1f), false);
      cap.position.y = s * size * 0.82;
      g.add(cap);
    });
    const glow = glowSprite(color, size * 4, 0.45);
    g.add(glow);
    animated.push({ type: 'lantern', g, glow, phase: rnd() * 6 });
    return g;
  }
  function smokePuffs(parent, pos, color = 0xf1f5f9) {
    const puffs = [];
    for (let i = 0; i < 5; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: typeof fxTex === 'function' ? fxTex('smoke') : null, color, transparent: true, opacity: 0.6, depthWrite: false
      }));
      sp.position.copy(pos);
      parent.add(sp);
      puffs.push({ sp, t: i / 5 });
    }
    animated.push({ type: 'smoke', puffs, base: pos.clone() });
  }

  // ------------------------------------------------------------------
  // 1) 치이카와 하우스
  // ------------------------------------------------------------------
  function house() {
    const g = new THREE.Group();
    const R = 5.6;
    // 돌 기초
    const found = mesh(new THREE.CylinderGeometry(R + 0.35, R + 0.6, 0.7, 40), toon(0xffffff, TEX.cobble, [6, 0.6]));
    found.position.y = 0.35;
    outline(found, 0.015);
    g.add(found);
    // 회벽 돔
    const dome = mesh(new THREE.SphereGeometry(R, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.62), toon(0xfff8ea, TEX.plaster, [3, 2]));
    dome.position.y = 0.55;
    outline(dome, 0.018);
    g.add(dome);
    // 나무 골조 (세로 리브)
    const ribMat = toon(0xa86b3c);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      if (Math.abs(Math.sin(a) - 1) < 0.3) continue; // 문 쪽 제외
      const rib = mesh(new THREE.TorusGeometry(R + 0.02, 0.09, 6, 24, Math.PI * 0.42), ribMat, false);
      rib.rotation.set(0, -a, Math.PI / 2 - Math.PI * 0.42 + 0.02);
      rib.position.y = 0.55;
      g.add(rib);
    }
    const belt = mesh(new THREE.TorusGeometry(R * 0.93, 0.12, 6, 48), ribMat, false);
    belt.rotation.x = Math.PI / 2;
    belt.position.y = 2.6;
    g.add(belt);
    // 기와 지붕 (분홍 비늘)
    const roofR = R + 0.25;
    const roof = mesh(new THREE.SphereGeometry(roofR, 48, 20, 0, Math.PI * 2, 0, Math.PI * 0.3), toon(0xff8fab, TEX.shingle, [10, 2]));
    roof.position.y = 0.6;
    outline(roof, 0.018);
    g.add(roof);
    // 지붕 가장자리 물결 장식
    const edgeY = 0.6 + roofR * Math.cos(Math.PI * 0.3);
    const edgeR = roofR * Math.sin(Math.PI * 0.3);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const sc = mesh(new THREE.SphereGeometry(0.42, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), toon(0xff6b8f), false);
      sc.position.set(Math.cos(a) * edgeR, edgeY - 0.05, Math.sin(a) * edgeR);
      sc.rotation.x = Math.PI;
      sc.scale.set(1, 0.6, 1);
      g.add(sc);
    }
    // 꼭대기 장식 (손잡이 + 별 풍향계)
    const knob = mesh(new THREE.SphereGeometry(0.55, 16, 12), toon(0xff6b8f));
    knob.position.y = 0.6 + roofR + 0.25;
    outline(knob, 0.05);
    g.add(knob);
    const vane = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 6), toon(0x3b3550), false);
    vane.position.y = knob.position.y + 0.9;
    g.add(vane);
    const star = mesh(new THREE.OctahedronGeometry(0.35, 0), toon(0xfde047, null, null, { emissive: 0x8a6d00 }));
    star.position.y = knob.position.y + 1.6;
    star.scale.set(1, 1, 0.45);
    outline(star, 0.06);
    g.add(star);
    animated.push({ type: 'spin', obj: star, speed: 1.2 });
    // 벽돌 굴뚝 + 연기
    const ch = new THREE.Group();
    const chBody = mesh(roundBox(1.2, 3.0, 1.2, 0.1), toon(0xffffff, TEX.brick, [1, 1.6]));
    chBody.position.y = 1.5;
    outline(chBody, 0.03);
    ch.add(chBody);
    const chCap = mesh(roundBox(1.55, 0.3, 1.55, 0.08), toon(0x7d5a4a));
    chCap.position.y = 3.1;
    ch.add(chCap);
    ch.position.set(2.6, 3.6, -1.8);
    g.add(ch);
    smokePuffs(g, V(2.6, 7.1, -1.8));
    // 아치 문 (판자 + 문틀 + 손잡이 + 차양)
    const doorG = new THREE.Group();
    const doorGeo = new THREE.ExtrudeGeometry(archShape(2.0, 3.0), { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 });
    const door = mesh(doorGeo, toon(0xffffff, TEX.plank, [0.6, 0.6]));
    outline(door, 0.03);
    doorG.add(door);
    const frame = mesh(new THREE.ExtrudeGeometry((() => { const s = archShape(2.6, 3.4); s.holes.push(new THREE.Path(archShape(2.0, 3.0).getPoints(24))); return s; })(), { depth: 0.45, bevelEnabled: false }), toon(0xfff3d6));
    frame.position.z = -0.1;
    outline(frame, 0.03);
    doorG.add(frame);
    const handle = mesh(new THREE.SphereGeometry(0.12, 10, 8), toon(0xfacc15, null, null, { emissive: 0x6b5200 }), false);
    handle.position.set(0.6, 1.35, 0.4);
    doorG.add(handle);
    const winD = mesh(new THREE.CircleGeometry(0.32, 16), basic(0xfff1b8), false);
    winD.position.set(0, 2.3, 0.37);
    doorG.add(winD);
    animated.push({ type: 'window', mat: winD.material });
    doorG.position.set(0, 0.7, R - 0.55);
    g.add(doorG);
    // 차양 (줄무늬 천 + 물결 끝단)
    const awnG = new THREE.Group();
    const awn = mesh(roundBox(3.0, 0.1, 1.3, 0.04), toon(0xffffff, () => TEX.stripe('#ff8fab', '#ffffff'), [2, 1]));
    awn.position.z = 0.6;
    outline(awn, 0.03);
    awnG.add(awn);
    for (let i = 0; i < 7; i++) {
      const sc = mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.08, 12, 1, false, Math.PI / 2, Math.PI), toon(i % 2 ? 0xffffff : 0xff8fab), false);
      sc.rotation.x = Math.PI / 2;
      sc.position.set(-1.29 + i * 0.43, 0, 1.24);
      awnG.add(sc);
    }
    awnG.rotation.x = 0.42;
    awnG.position.set(0, 4.05, R - 0.45);
    g.add(awnG);
    // 계단 2단 + 발판
    [0, 1].forEach(i => {
      const st = mesh(roundBox(2.8 - i * 0.4, 0.25, 0.9, 0.06), toon(0xffffff, TEX.stone));
      st.position.set(0, 0.12 + i * 0.25, R + 0.85 - i * 0.45);
      g.add(st);
    });
    const mat = mesh(roundBox(1.8, 0.05, 0.9, 0.03), toon(0xff8fab, () => TEX.stripe('#ff8fab', '#ffd1dc'), [1, 1]), false);
    mat.position.set(0, 0.05, R + 2.0);
    g.add(mat);
    // 동그란 창문 (십자 창살 + 화분 상자)
    [-1, 1].forEach(side => {
      const a = Math.PI / 2 + side * 0.62;
      const wx = Math.cos(a) * (R - 0.15), wz = Math.sin(a) * (R - 0.15);
      const win = new THREE.Group();
      const frameW = mesh(new THREE.TorusGeometry(0.85, 0.16, 10, 28), toon(0xa86b3c));
      outline(frameW, 0.05);
      win.add(frameW);
      const glass = mesh(new THREE.CircleGeometry(0.8, 24), basic(0xfff1b8), false);
      glass.position.z = -0.03;
      win.add(glass);
      animated.push({ type: 'window', mat: glass.material });
      const bar1 = mesh(new THREE.BoxGeometry(1.6, 0.08, 0.06), toon(0xa86b3c), false);
      const bar2 = mesh(new THREE.BoxGeometry(0.08, 1.6, 0.06), toon(0xa86b3c), false);
      win.add(bar1, bar2);
      const curtain = mesh(new THREE.CircleGeometry(0.8, 24, Math.PI * 0.55, Math.PI * 0.9), basic(0xffc2d1), false);
      curtain.position.z = -0.01;
      win.add(curtain);
      win.position.set(wx, 3.0, wz);
      win.lookAt(wx * 2, 3.0, wz * 2);
      g.add(win);
      const fb = flowerBox(1.7);
      fb.position.set(wx * 1.03, 1.95, wz * 1.03);
      fb.lookAt(wx * 2, 1.95, wz * 2);
      g.add(fb);
    });
    // 집 앞 소품: 우체통, 화분, 작은 정원 울타리, 피크닉 케이크
    const mb = mailbox();
    mb.position.set(3.4, 0, R + 2.4);
    mb.rotation.y = -0.4;
    g.add(mb);
    [[-2.2, R + 1.6], [2.2, R + 1.6]].forEach(([x, z], i) => {
      const pt = pot(i ? 0x8ecae6 : 0xe07a5f, i ? 'bush' : 'flower');
      pt.position.set(x, 0, z);
      g.add(pt);
    });
    const fc = fence(4.2, 4);
    fc.position.set(-5.4, 0, R + 1.2);
    fc.rotation.y = 0.5;
    g.add(fc);
    const picnic = mesh(roundBox(3.6, 0.06, 2.8, 0.03), toon(0xffffff, () => TEX.stripe('#fb7185', '#fff1f2'), [3, 1]), false);
    picnic.position.set(-4.6, 0.05, 6.4);
    picnic.rotation.y = 0.3;
    g.add(picnic);
    const cake = new THREE.Group();
    const c1 = mesh(new THREE.CylinderGeometry(0.6, 0.62, 0.42, 20), toon(0xf6d7a7));
    c1.position.y = 0.26;
    outline(c1, 0.05);
    const cream = mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 20), toon(0xffffff), false);
    cream.position.y = 0.5;
    const berry = mesh(new THREE.SphereGeometry(0.13, 10, 8), toon(0xef4444), false);
    berry.position.y = 0.62;
    cake.add(c1, cream, berry);
    cake.position.set(-4.6, 0.05, 6.4);
    g.add(cake);
    g.userData.colliders = [{ c: [0, 0], r: 6.1 }, { c: [3.4, R + 2.4], r: 0.45, h: 1.6 }, { c: [-2.2, R + 1.6], r: 0.55, h: 1.0, stand: true }, { c: [2.2, R + 1.6], r: 0.55, h: 1.0, stand: true },
      { b: [-5.4, R + 1.2], w: 4.2, d: 0.5, ry: 0.5, h: 1.5 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 2) 광장 분수 (선반 프로파일 + 물결 + 물줄기)
  // ------------------------------------------------------------------
  function fountain() {
    const g = new THREE.Group();
    const stoneM = toon(0xffffff, TEX.stone, [4, 1]);
    // 바닥 수반 (테두리 프로파일)
    const rimPts = [[0, 0], [4.3, 0], [4.45, 0.15], [4.45, 0.75], [4.2, 0.95], [3.85, 0.95], [3.75, 0.8], [3.7, 0.25], [0, 0.25]].map(p => new THREE.Vector2(p[0], p[1]));
    const basin = mesh(new THREE.LatheGeometry(rimPts, 48), stoneM);
    outline(basin, 0.012);
    g.add(basin);
    // 물
    let waterMat = basic(0x7dd3fc, { transparent: true, opacity: 0.9 });
    if (typeof POLISH !== 'undefined' && POLISH.getWaterMaterial) { try { waterMat = POLISH.getWaterMaterial(); } catch (e) {} }
    const water = new THREE.Mesh(new THREE.CircleGeometry(3.72, 40), waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.62;
    g.add(water);
    // 기둥 + 2단 그릇
    const colPts = [[0, 0], [1.0, 0], [1.0, 0.3], [0.7, 0.45], [0.55, 1.2], [0.6, 1.9], [0.85, 2.05], [0, 2.05]].map(p => new THREE.Vector2(p[0], p[1]));
    const column = mesh(new THREE.LatheGeometry(colPts, 32), stoneM);
    column.position.y = 0.25;
    outline(column, 0.02);
    g.add(column);
    const bowlPts = [[0, 0], [0.9, 0.05], [1.8, 0.35], [2.05, 0.6], [1.95, 0.7], [1.7, 0.5], [0, 0.45]].map(p => new THREE.Vector2(p[0], p[1]));
    const bowl1 = mesh(new THREE.LatheGeometry(bowlPts, 40), stoneM);
    bowl1.position.y = 2.25;
    outline(bowl1, 0.02);
    g.add(bowl1);
    const w1 = new THREE.Mesh(new THREE.CircleGeometry(1.72, 32), waterMat);
    w1.rotation.x = -Math.PI / 2;
    w1.position.y = 2.82;
    g.add(w1);
    const col2 = mesh(new THREE.CylinderGeometry(0.3, 0.42, 1.3, 16), stoneM);
    col2.position.y = 3.3;
    g.add(col2);
    const bowl2 = mesh(new THREE.LatheGeometry(bowlPts, 32), stoneM);
    bowl2.scale.setScalar(0.55);
    bowl2.position.y = 3.9;
    outline(bowl2, 0.03);
    g.add(bowl2);
    // 꼭대기 황금 별 (기존 회전 연출 유지: userData.topStar)
    const topStar = mesh(new THREE.OctahedronGeometry(0.65, 0), toon(0xfacc15, null, null, { emissive: 0xca8a04, emissiveIntensity: 0.4 }));
    topStar.position.y = 4.85;
    outline(topStar, 0.05);
    g.add(topStar);
    const sg = glowSprite(0xfde68a, 3, 0.5);
    sg.position.y = 4.85;
    g.add(sg);
    g.userData.topStar = topStar;
    // 물줄기 (흩날리는 물방울)
    const N = 90;
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) seed[i] = Math.random();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    const dropMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 } },
      vertexShader: `attribute float seed; uniform float uT;
        void main(){ float t = fract(uT * 0.55 + seed); float a = seed * 40.0; float lvl = step(0.5, fract(seed * 7.0));
          float r0 = mix(0.6, 0.25, lvl), r1 = mix(3.5, 1.7, lvl), y0 = mix(4.3, 3.95, lvl), y1 = mix(0.65, 2.85, lvl);
          float r = mix(r0, r1, t); float y = y0 + 1.4 * sin(t * 3.1416) * (1.0 - lvl * 0.4) - (y0 - y1) * t * t;
          vec3 p = vec3(cos(a) * r, y, sin(a) * r);
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = (1.2 + seed * 1.4) * (26.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(0.85, 0.95, 1.0, smoothstep(0.5, 0.1, d) * 0.85); }`,
      transparent: true, depthWrite: false
    });
    const drops = new THREE.Points(geo, dropMat);
    drops.frustumCulled = false;
    g.add(drops);
    animated.push({ type: 'uniform', mat: dropMat });
    // 둘레 화단
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const fl = flowerCluster(undefined, 4, 0.25);
      fl.position.set(Math.cos(a) * 4.9, 0, Math.sin(a) * 4.9);
      g.add(fl);
    }
    g.userData.colliders = [{ c: [0, 0], r: 4.5, h: 0.95, stand: true }, { c: [0, 0], r: 1.1 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 3) 라멘 포차 (야타이)
  // ------------------------------------------------------------------
  function ramenStall() {
    const g = new THREE.Group();
    const wood = toon(0xffffff, TEX.plankH, [2, 1]);
    const woodV = toon(0xffffff, TEX.plank, [0.4, 1.5]);
    // 카운터 + 상판
    const counter = mesh(roundBox(8.2, 2.3, 3.6, 0.12), wood);
    counter.position.y = 1.15;
    outline(counter, 0.02);
    g.add(counter);
    const top = mesh(roundBox(8.8, 0.22, 4.4, 0.08), toon(0x8a4b22));
    top.position.set(0, 2.35, 0.2);
    outline(top, 0.03);
    g.add(top);
    // 바퀴 (포장마차 느낌)
    [-3.2, 3.2].forEach(x => {
      const wh = mesh(new THREE.TorusGeometry(0.75, 0.16, 8, 20), toon(0x5b3412));
      wh.position.set(x, 0.75, 1.9);
      g.add(wh);
      for (let k = 0; k < 4; k++) {
        const sp = mesh(new THREE.BoxGeometry(0.08, 1.4, 0.06), toon(0x5b3412), false);
        sp.rotation.z = (k / 4) * Math.PI;
        sp.position.set(x, 0.75, 1.9);
        g.add(sp);
      }
    });
    // 기둥 4개 + 맞배 기와 지붕
    [[-3.8, -1.4], [3.8, -1.4], [-3.8, 1.9], [3.8, 1.9]].forEach(([x, z]) => {
      const p = mesh(roundBox(0.32, 4.4, 0.32, 0.06), woodV);
      p.position.set(x, 4.5, z);
      outline(p, 0.04);
      g.add(p);
    });
    const roofMat = toon(0xd94b4b, TEX.shingle, [4, 2]);
    [-1, 1].forEach(side => {
      const r = mesh(roundBox(9.6, 0.25, 3.4, 0.08), roofMat);
      r.position.set(0, 7.35, 0.25 + side * 1.45);
      r.rotation.x = side * 0.42;
      outline(r, 0.02);
      g.add(r);
    });
    const ridge = mesh(new THREE.CylinderGeometry(0.22, 0.22, 9.8, 10), toon(0x7f1d1d));
    ridge.rotation.z = Math.PI / 2;
    ridge.position.set(0, 8.0, 0.25);
    g.add(ridge);
    // 노렌 (천 가림막) 4장
    const norenTex = TEX.noren('라멘', '#b91c1c', '#ffffff');
    for (let i = 0; i < 4; i++) {
      const n = mesh(new THREE.PlaneGeometry(1.95, 1.3), new THREE.MeshToonMaterial({ map: norenTex, gradientMap: GM(), side: THREE.DoubleSide }), false);
      n.position.set(-2.9 + i * 1.95, 5.85, 2.2);
      n.material = n.material.clone();
      n.material.map = norenTex.clone();
      n.material.map.needsUpdate = true;
      n.material.map.repeat.set(0.25, 1);
      n.material.map.offset.set(i * 0.25, 0);
      g.add(n);
      animated.push({ type: 'cloth', obj: n, phase: i * 0.7 });
    }
    // 간판
    const sc = document.createElement('canvas');
    sc.width = 512; sc.height = 128;
    const sx = sc.getContext('2d');
    const grd = sx.createLinearGradient(0, 0, 0, 128);
    grd.addColorStop(0, '#fff3c4'); grd.addColorStop(1, '#ffd36b');
    sx.fillStyle = grd;
    sx.fillRect(0, 0, 512, 128);
    sx.strokeStyle = '#7f1d1d'; sx.lineWidth = 10; sx.strokeRect(5, 5, 502, 118);
    sx.fillStyle = '#7f1d1d';
    sx.font = '900 60px Pretendard, sans-serif';
    sx.textAlign = 'center'; sx.textBaseline = 'middle';
    sx.fillText('🍜 라멘 랑 (郎)', 256, 66);
    const st = new THREE.CanvasTexture(sc);
    st.anisotropy = 4;
    const sign = mesh(new THREE.BoxGeometry(6.2, 1.25, 0.2), [toon(0x7f1d1d), toon(0x7f1d1d), toon(0x7f1d1d), toon(0x7f1d1d), basic(0xffffff, { map: st }), basic(0xffffff, { map: st })]);
    sign.position.set(0, 7.0, 2.85);
    sign.rotation.x = 0.25;
    outline(sign, 0.03);
    g.add(sign);
    // 종이 등불
    [-4.3, 4.3].forEach(x => {
      const l = paperLantern(0xff4d4d, 0.62);
      l.position.set(x, 5.3, 2.35);
      g.add(l);
    });
    // 의자 + 그릇(면·차슈·달걀) + 육수 냄비 + 김
    [-2.7, -0.9, 0.9, 2.7].forEach(x => {
      const seat = mesh(new THREE.CylinderGeometry(0.55, 0.5, 0.22, 16), toon(0xef4444));
      seat.position.set(x, 1.3, 3.25);
      outline(seat, 0.05);
      g.add(seat);
      const leg = mesh(new THREE.CylinderGeometry(0.1, 0.16, 1.2, 8), toon(0x3b3550), false);
      leg.position.set(x, 0.6, 3.25);
      g.add(leg);
      const bowl = new THREE.Group();
      const bp = [[0, 0], [0.22, 0], [0.45, 0.32], [0.48, 0.36], [0, 0.36]].map(p => new THREE.Vector2(p[0], p[1]));
      const b = mesh(new THREE.LatheGeometry(bp, 16), toon(0xffffff), false);
      outline(b, 0.06);
      bowl.add(b);
      const soup = mesh(new THREE.CircleGeometry(0.42, 16), toon(0xf4c27a), false);
      soup.rotation.x = -Math.PI / 2;
      soup.position.y = 0.3;
      bowl.add(soup);
      const egg = mesh(new THREE.SphereGeometry(0.12, 8, 6), toon(0xfff7d6), false);
      egg.position.set(0.15, 0.33, 0);
      egg.scale.y = 0.5;
      bowl.add(egg);
      const yolk = mesh(new THREE.SphereGeometry(0.06, 8, 6), toon(0xf59e0b), false);
      yolk.position.set(0.15, 0.36, 0);
      bowl.add(yolk);
      const chashu = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.04, 10), toon(0xc2703d), false);
      chashu.position.set(-0.12, 0.33, 0.08);
      bowl.add(chashu);
      bowl.position.set(x, 2.47, 1.6);
      g.add(bowl);
    });
    const potG = new THREE.Group();
    const pot1 = mesh(new THREE.CylinderGeometry(0.75, 0.7, 1.0, 18), toon(0x9ca3af));
    outline(pot1, 0.04);
    potG.add(pot1);
    const potRim = mesh(new THREE.TorusGeometry(0.75, 0.06, 6, 18), toon(0x6b7280), false);
    potRim.rotation.x = Math.PI / 2;
    potRim.position.y = 0.5;
    potG.add(potRim);
    potG.position.set(-2.6, 2.95, -0.6);
    g.add(potG);
    smokePuffs(g, V(-2.6, 3.6, -0.6), 0xffffff);
    // 갑옷씨 (주인장)
    const arm = new THREE.Group();
    const metal = toon(0xb6c2d1);
    const body = mesh(new THREE.CylinderGeometry(1.0, 1.15, 2.2, 18), metal);
    body.position.y = 1.1;
    outline(body, 0.04);
    arm.add(body);
    const apron = mesh(new THREE.CylinderGeometry(1.03, 1.18, 1.4, 18, 1, true, -0.9, 1.8), toon(0xffffff, null, null, { side: THREE.DoubleSide }), false);
    apron.position.y = 0.8;
    arm.add(apron);
    const head = mesh(new THREE.SphereGeometry(0.95, 18, 16), metal);
    head.position.y = 2.75;
    outline(head, 0.04);
    arm.add(head);
    const visor = mesh(new THREE.BoxGeometry(1.2, 0.14, 0.2), toon(0x1f2937), false);
    visor.position.set(0, 2.8, 0.88);
    arm.add(visor);
    const crest = mesh(new THREE.ConeGeometry(0.18, 0.6, 8), toon(0xef4444), false);
    crest.position.y = 3.8;
    arm.add(crest);
    const towel = mesh(new THREE.TorusGeometry(0.95, 0.1, 6, 20), toon(0xffffff), false);
    towel.rotation.x = Math.PI / 2;
    towel.position.y = 3.2;
    arm.add(towel);
    arm.position.set(0, 1.2, -0.7);
    g.add(arm);
    // 옆 소품: 나무통, 상자, 메뉴판
    const br = barrel();
    br.position.set(-5.0, 0, -0.6);
    g.add(br);
    const cr = crate(1.0);
    cr.position.set(5.0, 0, -0.9);
    cr.rotation.y = 0.3;
    g.add(cr);
    const cr2 = crate(0.7);
    cr2.position.set(5.0, 1.0, -0.9);
    cr2.rotation.y = -0.2;
    g.add(cr2);
    const menu = mesh(roundBox(1.1, 1.5, 0.1, 0.04), toon(0x1f2937));
    menu.position.set(4.9, 0.95, 2.6);
    menu.rotation.set(-0.15, -0.3, 0);
    outline(menu, 0.04);
    g.add(menu);
    const light = new THREE.PointLight(0xffb36b, 1.0, 20);
    light.position.set(0, 5.0, 3.2);
    g.add(light);
    g.userData.colliders = [{ b: [0, 0.3], w: 9.0, d: 4.8, h: 2.45, stand: true },
      ...[-2.7, -0.9, 0.9, 2.7].map(x => ({ c: [x, 3.25], r: 0.5, h: 1.4, stand: true })),
      { c: [-5.0, -0.6], r: 0.65, h: 1.3, stand: true }, { b: [5.0, -0.9], w: 1.1, d: 1.1, ry: 0.3, h: 1.7, stand: true }, { b: [4.9, 2.6], w: 1.1, d: 0.3, ry: -0.3, h: 1.7 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 4) 포쉐트 의상실 부스
  // ------------------------------------------------------------------
  function boutique() {
    const g = new THREE.Group();
    const counter = mesh(roundBox(5.4, 1.9, 2.4, 0.15), toon(0xfff1f7, TEX.plankH, [1.5, 0.8]));
    counter.position.y = 0.95;
    outline(counter, 0.025);
    g.add(counter);
    const topB = mesh(roundBox(5.8, 0.18, 2.8, 0.06), toon(0xf9a8d4));
    topB.position.y = 1.98;
    g.add(topB);
    // 기둥 + 줄무늬 차양 (물결 끝단)
    [-2.5, 2.5].forEach(x => {
      const p = mesh(new THREE.CylinderGeometry(0.13, 0.15, 4.2, 10), toon(0xfde68a));
      p.position.set(x, 2.1, -0.9);
      outline(p, 0.06);
      g.add(p);
      const p2 = p.clone();
      p2.position.z = 1.0;
      g.add(p2);
    });
    const awn = mesh(new THREE.BoxGeometry(6.0, 0.12, 3.2), toon(0xffffff, () => TEX.stripe('#f472b6', '#ffffff'), [4, 1]));
    awn.position.set(0, 4.45, 0.15);
    awn.rotation.x = 0.22;
    outline(awn, 0.03);
    g.add(awn);
    for (let i = 0; i < 12; i++) {
      const sc = mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 12, 1, false, 0, Math.PI), toon(i % 2 ? 0xffffff : 0xf472b6), false);
      sc.rotation.set(Math.PI / 2, 0, 0);
      sc.position.set(-2.75 + i * 0.5, 4.08, 1.72);
      g.add(sc);
    }
    // 간판
    const c = document.createElement('canvas');
    c.width = 512; c.height = 128;
    const x = c.getContext('2d');
    x.fillStyle = '#fff0f6'; x.fillRect(0, 0, 512, 128);
    x.strokeStyle = '#db2777'; x.lineWidth = 10; x.strokeRect(5, 5, 502, 118);
    x.fillStyle = '#be185d'; x.font = '900 54px Pretendard, sans-serif';
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('🎀 포쉐트 의상실', 256, 66);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    const sign = mesh(new THREE.BoxGeometry(4.6, 1.0, 0.15), [toon(0xf472b6), toon(0xf472b6), toon(0xf472b6), toon(0xf472b6), basic(0xffffff, { map: t }), basic(0xffffff, { map: t })]);
    sign.position.set(0, 5.1, -0.9);
    outline(sign, 0.03);
    g.add(sign);
    // 모자 진열 (기존 모자 모델)
    if (typeof createHatAccessory3D === 'function') {
      ['crown', 'flower', 'ribbon'].forEach((h, i) => {
        try {
          const stand = mesh(new THREE.CylinderGeometry(0.08, 0.25, 0.5, 10), toon(0xffffff), false);
          stand.position.set(-1.6 + i * 1.6, 2.32, 0.2);
          g.add(stand);
          const hat = createHatAccessory3D(h);
          if (hat) { hat.position.set(-1.6 + i * 1.6, 2.65, 0.2); g.add(hat); }
        } catch (e) {}
      });
    }
    // 마네킹 + 거울 + 화분
    const man = new THREE.Group();
    const torso = mesh(new THREE.CylinderGeometry(0.45, 0.6, 1.6, 14), toon(0xfecdd3));
    torso.position.y = 1.7;
    outline(torso, 0.05);
    man.add(torso);
    const dress = mesh(new THREE.ConeGeometry(0.9, 1.2, 16), toon(0xc084fc));
    dress.position.y = 0.95;
    outline(dress, 0.05);
    man.add(dress);
    const mh = mesh(new THREE.SphereGeometry(0.35, 12, 10), toon(0xfecdd3));
    mh.position.y = 2.75;
    man.add(mh);
    const pole = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 6), toon(0x3b3550), false);
    pole.position.y = 0.3;
    man.add(pole);
    man.position.set(3.6, 0, 0.6);
    g.add(man);
    const mirror = new THREE.Group();
    const mf = mesh(new THREE.TorusGeometry(0.75, 0.1, 8, 24), toon(0xfacc15));
    mf.scale.y = 1.4;
    mirror.add(mf);
    const mg = mesh(new THREE.CircleGeometry(0.72, 24), basic(0xdbeafe), false);
    mg.scale.y = 1.4;
    mirror.add(mg);
    mirror.position.set(-3.6, 1.6, 0.4);
    mirror.rotation.y = 0.5;
    g.add(mirror);
    const p1 = pot(0xf9a8d4);
    p1.position.set(-3.2, 0, 1.9);
    g.add(p1);
    g.userData.colliders = [{ b: [0, 0.05], w: 5.9, d: 2.9, h: 2.07, stand: true }, { c: [3.6, 0.6], r: 0.9, h: 2.9 }, { c: [-3.6, 0.4], r: 0.5, h: 2.6 }, { c: [-3.2, 1.9], r: 0.5, h: 1.0, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 5) 풍차
  // ------------------------------------------------------------------
  function windmill() {
    const g = new THREE.Group();
    const base = mesh(new THREE.CylinderGeometry(3.1, 3.4, 1.2, 8), toon(0xffffff, TEX.cobble, [3, 0.4]));
    base.position.y = 0.6;
    outline(base, 0.02);
    g.add(base);
    const tower = mesh(new THREE.CylinderGeometry(2.0, 2.8, 7.2, 8), toon(0xfffaf0, TEX.plaster, [3, 2]));
    tower.position.y = 4.8;
    outline(tower, 0.02);
    g.add(tower);
    // 목조 골조 띠
    [2.2, 5.0, 8.2].forEach(y => {
      const r = 2.8 - ((y - 1.2) / 7.2) * 0.8 + 0.04;
      const band = mesh(new THREE.CylinderGeometry(r, r + 0.03, 0.25, 8, 1, true), toon(0xa86b3c), false);
      band.position.y = y;
      g.add(band);
    });
    // 문 + 창문
    const door = mesh(new THREE.ExtrudeGeometry(archShape(1.3, 2.1), { depth: 0.2, bevelEnabled: false }), toon(0xffffff, TEX.plank, [0.5, 0.5]));
    door.position.set(0, 1.2, 2.62);
    door.rotation.x = -0.1;
    outline(door, 0.04);
    g.add(door);
    [[0, 5.2], [1.2, 6.8]].forEach(([dx, y], i) => {
      const w = mesh(new THREE.ExtrudeGeometry(archShape(0.8, 1.1), { depth: 0.12, bevelEnabled: false }), basic(0xfff1b8), false);
      const a = i ? 0.55 : 0;
      const r = 2.8 - ((y - 1.2) / 7.2) * 0.8;
      w.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
      w.rotation.y = a;
      g.add(w);
      animated.push({ type: 'window', mat: w.material });
    });
    // 지붕 (비늘 기와 원뿔) + 머리
    const roof = mesh(new THREE.ConeGeometry(2.6, 2.8, 16), toon(0x34d399, TEX.shingle, [6, 2]));
    roof.position.y = 9.8;
    outline(roof, 0.02);
    g.add(roof);
    const tip = mesh(new THREE.SphereGeometry(0.3, 10, 8), toon(0xfde047), false);
    tip.position.y = 11.3;
    g.add(tip);
    // 날개 (격자 프레임 + 천)
    const bladesPivot = new THREE.Group();
    bladesPivot.position.set(0, 7.6, 2.45);
    const hub = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 12), toon(0x7c4a24));
    hub.rotation.x = Math.PI / 2;
    outline(hub, 0.05);
    bladesPivot.add(hub);
    const frameM = toon(0x8a5a2b);
    const clothM = toon(0xfffbf2, null, null, { side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Group();
      arm.rotation.z = (i / 4) * Math.PI * 2;
      const spar = mesh(roundBox(0.22, 5.4, 0.16, 0.04), frameM, false);
      spar.position.y = 2.9;
      arm.add(spar);
      const sail = mesh(new THREE.PlaneGeometry(1.25, 4.2), clothM, false);
      sail.position.set(0.72, 3.2, 0.06);
      arm.add(sail);
      for (let k = 0; k < 5; k++) {
        const rung = mesh(new THREE.BoxGeometry(1.35, 0.06, 0.06), frameM, false);
        rung.position.set(0.72, 1.2 + k * 1.0, 0.1);
        arm.add(rung);
      }
      const edge = mesh(new THREE.BoxGeometry(0.06, 4.2, 0.06), frameM, false);
      edge.position.set(1.36, 3.2, 0.1);
      arm.add(edge);
      bladesPivot.add(arm);
    }
    g.add(bladesPivot);
    g.userData.bladesPivot = bladesPivot;
    // 주변 소품
    const sack = mesh(new THREE.SphereGeometry(0.6, 10, 8), toon(0xe9d5a8));
    sack.scale.set(1, 1.2, 0.9);
    sack.position.set(2.6, 0.7, 2.6);
    outline(sack, 0.05);
    g.add(sack);
    const cr = crate(0.9);
    cr.position.set(-2.8, 0, 2.4);
    g.add(cr);
    g.userData.colliders = [{ c: [0, 0], r: 3.3 }, { c: [2.6, 2.6], r: 0.6, h: 1.4, stand: true }, { b: [-2.8, 2.4], w: 0.9, d: 0.9, h: 0.9, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 6) 캠핑장
  // ------------------------------------------------------------------
  function tent(color, stripe) {
    const g = new THREE.Group();
    const W = 4.4, H = 3.6, D = 5;
    const m = toon(0xffffff, () => TEX.stripe(hex(color), hex(stripe)), [2, 1], { side: THREE.DoubleSide });
    [-1, 1].forEach(side => {
      const pane = mesh(new THREE.PlaneGeometry(D, Math.hypot(W / 2, H)), m);
      pane.rotation.set(0, Math.PI / 2, 0);
      const wrap = new THREE.Group();
      wrap.add(pane);
      wrap.rotation.z = side * (Math.PI / 2 - Math.atan2(H, W / 2));
      wrap.position.set(side * W / 4, H / 2, 0);
      g.add(wrap);
    });
    // 뒷면 삼각형 + 앞 출입구 (열린 플랩)
    const tri = new THREE.Shape();
    tri.moveTo(-W / 2, 0); tri.lineTo(W / 2, 0); tri.lineTo(0, H); tri.lineTo(-W / 2, 0);
    const back = mesh(new THREE.ShapeGeometry(tri), toon(color, null, null, { side: THREE.DoubleSide }));
    back.position.z = -D / 2;
    g.add(back);
    const flapShape = new THREE.Shape();
    flapShape.moveTo(0, 0); flapShape.lineTo(W / 2, 0); flapShape.lineTo(0, H); flapShape.lineTo(0, 0);
    const flap = mesh(new THREE.ShapeGeometry(flapShape), toon(stripe, null, null, { side: THREE.DoubleSide }));
    flap.position.set(-W / 2 * 0.1, 0, D / 2);
    flap.rotation.y = -1.1;
    g.add(flap);
    const inside = mesh(new THREE.ShapeGeometry(tri), basic(0x3b2a1a, { side: THREE.DoubleSide }), false);
    inside.position.z = D / 2 - 0.05;
    inside.scale.set(0.9, 0.95, 1);
    g.add(inside);
    const pole = mesh(new THREE.CylinderGeometry(0.07, 0.07, H + 0.6, 6), toon(0x8a5a2b), false);
    pole.position.set(0, (H + 0.6) / 2, D / 2 + 0.1);
    g.add(pole);
    const flag = mesh(new THREE.ConeGeometry(0.25, 0.6, 3), toon(0xfacc15), false);
    flag.rotation.z = -Math.PI / 2;
    flag.position.set(0.3, H + 0.45, D / 2 + 0.1);
    g.add(flag);
    return g;
  }
  function campsite() {
    const g = new THREE.Group();
    const t1 = tent(0xfbbf24, 0xfff7d6);
    t1.position.set(-7.5, 0, -5.5);
    t1.rotation.y = 0.45;
    g.add(t1);
    const t2 = tent(0x38bdf8, 0xe0f2fe);
    t2.position.set(7.8, 0, -4.8);
    t2.rotation.y = -0.5;
    g.add(t2);
    // 돌 화로
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const s = mesh(new THREE.DodecahedronGeometry(0.42, 1), toon(0xffffff, TEX.stone));
      s.position.set(Math.cos(a) * 1.35, 0.25, Math.sin(a) * 1.35);
      s.scale.y = 0.75;
      outline(s, 0.04);
      g.add(s);
    }
    // 장작
    for (let i = 0; i < 4; i++) {
      const lg = mesh(new THREE.CylinderGeometry(0.16, 0.18, 1.8, 8), toon(0x7c4a24), false);
      lg.rotation.set(0.9, (i / 4) * Math.PI * 2, 0);
      lg.position.y = 0.45;
      g.add(lg);
    }
    // 불꽃 (기존 크기 연출 유지: userData.flameOuter)
    const fireMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uT; varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
        void main(){ vec2 p = vUv; float f = n(vec2(p.x * 6.0, p.y * 4.0 - uT * 4.0)) * 0.6 + n(vec2(p.x * 12.0, p.y * 8.0 - uT * 6.0)) * 0.4;
          float shape = smoothstep(0.5, 0.0, abs(p.x - 0.5) * (1.6 + p.y * 1.8)) * smoothstep(1.0, 0.2, p.y + f * 0.35);
          vec3 col = mix(vec3(1.0, 0.35, 0.05), vec3(1.0, 0.95, 0.5), smoothstep(0.3, 0.9, shape));
          gl_FragColor = vec4(col * shape, shape); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const flameOuter = new THREE.Group();
    [0, Math.PI / 2].forEach(r => {
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.0), fireMat);
      pl.position.y = 1.5;
      pl.rotation.y = r;
      flameOuter.add(pl);
    });
    flameOuter.position.y = 0.2;
    g.add(flameOuter);
    g.userData.flameOuter = flameOuter;
    animated.push({ type: 'uniform', mat: fireMat });
    const fg = glowSprite(0xff9a3c, 7, 0.55);
    fg.position.y = 1.4;
    g.add(fg);
    animated.push({ type: 'flicker', obj: fg, base: 0.55 });
    const fl = new THREE.PointLight(0xff8a3d, 1.3, 18);
    fl.position.y = 2;
    g.add(fl);
    // 통나무 의자 (나이테 단면)
    [0, 2.1, 4.2].forEach(a => {
      const lg = new THREE.Group();
      const body = mesh(new THREE.CylinderGeometry(0.5, 0.52, 4.2, 14), toon(0xffffff, TEX.plank, [2, 1]));
      body.rotation.z = Math.PI / 2;
      outline(body, 0.03);
      lg.add(body);
      [-1, 1].forEach(s => {
        const cap = mesh(new THREE.CircleGeometry(0.5, 16), toon(0xffffff, TEX.ringWood), false);
        cap.rotation.y = s * Math.PI / 2;
        cap.position.x = s * 2.11;
        lg.add(cap);
      });
      lg.position.set(Math.cos(a) * 4.5, 0.5, Math.sin(a) * 4.5);
      lg.rotation.y = -a + Math.PI / 2;
      g.add(lg);
    });
    // 랜턴 기둥 + 전구 줄
    const poles = [V(-4, 0, -9), V(4.5, 0, -9.5)];
    poles.forEach(p => {
      const po = mesh(new THREE.CylinderGeometry(0.1, 0.12, 4.2, 8), toon(0x8a5a2b));
      po.position.set(p.x, 2.1, p.z);
      g.add(po);
    });
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const x = poles[0].x + (poles[1].x - poles[0].x) * t;
      const z = poles[0].z + (poles[1].z - poles[0].z) * t;
      const y = 4.0 - Math.sin(t * Math.PI) * 0.8;
      const bulb = mesh(new THREE.SphereGeometry(0.12, 8, 6), basic([0xfde047, 0xff85a2, 0x7dd3fc][i % 3]), false);
      bulb.position.set(x, y, z);
      g.add(bulb);
      const bg = glowSprite([0xfde047, 0xff85a2, 0x7dd3fc][i % 3], 0.9, 0.5);
      bg.position.copy(bulb.position);
      g.add(bg);
    }
    // 장작 더미 + 쿨러
    for (let i = 0; i < 6; i++) {
      const lg = mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.6, 8), toon(0x9a6232), false);
      lg.rotation.x = Math.PI / 2;
      lg.position.set(-11 + (i % 3) * 0.42, 0.2 + Math.floor(i / 3) * 0.38, 2);
      g.add(lg);
    }
    const cooler = mesh(roundBox(1.2, 0.8, 0.8, 0.1), toon(0x60a5fa));
    cooler.position.set(10.5, 0.4, 2.5);
    outline(cooler, 0.04);
    g.add(cooler);
    g.userData.colliders = [{ c: [0, 0], r: 1.85, h: 0.6, stand: true },
      { b: [-7.5, -5.5], w: 4.6, d: 5.2, ry: 0.45, h: 3.6 }, { b: [7.8, -4.8], w: 4.6, d: 5.2, ry: -0.5, h: 3.6 },
      ...[0, 2.1, 4.2].map(a => ({ b: [Math.cos(a) * 4.5, Math.sin(a) * 4.5], w: 4.2, d: 1.0, ry: -a + Math.PI / 2, h: 1.0, stand: true })),
      { b: [-10.6, 2], w: 1.4, d: 1.6, h: 0.8, stand: true }, { b: [10.5, 2.5], w: 1.2, d: 0.8, h: 0.8, stand: true },
      { c: [-4, -9], r: 0.25, h: 4.2 }, { c: [4.5, -9.5], r: 0.25, h: 4.2 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 7) 벚꽃 온천
  // ------------------------------------------------------------------
  function stoneLantern() {
    const g = new THREE.Group();
    const s = toon(0xffffff, TEX.moss);
    const parts = [
      [new THREE.CylinderGeometry(0.7, 0.8, 0.35, 6), 0.17],
      [new THREE.CylinderGeometry(0.22, 0.28, 1.4, 8), 1.05],
      [new THREE.CylinderGeometry(0.6, 0.5, 0.3, 6), 1.9],
      [new THREE.BoxGeometry(0.7, 0.65, 0.7), 2.38],
      [new THREE.ConeGeometry(0.85, 0.6, 6), 3.0],
      [new THREE.SphereGeometry(0.16, 8, 6), 3.4]
    ];
    parts.forEach(([geo, y]) => {
      const m = mesh(geo, s);
      m.position.y = y;
      outline(m, 0.04);
      g.add(m);
    });
    const light = mesh(new THREE.BoxGeometry(0.72, 0.4, 0.4), basic(0xffe3a3), false);
    light.position.y = 2.38;
    g.add(light);
    const gl = glowSprite(0xffd27a, 2.2, 0.45);
    gl.position.y = 2.4;
    g.add(gl);
    animated.push({ type: 'lamp', glow: gl, glass: light, phase: rnd() * 6 });
    return g;
  }
  function onsen() {
    const g = new THREE.Group();
    let waterMat = basic(0x67e8f9);
    if (typeof POLISH !== 'undefined' && POLISH.getWaterMaterial) { try { waterMat = POLISH.getWaterMaterial(); } catch (e) {} }
    const pool = new THREE.Mesh(new THREE.CircleGeometry(12.6, 48), waterMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = 0.22;
    g.add(pool);
    const bed = mesh(new THREE.CylinderGeometry(12.8, 13, 0.2, 48), toon(0x2f6f7a), false);
    bed.position.y = 0.05;
    g.add(bed);
    // 자연석 테두리 (크기 다양)
    for (let i = 0; i < 34; i++) {
      const a = (i / 34) * Math.PI * 2 + rnd() * 0.08;
      const r = 12.6 + rnd() * 0.8;
      const rock = mesh(new THREE.DodecahedronGeometry(0.9 + rnd() * 0.9, 1), toon(0xffffff, TEX.moss));
      rock.position.set(Math.cos(a) * r, 0.35, Math.sin(a) * r);
      rock.scale.set(1, 0.55 + rnd() * 0.3, 1);
      rock.rotation.y = rnd() * 6;
      outline(rock, 0.03);
      g.add(rock);
    }
    // 김 (모락모락)
    for (let i = 0; i < 6; i++) {
      const a = rnd() * Math.PI * 2, r = rnd() * 9;
      smokePuffs(g, V(Math.cos(a) * r, 0.6, Math.sin(a) * r), 0xffffff);
    }
    // 정자 (휘어진 처마 지붕)
    const gz = new THREE.Group();
    gz.position.set(0, 0, -10.2);
    const deck = mesh(roundBox(8.4, 0.5, 5.6, 0.1), toon(0xffffff, TEX.plankH, [2, 1.5]));
    deck.position.y = 0.45;
    outline(deck, 0.02);
    gz.add(deck);
    [[-3.6, -2.3], [3.6, -2.3], [-3.6, 2.3], [3.6, 2.3]].forEach(([x, z]) => {
      const p = mesh(new THREE.CylinderGeometry(0.2, 0.22, 4.2, 10), toon(0xb45309));
      p.position.set(x, 2.7, z);
      outline(p, 0.05);
      gz.add(p);
    });
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-5.6, 0);
    roofShape.quadraticCurveTo(-2.5, 0.6, 0, 2.6);
    roofShape.quadraticCurveTo(2.5, 0.6, 5.6, 0);
    roofShape.lineTo(5.6, -0.3);
    roofShape.quadraticCurveTo(2.5, 0.25, 0, 2.2);
    roofShape.quadraticCurveTo(-2.5, 0.25, -5.6, -0.3);
    roofShape.lineTo(-5.6, 0);
    const roof = mesh(new THREE.ExtrudeGeometry(roofShape, { depth: 7.0, bevelEnabled: false, curveSegments: 16 }), toon(0xf472b6, TEX.shingle, [0.25, 0.25]));
    roof.position.set(0, 4.8, -3.5);
    outline(roof, 0.02);
    gz.add(roof);
    const ridge = mesh(new THREE.CylinderGeometry(0.2, 0.2, 7.4, 8), toon(0x9d174d));
    ridge.rotation.x = Math.PI / 2;
    ridge.position.set(0, 7.25, 0);
    gz.add(ridge);
    // 정자 등불
    [-3.6, 3.6].forEach(x => {
      const l = paperLantern(0xffb3c6, 0.45);
      l.position.set(x, 4.2, 2.6);
      gz.add(l);
    });
    g.add(gz);
    // 석등 + 대나무 울타리
    [[-9, -8], [9, -8], [10.5, 6.5]].forEach(([x, z]) => {
      const sl = stoneLantern();
      sl.position.set(x * 1.12, 0, z * 1.12);
      g.add(sl);
    });
    const bamboo = toon(0x86c55a);
    for (let i = 0; i < 26; i++) {
      const a = Math.PI * 0.95 + (i / 25) * Math.PI * 0.6;
      const b = mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2 + (i % 3) * 0.2, 8), bamboo, false);
      b.position.set(Math.cos(a) * 15.2, 1.1, Math.sin(a) * 15.2);
      g.add(b);
    }
    // 피크닉 돗자리 + 바구니
    const matM = mesh(roundBox(5.5, 0.05, 4.2, 0.02), toon(0xffffff, () => TEX.stripe('#fda4af', '#fff1f2'), [3, 1]), false);
    matM.position.set(9.5, 0.05, 8.5);
    g.add(matM);
    const basket = mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.5, 14), toon(0xd6a35c));
    basket.position.set(9.5, 0.3, 8.5);
    outline(basket, 0.05);
    g.add(basket);
    g.userData.colliders = [
      ...[[-3.6, -2.3], [3.6, -2.3], [-3.6, 2.3], [3.6, 2.3]].map(([x, z]) => ({ c: [x, z - 10.2], r: 0.35, h: 4.8 })),
      { b: [0, -10.2], w: 8.4, d: 5.6, h: 0.7, stand: true },
      ...[[-9, -8], [9, -8], [10.5, 6.5]].map(([x, z]) => ({ c: [x * 1.12, z * 1.12], r: 0.85, h: 3.5 }))];
    return g;
  }

  // ------------------------------------------------------------------
  // 8) 출격 포털 (도리이 + 소용돌이)
  // ------------------------------------------------------------------
  function portalGate() {
    const g = new THREE.Group();
    const stoneM = toon(0xffffff, TEX.stone, [3, 1]);
    // 3단 석조 단
    [[7.6, 0.4, 0.2], [6.4, 0.4, 0.6], [5.4, 0.35, 0.95]].forEach(([r, h, y]) => {
      const st = mesh(new THREE.CylinderGeometry(r, r + 0.3, h, 40), stoneM);
      st.position.y = y;
      outline(st, 0.015);
      g.add(st);
    });
    // 도리이 기둥
    const red = toon(0xe0313b);
    [-4.2, 4.2].forEach(x => {
      const p = mesh(new THREE.CylinderGeometry(0.55, 0.68, 8.6, 18), red);
      p.position.set(x, 5.4, 0);
      outline(p, 0.03);
      g.add(p);
      const foot = mesh(new THREE.CylinderGeometry(0.78, 0.82, 0.8, 18), toon(0x1f1f1f));
      foot.position.set(x, 1.5, 0);
      g.add(foot);
    });
    // 휘어진 가사기(상단 들보)
    const top = new THREE.Shape();
    top.moveTo(-6.4, 0.5);
    top.quadraticCurveTo(0, -0.2, 6.4, 0.5);
    top.lineTo(6.2, -0.35);
    top.quadraticCurveTo(0, -0.9, -6.2, -0.35);
    top.lineTo(-6.4, 0.5);
    const beam = mesh(new THREE.ExtrudeGeometry(top, { depth: 1.3, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2, curveSegments: 16 }), toon(0x1f1f1f));
    beam.position.set(0, 10.1, -0.65);
    outline(beam, 0.02);
    g.add(beam);
    const beam2 = mesh(roundBox(12.0, 0.6, 1.0, 0.1), red);
    beam2.position.y = 9.55;
    g.add(beam2);
    const nuki = mesh(roundBox(10.4, 0.5, 0.7, 0.08), red);
    nuki.position.y = 7.7;
    outline(nuki, 0.03);
    g.add(nuki);
    const plaque = mesh(roundBox(1.3, 1.5, 0.25, 0.05), toon(0xfacc15));
    plaque.position.set(0, 8.65, 0.45);
    outline(plaque, 0.05);
    g.add(plaque);
    // 시메나와(밧줄) + 종이 술
    const rope = mesh(new THREE.TorusGeometry(4.0, 0.16, 8, 32, Math.PI), toon(0xe9d5a8), false);
    rope.rotation.z = Math.PI;
    rope.scale.set(1, 0.25, 1);
    rope.position.set(0, 7.4, 0.4);
    g.add(rope);
    for (let i = 0; i < 5; i++) {
      const sh = mesh(new THREE.PlaneGeometry(0.35, 0.9), toon(0xffffff, null, null, { side: THREE.DoubleSide }), false);
      sh.position.set(-2.4 + i * 1.2, 6.6 - Math.sin(((i + 0.5) / 5) * Math.PI) * 0.8, 0.45);
      g.add(sh);
    }
    // 소용돌이 포털 (기존 회전 연출 유지: userData.portalPivot)
    const portalPivot = new THREE.Group();
    portalPivot.position.set(0, 4.6, 0);
    const vMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uT; varying vec2 vUv;
        void main(){ vec2 p = vUv * 2.0 - 1.0; float r = length(p); if (r > 1.0) discard; float a = atan(p.y, p.x);
          float sw = sin(a * 5.0 + r * 10.0 - uT * 4.0) * 0.5 + 0.5;
          vec3 col = mix(vec3(0.15, 0.45, 1.0), vec3(0.75, 0.4, 1.0), sw); col = mix(col, vec3(1.0), smoothstep(0.3, 0.0, r));
          float alpha = (0.55 + sw * 0.35) * smoothstep(1.0, 0.85, r);
          gl_FragColor = vec4(col * alpha, alpha); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const disc = new THREE.Mesh(new THREE.CircleGeometry(3.1, 48), vMat);
    portalPivot.add(disc);
    const ring = mesh(new THREE.TorusGeometry(3.15, 0.2, 10, 48), toon(0xfacc15, null, null, { emissive: 0x7a5c00 }), false);
    portalPivot.add(ring);
    g.add(portalPivot);
    g.userData.portalPivot = portalPivot;
    animated.push({ type: 'uniform', mat: vMat });
    const pg = glowSprite(0x7aa2ff, 9, 0.35);
    pg.position.y = 4.6;
    g.add(pg);
    // 석등 한 쌍
    [-6.2, 6.2].forEach(x => {
      const sl = stoneLantern();
      sl.position.set(x, 1.1, 2.5);
      sl.scale.setScalar(0.85);
      g.add(sl);
    });
    g.userData.colliders = [{ c: [-4.2, 0], r: 0.8 }, { c: [4.2, 0], r: 0.8 }, { c: [-6.2, 2.5], r: 0.75, h: 4 }, { c: [6.2, 2.5], r: 0.75, h: 4 },
      { c: [0, 0], r: 7.7, h: 0.4, stand: true }, { c: [0, 0], r: 6.6, h: 0.8, stand: true }, { c: [0, 0], r: 5.6, h: 1.13, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 9) 고대 유적
  // ------------------------------------------------------------------
  function ruins() {
    const g = new THREE.Group();
    const s = toon(0xffffff, TEX.moss, [2, 1]);
    const floor = mesh(new THREE.CylinderGeometry(15, 16.5, 0.6, 48), toon(0xffffff, TEX.cobble, [8, 0.6]));
    floor.position.y = 0.3;
    outline(floor, 0.012);
    g.add(floor);
    const rune = mesh(new THREE.RingGeometry(11.2, 11.9, 64), basic(0xc084fc, { transparent: true, opacity: 0.85 }), false);
    rune.rotation.x = -Math.PI / 2;
    rune.position.y = 0.62;
    g.add(rune);
    // 홈이 파인 기둥 + 주두 (일부는 부서짐)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const broken = i % 3 === 1;
      const h = broken ? 3.5 + (i % 2) : 8.2;
      const col = new THREE.Group();
      const base = mesh(roundBox(2.4, 0.6, 2.4, 0.08), s);
      base.position.y = 0.9;
      col.add(base);
      const shaft = mesh(new THREE.CylinderGeometry(0.85, 0.95, h, 16), s);
      shaft.position.y = 1.2 + h / 2;
      outline(shaft, 0.03);
      col.add(shaft);
      for (let k = 0; k < 8; k++) {
        const fl = mesh(new THREE.BoxGeometry(0.1, h * 0.95, 0.12), toon(0x9b958a), false);
        const fa = (k / 8) * Math.PI * 2;
        fl.position.set(Math.cos(fa) * 0.88, 1.2 + h / 2, Math.sin(fa) * 0.88);
        fl.rotation.y = -fa;
        col.add(fl);
      }
      if (!broken) {
        const cap = mesh(roundBox(2.2, 0.55, 2.2, 0.1), s);
        cap.position.y = 1.2 + h + 0.25;
        outline(cap, 0.03);
        col.add(cap);
        const orb = mesh(new THREE.OctahedronGeometry(0.6, 0), basic(0xd8b4fe), false);
        orb.position.y = 1.2 + h + 1.4;
        col.add(orb);
        const og = glowSprite(0xc084fc, 3, 0.6);
        og.position.copy(orb.position);
        col.add(og);
        animated.push({ type: 'bob', obj: orb, glow: og, base: orb.position.y, phase: i });
      } else {
        // 쓰러진 기둥 조각
        const piece = mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.6, 16), s);
        piece.rotation.z = Math.PI / 2;
        piece.rotation.y = rnd() * 3;
        piece.position.set(2.2, 1.45, 1.2);
        outline(piece, 0.03);
        col.add(piece);
      }
      col.position.set(Math.cos(a) * 13.5, 0, Math.sin(a) * 13.5);
      g.add(col);
    }
    // 중앙 제단
    const altar = mesh(roundBox(4.2, 1.2, 2.6, 0.15), s);
    altar.position.y = 1.2;
    outline(altar, 0.03);
    g.add(altar);
    const book = mesh(roundBox(1.0, 0.18, 0.75, 0.04), toon(0x7c3aed), false);
    book.position.set(0, 1.9, 0);
    book.rotation.y = 0.3;
    g.add(book);
    // 덩굴 덤불
    for (let i = 0; i < 6; i++) {
      const b = bush(1.2);
      const a = rnd() * Math.PI * 2;
      b.position.set(Math.cos(a) * 9, 0.5, Math.sin(a) * 9);
      g.add(b);
    }
    g.userData.colliders = [{ b: [0, 0], w: 4.3, d: 2.7, h: 1.8, stand: true }, { c: [0, 0], r: 15.8, h: 0.6, stand: true },
      ...Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return { c: [Math.cos(a) * 13.5, Math.sin(a) * 13.5], r: 1.3, h: i % 3 === 1 ? 4.7 : 99 }; })];
    return g;
  }

  // ------------------------------------------------------------------
  // 공용 건축 파츠 (박공 지붕 · 창문 · 문 · 간판)
  // ------------------------------------------------------------------
  // 용마루가 x축 방향인 박공 지붕 (벽 높이 wallH 위)
  function gableRoof(w, d, wallH, rise, mat, over = 0.7, ridgeColor = 0x3b3550) {
    const g = new THREE.Group();
    const th = Math.atan2(rise, d / 2);
    const L = (d / 2 + over) / Math.cos(th);
    [-1, 1].forEach(side => {
      const p = mesh(roundBox(w + over * 2, 0.26, L, 0.08), mat);
      p.rotation.x = side * th;
      p.position.set(0, wallH + rise - (L / 2) * Math.sin(th) + 0.1, side * (L / 2) * Math.cos(th));
      outline(p, 0.02);
      g.add(p);
    });
    const ridge = mesh(new THREE.CylinderGeometry(0.2, 0.2, w + over * 2 + 0.2, 10), toon(ridgeColor));
    ridge.rotation.z = Math.PI / 2;
    ridge.position.y = wallH + rise + 0.18;
    g.add(ridge);
    // 박공 삼각벽
    const tri = new THREE.Shape();
    tri.moveTo(-d / 2, 0); tri.lineTo(d / 2, 0); tri.lineTo(0, rise); tri.lineTo(-d / 2, 0);
    return { g, tri };
  }
  function building({ w, d, h, rise, wall, roof, trim = 0xa86b3c, base = true }) {
    const g = new THREE.Group();
    if (base) {
      const b = mesh(roundBox(w + 0.5, 0.5, d + 0.5, 0.08), toon(0xffffff, TEX.cobble, [3, 0.4]));
      b.position.y = 0.25;
      g.add(b);
    }
    const body = mesh(roundBox(w, h, d, 0.12), wall);
    body.position.y = h / 2 + 0.3;
    outline(body, 0.02);
    g.add(body);
    const r = gableRoof(w, d, h + 0.3, rise, roof);
    g.add(r.g);
    [-1, 1].forEach(side => {
      const gw = mesh(new THREE.ExtrudeGeometry(r.tri, { depth: 0.2, bevelEnabled: false }), wall);
      gw.rotation.y = Math.PI / 2;
      gw.position.set(side * (w / 2) - 0.1, h + 0.3, 0);
      g.add(gw);
    });
    // 모서리 목재 기둥 + 처마 띠
    const tm = toon(trim);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
      const p = mesh(roundBox(0.32, h, 0.32, 0.05), tm, false);
      p.position.set(sx * (w / 2), h / 2 + 0.3, sz * (d / 2));
      g.add(p);
    });
    const band = mesh(roundBox(w + 0.2, 0.25, d + 0.2, 0.05), tm, false);
    band.position.y = h + 0.2;
    g.add(band);
    return g;
  }
  function windowW(w = 1.4, h = 1.5, shutters = 0x6cbf4a, box = true) {
    const g = new THREE.Group();
    const frame = mesh(roundBox(w + 0.3, h + 0.3, 0.2, 0.06), toon(0xfff3d6));
    outline(frame, 0.04);
    g.add(frame);
    const glass = mesh(new THREE.PlaneGeometry(w, h), basic(0xfff1b8), false);
    glass.position.z = 0.11;
    g.add(glass);
    animated.push({ type: 'window', mat: glass.material });
    const bm = toon(0xa86b3c);
    const b1 = mesh(new THREE.BoxGeometry(w, 0.08, 0.06), bm, false);
    const b2 = mesh(new THREE.BoxGeometry(0.08, h, 0.06), bm, false);
    b1.position.z = b2.position.z = 0.14;
    g.add(b1, b2);
    if (shutters) {
      [-1, 1].forEach(s => {
        const sh = mesh(roundBox(w * 0.5, h + 0.2, 0.08, 0.03), toon(shutters), false);
        sh.position.set(s * (w * 0.75 + 0.2), 0, 0.1);
        g.add(sh);
        for (let k = 0; k < 4; k++) {
          const sl = mesh(new THREE.BoxGeometry(w * 0.42, 0.05, 0.04), toon(0x3f7a2a), false);
          sl.position.set(s * (w * 0.75 + 0.2), -h / 2 + 0.25 + k * (h / 4), 0.16);
          g.add(sl);
        }
      });
    }
    if (box) {
      const fb = flowerBox(w + 0.3);
      fb.position.set(0, -h / 2 - 0.45, 0.25);
      g.add(fb);
    }
    return g;
  }
  function doorW(w = 1.6, h = 2.6, color = 0xffffff) {
    const g = new THREE.Group();
    const frame = mesh(new THREE.ExtrudeGeometry(archShape(w + 0.4, h + 0.3), { depth: 0.2, bevelEnabled: false }), toon(0xfff3d6));
    outline(frame, 0.03);
    g.add(frame);
    const door = mesh(new THREE.ExtrudeGeometry(archShape(w, h), { depth: 0.24, bevelEnabled: false }), toon(color, TEX.plank, [0.5, 0.5]));
    g.add(door);
    const knob = mesh(new THREE.SphereGeometry(0.1, 8, 6), toon(0xfacc15), false);
    knob.position.set(w * 0.32, h * 0.45, 0.3);
    g.add(knob);
    return g;
  }
  function textTex(text, { w = 512, h = 128, bg = '#fff3c4', fg = '#5b3412', border = '#8a5a2b', font = 56 } = {}) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    if (border) { x.strokeStyle = border; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); }
    x.fillStyle = fg; x.font = `900 ${font}px Pretendard, sans-serif`;
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(text, w / 2, h / 2 + 4);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  }
  function signBoard(text, w, h, opts = {}, frameColor = 0x8a5a2b) {
    const t = textTex(text, opts);
    const fm = toon(frameColor);
    const b = mesh(new THREE.BoxGeometry(w, h, 0.16), [fm, fm, fm, fm, basic(0xffffff, { map: t }), fm]);
    outline(b, 0.03);
    return b;
  }

  // ------------------------------------------------------------------
  // 10) 하치와레의 동굴 집
  // ------------------------------------------------------------------
  function hachiCave() {
    const g = new THREE.Group();
    const rockM = toon(0xffffff, TEX.moss, [3, 2]);
    const mound = mesh(new THREE.SphereGeometry(7, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), rockM);
    mound.scale.set(1, 0.78, 0.92);
    outline(mound, 0.015);
    g.add(mound);
    const grass = mesh(new THREE.SphereGeometry(7.12, 40, 12, 0, Math.PI * 2, 0, Math.PI * 0.2), toon(0x7cc35a));
    grass.scale.set(1, 0.78, 0.92);
    outline(grass, 0.015);
    g.add(grass);
    // 풀 언덕 위 덤불·꽃·묘목
    [[-2, -1.5], [2.4, -0.8], [0.5, -3]].forEach(([x, z], i) => {
      const b = bush(1.0);
      b.position.set(x, 5.0 - i * 0.2, z);
      g.add(b);
    });
    const fl = flowerCluster(undefined, 8, 1.2);
    fl.position.set(0, 5.35, 1.2);
    g.add(fl);
    // 바위 둘레
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      if (Math.abs(Math.sin(a) - 1) < 0.25) continue;
      const rk = mesh(new THREE.DodecahedronGeometry(0.9 + rnd() * 0.8, 1), rockM);
      rk.position.set(Math.cos(a) * 6.8, 0.4, Math.sin(a) * 6.3);
      rk.scale.y = 0.7;
      outline(rk, 0.03);
      g.add(rk);
    }
    // 둥근 나무문 + 돌 아치
    const door = doorW(2.0, 2.9, 0x8ecae6);
    door.position.set(0, 0, 6.15);
    g.add(door);
    for (let i = 0; i <= 8; i++) {
      const a = Math.PI * (i / 8);
      const st = mesh(new THREE.DodecahedronGeometry(0.42, 0), toon(0xffffff, TEX.stone));
      st.position.set(Math.cos(a) * 1.45, 1.95 + Math.sin(a) * 1.45 * (i === 0 || i === 8 ? 0 : 1), 6.25);
      if (i === 0 || i === 8) st.position.y = 0.4;
      outline(st, 0.05);
      g.add(st);
    }
    [-1.45, 1.45].forEach(x => {
      const st = mesh(new THREE.DodecahedronGeometry(0.42, 0), toon(0xffffff, TEX.stone));
      st.position.set(x, 1.2, 6.25);
      g.add(st);
    });
    // 동그란 창문 2개
    [-1, 1].forEach(side => {
      const a = Math.PI / 2 + side * 0.75;
      const wx = Math.cos(a) * 6.25, wz = Math.sin(a) * 5.75;
      const win = new THREE.Group();
      const fr = mesh(new THREE.TorusGeometry(0.62, 0.13, 8, 24), toon(0xa86b3c));
      outline(fr, 0.05);
      const gl = mesh(new THREE.CircleGeometry(0.6, 20), basic(0xfff1b8), false);
      gl.position.z = -0.02;
      animated.push({ type: 'window', mat: gl.material });
      const cr1 = mesh(new THREE.BoxGeometry(1.2, 0.06, 0.05), toon(0xa86b3c), false);
      win.add(fr, gl, cr1);
      win.position.set(wx, 2.0, wz);
      win.lookAt(wx * 2, 2.0, wz * 2);
      g.add(win);
    });
    // 연통 + 연기
    const pipe = mesh(new THREE.CylinderGeometry(0.28, 0.28, 2.2, 12), toon(0x6b7280));
    pipe.position.set(-2.4, 5.4, -1.2);
    outline(pipe, 0.05);
    g.add(pipe);
    const pcap = mesh(new THREE.ConeGeometry(0.55, 0.45, 12), toon(0x4b5563), false);
    pcap.position.set(-2.4, 6.75, -1.2);
    g.add(pcap);
    smokePuffs(g, V(-2.4, 7.2, -1.2));
    // 앞마당: 원탁 + 찻잔, 그루터기 의자, 빨랫줄, 우체통, 등불 줄
    const table = new THREE.Group();
    const tt = mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.14, 20), toon(0xffffff, TEX.ringWood));
    tt.position.y = 1.0;
    outline(tt, 0.04);
    const tl = mesh(new THREE.CylinderGeometry(0.14, 0.3, 1.0, 10), toon(0x8a5a2b), false);
    tl.position.y = 0.5;
    table.add(tt, tl);
    [[0.35, 0.2, 0xffffff], [-0.35, -0.15, 0x8ecae6]].forEach(([x, z, c]) => {
      const cup = mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.2, 12), toon(c), false);
      cup.position.set(x, 1.17, z);
      table.add(cup);
    });
    const kettle = mesh(new THREE.SphereGeometry(0.26, 12, 10), toon(0xf9a8d4), false);
    kettle.position.set(0, 1.28, -0.4);
    table.add(kettle);
    table.position.set(3.6, 0, 9.2);
    g.add(table);
    [[2.2, 9.6], [5.0, 9.0]].forEach(([x, z]) => {
      const st = mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.6, 14), toon(0xffffff, TEX.plank, [1, 0.3]));
      st.position.set(x, 0.3, z);
      outline(st, 0.04);
      const top = mesh(new THREE.CircleGeometry(0.45, 14), toon(0xffffff, TEX.ringWood), false);
      top.rotation.x = -Math.PI / 2;
      top.position.set(x, 0.61, z);
      g.add(st, top);
    });
    const p1 = V(-5.2, 0, 8.0), p2 = V(-1.8, 0, 10.6);
    [p1, p2].forEach(p => {
      const po = mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.4, 6), toon(0x8a5a2b));
      po.position.set(p.x, 1.2, p.z);
      g.add(po);
    });
    const cols = [0xffffff, 0x8ecae6, 0xfde68a];
    for (let i = 0; i < 3; i++) {
      const t = 0.22 + i * 0.28;
      const cloth = mesh(new THREE.PlaneGeometry(0.7, 0.9), toon(cols[i], null, null, { side: THREE.DoubleSide }), false);
      cloth.position.set(p1.x + (p2.x - p1.x) * t, 1.75, p1.z + (p2.z - p1.z) * t);
      cloth.rotation.y = Math.atan2(p2.x - p1.x, p2.z - p1.z) + Math.PI / 2;
      g.add(cloth);
      animated.push({ type: 'cloth', obj: cloth, phase: i });
    }
    const mb = mailbox();
    mb.position.set(-2.4, 0, 8.4);
    mb.traverse(o => { if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === 0xff6b8a) o.material = toon(0x60a5fa); });
    g.add(mb);
    const lp = paperLantern(0xfde68a, 0.38);
    lp.position.set(1.6, 3.6, 6.6);
    g.add(lp);
    const lp2 = paperLantern(0xfde68a, 0.38);
    lp2.position.set(-1.6, 3.6, 6.6);
    g.add(lp2);
    // 징검돌
    for (let i = 0; i < 4; i++) {
      const s = mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.12, 10), toon(0xffffff, TEX.stone), false);
      s.position.set(Math.sin(i) * 0.4, 0.06, 7.6 + i * 1.3);
      g.add(s);
    }
    g.userData.colliders = [{ c: [0, 0], r: 6.6 }, { c: [3.6, 9.2], r: 1.0, h: 1.07, stand: true }, { c: [2.2, 9.6], r: 0.48, h: 0.6, stand: true }, { c: [5.0, 9.0], r: 0.48, h: 0.6, stand: true },
      { c: [-2.4, 8.4], r: 0.4, h: 1.6 }, { c: [-5.2, 8.0], r: 0.2, h: 2.4 }, { c: [-1.8, 10.6], r: 0.2, h: 2.4 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 11) 노동 안내소 (일거리 게시판)
  // ------------------------------------------------------------------
  function flyerTex() {
    return canvasTex('flyers', 512, (ctx, s) => {
      ctx.fillStyle = '#c8955a';
      ctx.fillRect(0, 0, s, s);
      jitter(ctx, s, 600, '#8a5a2b', 0.25, 4);
      const jobs = [['풀뽑기', '#fff7d6', '#15803d'], ['스티커\n붙이기', '#fde2e4', '#be185d'], ['토벌\n의뢰', '#fee2e2', '#b91c1c'], ['택배\n배달', '#e0f2fe', '#0369a1'], ['밭일\n도와줘', '#ecfccb', '#4d7c0f'], ['꽃 심기', '#fae8ff', '#a21caf']];
      jobs.forEach(([t, bg, fg], i) => {
        const x = 24 + (i % 3) * 160 + (rnd() - 0.5) * 16, y = 30 + Math.floor(i / 3) * 240 + (rnd() - 0.5) * 16;
        ctx.save();
        ctx.translate(x + 70, y + 100);
        ctx.rotate((rnd() - 0.5) * 0.18);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(-66, -94, 140, 200);
        ctx.fillStyle = bg;
        ctx.fillRect(-70, -100, 140, 200);
        ctx.fillStyle = fg;
        ctx.font = '900 30px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        t.split('\n').forEach((ln, k) => ctx.fillText(ln, 0, -40 + k * 36));
        ctx.fillRect(-45, 40, 90, 6);
        ctx.fillRect(-45, 56, 70, 6);
        ctx.fillRect(-45, 72, 80, 6);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(0, -88, 7, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    });
  }
  function laborOffice() {
    const g = new THREE.Group();
    const b = building({ w: 9, d: 6, h: 4.0, rise: 2.4, wall: toon(0xf3dfc1, TEX.plankH, [2, 1]), roof: toon(0x6d8fd1, TEX.shingle, [4, 2]) });
    g.add(b);
    const door = doorW(1.7, 2.7, 0xd9a066);
    door.position.set(-2.2, 0.5, 3.02);
    g.add(door);
    // 접수 창구 (작은 차양 + 카운터)
    const win = windowW(2.2, 1.4, 0, false);
    win.position.set(1.8, 2.6, 3.0);
    g.add(win);
    const ledge = mesh(roundBox(2.8, 0.15, 0.7, 0.05), toon(0x8a5a2b));
    ledge.position.set(1.8, 1.75, 3.3);
    g.add(ledge);
    const bell = mesh(new THREE.SphereGeometry(0.16, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), toon(0xfacc15), false);
    bell.position.set(2.6, 1.83, 3.35);
    g.add(bell);
    const awn = mesh(roundBox(3.2, 0.1, 1.2, 0.04), toon(0xffffff, () => TEX.stripe('#3b82f6', '#ffffff'), [2, 1]));
    awn.position.set(1.8, 3.65, 3.5);
    awn.rotation.x = 0.35;
    outline(awn, 0.03);
    g.add(awn);
    const sign = signBoard('🛠️ 노동 안내소', 5.2, 1.1, { bg: '#fffbeb', fg: '#1e3a8a', border: '#1e3a8a', font: 58 }, 0x1e3a8a);
    sign.position.set(0, 5.35, 3.15);
    g.add(sign);
    // 일거리 게시판 (지붕 달린)
    const board = new THREE.Group();
    const bp = toon(0xffffff, TEX.plank, [0.3, 1]);
    [-2.2, 2.2].forEach(x => {
      const p = mesh(roundBox(0.28, 3.9, 0.28, 0.05), bp);
      p.position.set(x, 1.95, 0);
      outline(p, 0.04);
      board.add(p);
    });
    const ft = flyerTex();
    const fm = toon(0x8a5a2b);
    const panel = mesh(new THREE.BoxGeometry(4.1, 2.4, 0.15), [fm, fm, fm, fm, toon(0xffffff, () => ft), fm]);
    panel.position.y = 2.3;
    outline(panel, 0.03);
    board.add(panel);
    const r = gableRoof(4.6, 1.2, 3.55, 0.55, toon(0x6d8fd1, TEX.shingle, [2, 1]), 0.3);
    board.add(r.g);
    const title = signBoard('일거리 모집!', 2.6, 0.5, { bg: '#fde047', fg: '#7c2d12', border: '#7c2d12', font: 64 }, 0x7c2d12);
    title.position.set(0, 3.75, 0.2);
    board.add(title);
    board.position.set(4.6, 0, 6.6);
    board.rotation.y = -0.35;
    g.add(board);
    // 소품: 벤치, 풀 담긴 바구니, 낫, 상자
    const bn = bench();
    bn.position.set(-3.6, 0, 6.2);
    bn.rotation.y = 0.2;
    g.add(bn);
    const basket = new THREE.Group();
    const bk = mesh(new THREE.CylinderGeometry(0.6, 0.48, 0.6, 14), toon(0xd6a35c));
    bk.position.y = 0.3;
    outline(bk, 0.05);
    basket.add(bk);
    for (let i = 0; i < 7; i++) {
      const w = mesh(new THREE.ConeGeometry(0.08, 0.7, 4), toon(0x65a30d), false);
      w.position.set((rnd() - 0.5) * 0.7, 0.85, (rnd() - 0.5) * 0.7);
      w.rotation.set((rnd() - 0.5) * 0.6, 0, (rnd() - 0.5) * 0.6);
      basket.add(w);
    }
    basket.position.set(-0.4, 0, 4.4);
    g.add(basket);
    const c1 = crate(0.9);
    c1.position.set(-5.4, 0, 2.2);
    g.add(c1);
    const c2 = crate(0.7);
    c2.position.set(-5.3, 0.9, 2.1);
    c2.rotation.y = 0.4;
    g.add(c2);
    g.userData.colliders = [{ b: [0, 0], w: 9.6, d: 6.6 }, { b: [4.6, 6.6], w: 4.8, d: 0.6, ry: -0.35, h: 3.9 },
      { b: [-3.6, 6.1], w: 2.5, d: 0.9, ry: 0.2, h: 0.7, stand: true }, { c: [-0.4, 4.4], r: 0.6, h: 0.6, stand: true },
      { b: [-5.4, 2.2], w: 0.9, d: 0.9, h: 0.9, stand: true }, { b: [1.8, 3.3], w: 2.8, d: 0.7, h: 1.85 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 12) 대중목욕탕 (센토)
  // ------------------------------------------------------------------
  function sento() {
    const g = new THREE.Group();
    const W = 12, D = 8, H = 4.6;
    const b = building({ w: W, d: D, h: H, rise: 3.0, wall: toon(0xfffaf0, TEX.plaster, [3, 1]), roof: toon(0x5f7396, TEX.shingle, [5, 2]), trim: 0x7c4a24 });
    g.add(b);
    // 아래쪽 판자 벽
    const wain = mesh(roundBox(W + 0.08, 1.4, D + 0.08, 0.06), toon(0xffffff, TEX.plank, [3, 0.4]));
    wain.position.y = 1.0;
    g.add(wain);
    // 가라하후(물결 지붕) 현관
    const ent = new THREE.Group();
    [-1.9, 1.9].forEach(x => {
      const p = mesh(new THREE.CylinderGeometry(0.2, 0.22, 3.8, 10), toon(0x7c4a24));
      p.position.set(x, 2.2, 1.6);
      outline(p, 0.05);
      ent.add(p);
    });
    const rs = new THREE.Shape();
    rs.moveTo(-3.0, 0);
    rs.bezierCurveTo(-2.4, 0.2, -1.4, 1.6, 0, 1.6);
    rs.bezierCurveTo(1.4, 1.6, 2.4, 0.2, 3.0, 0);
    rs.lineTo(3.0, -0.35);
    rs.bezierCurveTo(2.4, -0.15, 1.4, 1.2, 0, 1.2);
    rs.bezierCurveTo(-1.4, 1.2, -2.4, -0.15, -3.0, -0.35);
    rs.lineTo(-3.0, 0);
    const kroof = mesh(new THREE.ExtrudeGeometry(rs, { depth: 2.6, bevelEnabled: false, curveSegments: 16 }), toon(0x5f7396, TEX.shingle, [0.3, 0.3]));
    kroof.position.set(0, 4.1, 0.2);
    outline(kroof, 0.02);
    ent.add(kroof);
    const gold = mesh(new THREE.TorusGeometry(0.35, 0.08, 8, 16), toon(0xfacc15), false);
    gold.position.set(0, 5.15, 2.85);
    ent.add(gold);
    ent.position.z = D / 2;
    g.add(ent);
    // 노렌 (♨ 목욕)
    const nt = TEX.noren('♨ 목욕', '#1e40af', '#ffffff');
    for (let i = 0; i < 3; i++) {
      const n = mesh(new THREE.PlaneGeometry(1.25, 1.5), new THREE.MeshToonMaterial({ map: nt.clone(), gradientMap: GM(), side: THREE.DoubleSide }), false);
      n.material.map.needsUpdate = true;
      n.material.map.repeat.set(1 / 3, 1);
      n.material.map.offset.set(i / 3, 0);
      n.position.set(-1.27 + i * 1.27, 3.2, D / 2 + 0.25);
      g.add(n);
      animated.push({ type: 'cloth', obj: n, phase: i * 0.8 });
    }
    const dr = mesh(new THREE.PlaneGeometry(3.6, 3.6), basic(0x3b2a1a), false);
    dr.position.set(0, 2.1, D / 2 + 0.1);
    g.add(dr);
    // 창문
    [-4.3, 4.3].forEach(x => {
      const w = windowW(1.6, 1.3, 0, false);
      w.position.set(x, 3.3, D / 2 + 0.02);
      g.add(w);
    });
    // 큰 굴뚝 (벽돌) + 연기
    const ch = mesh(new THREE.CylinderGeometry(0.75, 1.0, 12, 14), toon(0xffffff, TEX.brick, [2, 5]));
    ch.position.set(4.0, 6.0, -D / 2 - 1.2);
    outline(ch, 0.02);
    g.add(ch);
    const chTop = mesh(new THREE.CylinderGeometry(0.95, 0.85, 0.5, 14), toon(0x4b5563));
    chTop.position.set(4.0, 12.2, -D / 2 - 1.2);
    g.add(chTop);
    const chSign = mesh(new THREE.CylinderGeometry(0.78, 0.82, 1.8, 14, 1, true), new THREE.MeshBasicMaterial({ map: textTex('♨ 湯 ♨ 湯 ♨', { w: 512, h: 96, bg: '#ffffff', fg: '#b91c1c', border: null, font: 64 }), side: THREE.DoubleSide }), false);
    chSign.position.set(4.0, 9.6, -D / 2 - 1.2);
    g.add(chSign);
    smokePuffs(g, V(4.0, 12.6, -D / 2 - 1.2), 0xe5e7eb);
    // 동그란 간판
    const disc = mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.18, 24), [toon(0xb91c1c), basic(0xffffff, { map: textTex('♨', { w: 128, h: 128, bg: '#ffffff', fg: '#dc2626', border: '#dc2626', font: 96 }) }), toon(0xb91c1c)]);
    disc.rotation.x = Math.PI / 2;
    disc.rotation.y = 0;
    disc.position.set(-4.3, 6.2, D / 2 + 0.6);
    outline(disc, 0.04);
    g.add(disc);
    // 노란 목욕 바가지 탑 + 벤치 + 등불
    for (let i = 0; i < 4; i++) {
      const bkt = mesh(new THREE.CylinderGeometry(0.42, 0.34, 0.36, 14, 1, true), toon(0xfacc15, null, null, { side: THREE.DoubleSide }));
      bkt.position.set(-3.5, 0.18 + i * 0.22, D / 2 + 1.6);
      outline(bkt, 0.05);
      g.add(bkt);
    }
    const bn = bench();
    bn.position.set(4.2, 0, D / 2 + 1.8);
    bn.rotation.y = Math.PI;
    g.add(bn);
    [-2.6, 2.6].forEach(x => {
      const l = paperLantern(0xffffff, 0.42);
      l.position.set(x, 3.5, D / 2 + 1.9);
      g.add(l);
    });
    g.userData.colliders = [{ b: [0, 0], w: W + 0.6, d: D + 0.6 }, { c: [-1.9, D / 2 + 1.6], r: 0.3, h: 4 }, { c: [1.9, D / 2 + 1.6], r: 0.3, h: 4 },
      { c: [4.0, -D / 2 - 1.2], r: 1.05 }, { c: [-3.5, D / 2 + 1.6], r: 0.45, h: 0.9, stand: true }, { b: [4.2, D / 2 + 1.9], w: 2.5, d: 0.9, ry: Math.PI, h: 0.7, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 13) 마켓 거리 (과일 · 꽃 · 빵 노점)
  // ------------------------------------------------------------------
  function marketStall(kind) {
    const g = new THREE.Group();
    const cfg = {
      fruit: ['#f97316', '#ffffff', '🍎 과일가게'],
      flower: ['#22c55e', '#ffffff', '🌷 꽃가게'],
      bread: ['#a855f7', '#ffffff', '🥐 빵집']
    }[kind];
    const counter = mesh(roundBox(4.0, 1.1, 1.8, 0.1), toon(0xffffff, TEX.plankH, [1, 0.5]));
    counter.position.y = 0.55;
    outline(counter, 0.03);
    g.add(counter);
    const top = mesh(roundBox(4.3, 0.12, 2.1, 0.04), toon(0x8a5a2b));
    top.position.y = 1.16;
    g.add(top);
    [[-1.9, -0.8], [1.9, -0.8], [-1.9, 0.9], [1.9, 0.9]].forEach(([x, z]) => {
      const p = mesh(new THREE.CylinderGeometry(0.08, 0.08, z < 0 ? 3.4 : 2.8, 8), toon(0xfde68a), false);
      p.position.set(x, (z < 0 ? 3.4 : 2.8) / 2, z);
      g.add(p);
    });
    const awn = mesh(roundBox(4.6, 0.1, 2.6, 0.04), toon(0xffffff, () => TEX.stripe(cfg[0], cfg[1]), [3, 1]));
    awn.position.set(0, 3.15, 0.1);
    awn.rotation.x = 0.24;
    outline(awn, 0.03);
    g.add(awn);
    for (let i = 0; i < 9; i++) {
      const sc = mesh(new THREE.CylinderGeometry(0.255, 0.255, 0.08, 12, 1, false, Math.PI / 2, Math.PI), toon(i % 2 ? 0xffffff : parseInt(cfg[0].slice(1), 16)), false);
      sc.rotation.x = Math.PI / 2;
      sc.position.set(-2.04 + i * 0.51, 2.83, 1.4);
      g.add(sc);
    }
    const sign = signBoard(cfg[2], 2.8, 0.6, { bg: '#fffbeb', fg: cfg[0], border: cfg[0], font: 60 }, parseInt(cfg[0].slice(1), 16));
    sign.position.set(0, 3.75, -0.8);
    g.add(sign);
    // 상품
    if (kind === 'fruit') {
      [-1.3, 0, 1.3].forEach((x, i) => {
        const box = mesh(roundBox(1.1, 0.3, 0.9, 0.04), toon(0xffffff, TEX.plankH, [0.4, 0.2]), false);
        box.position.set(x, 1.37, 0.2);
        box.rotation.x = -0.2;
        g.add(box);
        const col = [0xef4444, 0xfb923c, 0xfde047][i];
        for (let k = 0; k < 7; k++) {
          const f = mesh(new THREE.SphereGeometry(0.17, 10, 8), toon(col), false);
          f.position.set(x - 0.35 + (k % 4) * 0.23, 1.6 + Math.floor(k / 4) * 0.12, 0.05 + Math.floor(k / 4) * 0.25 + (k % 2) * 0.05);
          g.add(f);
        }
      });
      const grapes = new THREE.Group();
      for (let k = 0; k < 10; k++) {
        const gr = mesh(new THREE.SphereGeometry(0.09, 8, 6), toon(0x7c3aed), false);
        gr.position.set((k % 3 - 1) * 0.14, -Math.floor(k / 3) * 0.13, (k % 2) * 0.08);
        grapes.add(gr);
      }
      grapes.position.set(1.6, 2.7, 0.7);
      g.add(grapes);
    } else if (kind === 'flower') {
      [-1.4, -0.5, 0.4, 1.3].forEach((x, i) => {
        const bk = mesh(new THREE.CylinderGeometry(0.32, 0.26, 0.5, 12), toon([0x60a5fa, 0xf9a8d4, 0xfde68a, 0xa7f3d0][i]), false);
        bk.position.set(x, 1.47, 0.25);
        outline(bk, 0.05);
        g.add(bk);
        const fl = flowerCluster([[0xff85a2], [0xfde047], [0xffffff], [0xc084fc]][i], 5, 0.18);
        fl.position.set(x, 1.55, 0.25);
        fl.scale.setScalar(1.3);
        g.add(fl);
      });
      [-1.6, 1.6].forEach(x => {
        const pt = pot(0xe07a5f, 'bush');
        pt.position.set(x, 0, 1.6);
        pt.scale.setScalar(0.8);
        g.add(pt);
      });
    } else {
      for (let k = 0; k < 6; k++) {
        const bread = mesh(new THREE.SphereGeometry(0.3, 12, 10), toon(0xd4a056), false);
        bread.scale.set(1.3, 0.7, 0.9);
        bread.position.set(-1.5 + k * 0.55, 1.42, 0.25 + (k % 2) * 0.25);
        outline(bread, 0.06);
        g.add(bread);
      }
      const basket = mesh(new THREE.CylinderGeometry(0.5, 0.4, 0.4, 14), toon(0xd6a35c));
      basket.position.set(1.4, 1.42, -0.4);
      g.add(basket);
      for (let k = 0; k < 3; k++) {
        const bag = mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.0, 8), toon(0xe0a85c), false);
        bag.position.set(1.3 + k * 0.12, 1.85, -0.4);
        bag.rotation.z = -0.3 + k * 0.25;
        g.add(bag);
      }
      const cake = mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.35, 16), toon(0xfbcfe8), false);
      cake.position.set(-1.3, 1.85, -0.45);
      g.add(cake);
    }
    g.userData.colliders = [{ b: [0, 0.05], w: 4.4, d: 2.2, h: 1.2, stand: true }];
    return g;
  }
  function market() {
    const g = new THREE.Group();
    ['fruit', 'flower', 'bread'].forEach((k, i) => {
      const s = marketStall(k);
      const a = (i - 1) * 0.5;
      s.position.set(Math.sin(a) * 9, 0, -Math.cos(a) * 9 + 9);
      s.rotation.y = -a;
      g.add(s);
    });
    // 바닥 (돌길)
    const floor = mesh(new THREE.CircleGeometry(11, 40), toon(0xffffff, TEX.cobble, [5, 5]), false);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.04;
    g.add(floor);
    // 전구 줄 + 가로등
    const lampA = streetLamp(), lampB = streetLamp();
    lampA.position.set(-9, 0, 4);
    lampA.rotation.y = Math.PI / 2;
    lampB.position.set(9, 0, 4);
    lampB.rotation.y = Math.PI / 2;
    g.add(lampA, lampB);
    const cols = [0xfde047, 0xff85a2, 0x7dd3fc, 0xa7f3d0];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const x = -8 + 16 * t;
      const y = 4.4 - Math.sin(t * Math.PI) * 1.0;
      const z = 4 - Math.sin(t * Math.PI) * 2.0;
      const bulb = mesh(new THREE.SphereGeometry(0.13, 8, 6), basic(cols[i % 4]), false);
      bulb.position.set(x, y, z);
      g.add(bulb);
      const bg = glowSprite(cols[i % 4], 1.0, 0.5);
      bg.position.copy(bulb.position);
      g.add(bg);
    }
    // 가운데 피크닉 테이블 + 파라솔
    const tbl = new THREE.Group();
    const tt = mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 18), toon(0xffffff, TEX.ringWood));
    tt.position.y = 1.0;
    outline(tt, 0.04);
    const leg = mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 8), toon(0xffffff), false);
    leg.position.y = 1.6;
    const um = mesh(new THREE.ConeGeometry(2.3, 0.8, 12, 1, true), toon(0xffffff, () => TEX.stripe('#f43f5e', '#ffffff'), [6, 1], { side: THREE.DoubleSide }));
    um.position.y = 3.3;
    outline(um, 0.03);
    tbl.add(tt, leg, um);
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + 0.4;
      const st = mesh(new THREE.CylinderGeometry(0.35, 0.3, 0.65, 12), toon(0x60a5fa));
      st.position.set(Math.cos(a) * 1.7, 0.33, Math.sin(a) * 1.7);
      outline(st, 0.05);
      tbl.add(st);
    }
    tbl.position.set(0, 0, 4.8);
    g.add(tbl);
    g.userData.colliders = [{ c: [0, 4.8], r: 1.1, h: 1.06, stand: true }, { c: [-9, 4], r: 0.4, h: 4.2 }, { c: [9, 4], r: 0.4, h: 4.2 },
      ...Array.from({ length: 4 }, (_, k) => { const a = (k / 4) * Math.PI * 2 + 0.4; return { c: [Math.cos(a) * 1.7, 4.8 + Math.sin(a) * 1.7], r: 0.35, h: 0.65, stand: true }; })];
    return g;
  }

  // ------------------------------------------------------------------
  // 14) 농장 (밭 · 허수아비 · 헛간)
  // ------------------------------------------------------------------
  function farm() {
    const g = new THREE.Group();
    const soil = mesh(roundBox(14, 0.2, 10, 0.06), toon(0x8b5a2b), false);
    soil.position.set(0, 0.1, 2);
    g.add(soil);
    for (let r = 0; r < 6; r++) {
      const ridge = mesh(roundBox(13, 0.3, 0.9, 0.12), toon(0x7a4a22), false);
      ridge.position.set(0, 0.25, -2.2 + r * 1.65);
      g.add(ridge);
      for (let k = 0; k < 9; k++) {
        const x = -5.8 + k * 1.45;
        const z = -2.2 + r * 1.65;
        if (r % 3 === 0) {
          const cab = mesh(new THREE.IcosahedronGeometry(0.38, 1), toon(0x86efac), false);
          cab.position.set(x, 0.65, z);
          cab.scale.y = 0.8;
          g.add(cab);
          const leaf = mesh(new THREE.SphereGeometry(0.48, 8, 6, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.3), toon(0x4ade80, null, null, { side: THREE.DoubleSide }), false);
          leaf.position.set(x, 0.75, z);
          g.add(leaf);
        } else if (r % 3 === 1) {
          const top = mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.12, 8), toon(0xf97316), false);
          top.position.set(x, 0.42, z);
          g.add(top);
          for (let l = 0; l < 3; l++) {
            const lf = mesh(new THREE.ConeGeometry(0.07, 0.6, 4), toon(0x22c55e), false);
            lf.position.set(x + (l - 1) * 0.08, 0.75, z);
            lf.rotation.z = (l - 1) * 0.4;
            g.add(lf);
          }
        } else {
          const sp = mesh(new THREE.SphereGeometry(0.22, 8, 6), toon(0x65a30d), false);
          sp.position.set(x, 0.55, z);
          sp.scale.set(1, 0.6, 1.4);
          g.add(sp);
        }
      }
    }
    // 허수아비
    const sc = new THREE.Group();
    const pole = mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.4, 8), toon(0x8a5a2b));
    pole.position.y = 1.7;
    const bar = mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 8), toon(0x8a5a2b), false);
    bar.rotation.z = Math.PI / 2;
    bar.position.y = 2.5;
    const shirt = mesh(roundBox(1.2, 1.1, 0.5, 0.15), toon(0x60a5fa));
    shirt.position.y = 2.25;
    outline(shirt, 0.05);
    const head = mesh(new THREE.SphereGeometry(0.45, 14, 12), toon(0xf5deb3));
    head.position.y = 3.25;
    outline(head, 0.05);
    const brim = mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.06, 18), toon(0xfacc15), false);
    brim.position.y = 3.55;
    const crown = mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.4, 14), toon(0xfacc15), false);
    crown.position.y = 3.75;
    const ribbon = mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.1, 14), toon(0xef4444), false);
    ribbon.position.y = 3.62;
    [-1, 1].forEach(s => {
      const eye = mesh(new THREE.SphereGeometry(0.05, 6, 4), toon(0x1f2937), false);
      eye.position.set(s * 0.15, 3.3, 0.42);
      sc.add(eye);
      const hand = mesh(new THREE.ConeGeometry(0.15, 0.35, 6), toon(0xf4d27a), false);
      hand.rotation.z = s * Math.PI / 2;
      hand.position.set(s * 1.4, 2.5, 0);
      sc.add(hand);
    });
    sc.add(pole, bar, shirt, head, brim, crown, ribbon);
    sc.position.set(0, 0, 2.6);
    g.add(sc);
    animated.push({ type: 'cloth', obj: sc, phase: 1.3 });
    // 빨간 헛간
    const barn = building({ w: 7, d: 6, h: 4.0, rise: 2.6, wall: toon(0xd9534f, TEX.plank, [2, 1]), roof: toon(0x6b4a3a, TEX.shingle, [3, 2]), trim: 0xffffff });
    const doorG = new THREE.Group();
    [-1, 1].forEach(s => {
      const dp = mesh(roundBox(1.4, 2.8, 0.16, 0.04), toon(0xb33a35));
      dp.position.set(s * 0.72, 1.4, 0);
      doorG.add(dp);
      const x1 = mesh(new THREE.BoxGeometry(1.75, 0.13, 0.06), toon(0xffffff), false);
      x1.rotation.z = 1.1 * s;
      x1.position.set(s * 0.72, 1.4, 0.1);
      const x2 = x1.clone();
      x2.rotation.z = -1.1 * s;
      const fr = mesh(new THREE.BoxGeometry(1.42, 2.82, 0.04), toon(0xffffff), false);
      fr.position.set(s * 0.72, 1.4, 0.06);
      fr.scale.set(1, 1, 1);
      doorG.add(x1, x2);
    });
    doorG.position.set(0, 0.5, 3.05);
    barn.add(doorG);
    const loft = windowW(1.1, 0.9, 0, false);
    loft.position.set(0, 5.2, 2.85);
    barn.add(loft);
    barn.position.set(10.5, 0, -6.5);
    barn.rotation.y = -0.35;
    g.add(barn);
    // 울타리 (앞쪽 출입구 비움)
    [[-7.4, 2, Math.PI / 2, 10], [7.4, 2, Math.PI / 2, 10], [0, -3.4, 0, 15], [-4.5, 7.4, 0, 6], [4.5, 7.4, 0, 6]].forEach(([x, z, ry, len]) => {
      const f = fence(len, Math.max(3, Math.round(len / 2.2)));
      f.position.set(x, 0, z);
      f.rotation.y = ry;
      g.add(f);
    });
    // 물뿌리개 + 수레 + 건초
    const can = new THREE.Group();
    const cb = mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.6, 14), toon(0x34d399));
    cb.position.y = 0.3;
    outline(cb, 0.05);
    const sp = mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.7, 8), toon(0x34d399), false);
    sp.rotation.z = -0.9;
    sp.position.set(0.45, 0.5, 0);
    can.add(cb, sp);
    can.position.set(-6.2, 0, 8.6);
    g.add(can);
    const cart = new THREE.Group();
    const tray = mesh(roundBox(1.6, 0.5, 1.0, 0.08), toon(0x9ca3af));
    tray.position.y = 0.8;
    outline(tray, 0.04);
    const wh = mesh(new THREE.TorusGeometry(0.32, 0.08, 6, 14), toon(0x374151), false);
    wh.position.set(0.9, 0.35, 0);
    cart.add(tray, wh);
    const pumpkin = mesh(new THREE.SphereGeometry(0.4, 12, 8), toon(0xf97316), false);
    pumpkin.scale.y = 0.75;
    pumpkin.position.set(0, 1.2, 0);
    cart.add(pumpkin);
    cart.position.set(6.5, 0, 6.5);
    cart.rotation.y = 0.6;
    g.add(cart);
    for (let i = 0; i < 3; i++) {
      const hay = mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.3, 14), toon(0xf4d27a));
      hay.rotation.z = Math.PI / 2;
      hay.position.set(13.5, 0.85 + (i === 2 ? 1.5 : 0), -2.2 + (i === 2 ? 0.9 : i * 1.8));
      outline(hay, 0.04);
      g.add(hay);
    }
    g.userData.colliders = [{ b: [10.5, -6.5], w: 7.6, d: 6.6, ry: -0.35 }, { c: [0, 2.6], r: 0.5, h: 3.9 },
      { b: [-7.4, 2], w: 0.4, d: 10, h: 1.5 }, { b: [7.4, 2], w: 0.4, d: 10, h: 1.5 }, { b: [0, -3.4], w: 15, d: 0.4, h: 1.5 },
      { b: [-4.5, 7.4], w: 6, d: 0.4, h: 1.5 }, { b: [4.5, 7.4], w: 6, d: 0.4, h: 1.5 },
      { b: [6.5, 6.5], w: 1.8, d: 1.1, ry: 0.6, h: 1.05, stand: true }, { b: [13.5, -1.3], w: 1.4, d: 4.4, h: 1.7, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 15) 놀이터 (그네 · 미끄럼틀 · 시소)
  // ------------------------------------------------------------------
  function playground() {
    const g = new THREE.Group();
    const sand = mesh(new THREE.CylinderGeometry(10.5, 10.8, 0.16, 40), toon(0xf6dfa8), false);
    sand.position.y = 0.08;
    g.add(sand);
    const border = mesh(new THREE.TorusGeometry(10.7, 0.25, 8, 48), toon(0xffffff, TEX.plankH, [8, 0.2]), false);
    border.rotation.x = Math.PI / 2;
    border.position.y = 0.2;
    g.add(border);
    // 그네
    const sw = new THREE.Group();
    const pm = toon(0xef4444);
    [-2.6, 2.6].forEach(x => {
      [-1, 1].forEach(s => {
        const leg = mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.3, 8), pm);
        leg.position.set(x, 2.05, s * 0.7);
        leg.rotation.x = -s * 0.33;
        outline(leg, 0.06);
        sw.add(leg);
      });
    });
    const topBar = mesh(new THREE.CylinderGeometry(0.13, 0.13, 5.6, 10), toon(0xfacc15));
    topBar.rotation.z = Math.PI / 2;
    topBar.position.y = 4.05;
    sw.add(topBar);
    [-1.2, 1.2].forEach((x, i) => {
      const seat = new THREE.Group();
      [-0.35, 0.35].forEach(dx => {
        const rope = mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.0, 4), toon(0x52525b), false);
        rope.position.set(dx, -1.5, 0);
        seat.add(rope);
      });
      const st = mesh(roundBox(0.9, 0.1, 0.45, 0.04), toon(i ? 0x60a5fa : 0xf472b6));
      st.position.y = -3.0;
      seat.add(st);
      seat.position.set(x, 4.0, 0);
      sw.add(seat);
      animated.push({ type: 'swing', obj: seat, phase: i * 1.7 });
    });
    sw.position.set(-4.5, 0, -2.5);
    g.add(sw);
    // 미끄럼틀
    const sl = new THREE.Group();
    const plat = mesh(roundBox(1.8, 0.2, 1.8, 0.06), toon(0xfacc15));
    plat.position.y = 2.4;
    outline(plat, 0.04);
    sl.add(plat);
    [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].forEach(([x, z]) => {
      const p = mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.4, 8), toon(0x3b82f6));
      p.position.set(x, 1.7, z);
      sl.add(p);
    });
    const roof = mesh(new THREE.ConeGeometry(1.5, 1.0, 4), toon(0x22c55e));
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 3.9;
    outline(roof, 0.04);
    sl.add(roof);
    const slopeL = Math.hypot(3.6, 2.3);
    const slope = mesh(roundBox(1.1, 0.12, slopeL, 0.05), toon(0xf472b6));
    slope.rotation.x = Math.atan2(2.3, 3.6);
    slope.position.set(0, 1.3, 0.9 + 1.8);
    outline(slope, 0.04);
    sl.add(slope);
    [-0.6, 0.6].forEach(x => {
      const rail = mesh(roundBox(0.1, 0.35, slopeL, 0.04), toon(0xec4899), false);
      rail.rotation.x = slope.rotation.x;
      rail.position.set(x, 1.55, 2.7);
      sl.add(rail);
    });
    for (let k = 0; k < 6; k++) {
      const rung = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 6), toon(0xffffff), false);
      rung.rotation.z = Math.PI / 2;
      rung.position.set(0, 0.35 + k * 0.38, -1.0);
      sl.add(rung);
    }
    [-0.5, 0.5].forEach(x => {
      const lr = mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 6), toon(0xffffff), false);
      lr.position.set(x, 1.3, -1.0);
      sl.add(lr);
    });
    sl.position.set(4.5, 0, -3.5);
    sl.rotation.y = 0.3;
    g.add(sl);
    // 시소
    const ss = new THREE.Group();
    const base = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.9, 3), toon(0x3b82f6));
    base.rotation.x = Math.PI / 2;
    base.position.y = 0.4;
    outline(base, 0.05);
    ss.add(base);
    const plank = new THREE.Group();
    const pl = mesh(roundBox(4.6, 0.14, 0.5, 0.05), toon(0xfacc15));
    outline(pl, 0.04);
    plank.add(pl);
    [-2.0, 2.0].forEach(x => {
      const h = mesh(new THREE.TorusGeometry(0.18, 0.04, 6, 10, Math.PI), toon(0xef4444), false);
      h.position.set(x, 0.1, 0);
      h.rotation.y = Math.PI / 2;
      plank.add(h);
    });
    plank.position.y = 0.8;
    ss.add(plank);
    animated.push({ type: 'seesaw', obj: plank });
    ss.position.set(0, 0, 5.5);
    g.add(ss);
    // 모래성 + 양동이
    const castle = new THREE.Group();
    const c1 = mesh(new THREE.CylinderGeometry(0.8, 0.9, 0.7, 12), toon(0xe9c98a));
    c1.position.y = 0.45;
    outline(c1, 0.05);
    const c2 = mesh(new THREE.ConeGeometry(0.55, 0.8, 10), toon(0xe9c98a));
    c2.position.y = 1.2;
    const flag = mesh(new THREE.PlaneGeometry(0.3, 0.2), toon(0xef4444, null, null, { side: THREE.DoubleSide }), false);
    flag.position.set(0.15, 1.75, 0);
    castle.add(c1, c2, flag);
    castle.position.set(-5.5, 0, 5.5);
    g.add(castle);
    const pail = mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.45, 12), toon(0x60a5fa));
    pail.position.set(-4.3, 0.38, 6.3);
    g.add(pail);
    // 벤치 + 가로등
    [[-11.8, 0, Math.PI / 2], [11.8, 0, -Math.PI / 2]].forEach(([x, z, ry]) => {
      const bn = bench();
      bn.position.set(x, 0, z);
      bn.rotation.y = ry;
      g.add(bn);
    });
    const lamp = streetLamp();
    lamp.position.set(0, 0, -11.5);
    lamp.rotation.y = Math.PI / 2;
    g.add(lamp);
    const sx = Math.cos(0.3), sn = Math.sin(0.3);
    const SL = (x, z) => [4.5 + x * sx + z * sn, -3.5 - x * sn + z * sx];
    g.userData.colliders = [
      ...[-2.6, 2.6].flatMap(x => [-1, 1].map(s => ({ c: [-4.5 + x, -2.5 + s * 1.2], r: 0.25, h: 4.1 }))),
      { b: SL(0, 0), w: 1.9, d: 1.9, ry: 0.3, h: 2.5, bottom: 2.2, stand: true },
      ...[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z]) => ({ c: SL(x, z), r: 0.18, h: 3.4 })),
      { b: SL(0, -1.0), w: 1.2, d: 0.3, ry: 0.3, h: 2.4 },
      { b: [0, 5.5], w: 4.6, d: 0.6, h: 0.95, stand: true }, { c: [-5.5, 5.5], r: 0.9, h: 0.8, stand: true },
      { b: [-11.8, 0], w: 2.5, d: 0.9, ry: Math.PI / 2, h: 0.7, stand: true }, { b: [11.8, 0], w: 2.5, d: 0.9, ry: -Math.PI / 2, h: 0.7, stand: true },
      { c: [0, -11.5], r: 0.4, h: 4.2 }];
    return g;
  }

  // ------------------------------------------------------------------
  // 16) 우물 & 육각 정자 쉼터
  // ------------------------------------------------------------------
  function wellRest() {
    const g = new THREE.Group();
    // 우물
    const well = new THREE.Group();
    const wp = [[1.0, 0], [1.4, 0], [1.4, 1.1], [1.55, 1.2], [1.55, 1.35], [1.0, 1.35], [1.0, 0.2]].map(p => new THREE.Vector2(p[0], p[1]));
    const ring = mesh(new THREE.LatheGeometry(wp, 24), toon(0xffffff, TEX.stone, [3, 1]));
    outline(ring, 0.03);
    well.add(ring);
    const water = mesh(new THREE.CircleGeometry(1.0, 20), basic(0x1e3a5f), false);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.7;
    well.add(water);
    [-1.25, 1.25].forEach(x => {
      const p = mesh(roundBox(0.2, 2.8, 0.2, 0.04), toon(0x8a5a2b));
      p.position.set(x, 2.3, 0);
      outline(p, 0.04);
      well.add(p);
    });
    const r = gableRoof(2.6, 2.0, 3.6, 0.9, toon(0xd94b4b, TEX.shingle, [2, 1]), 0.3);
    r.g.rotation.y = Math.PI / 2;
    well.add(r.g);
    const roller = mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.5, 10), toon(0xa86b3c), false);
    roller.rotation.z = Math.PI / 2;
    roller.position.y = 2.9;
    well.add(roller);
    const rope = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 4), toon(0xe9d5a8), false);
    rope.position.y = 2.2;
    well.add(rope);
    const bucket = mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.4, 12), toon(0xa86b3c));
    bucket.position.y = 1.4;
    outline(bucket, 0.05);
    well.add(bucket);
    well.position.set(-5, 0, 2);
    g.add(well);
    // 육각 정자
    const pav = new THREE.Group();
    const deck = mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.5, 6), toon(0xffffff, TEX.plankH, [3, 0.3]));
    deck.position.y = 0.25;
    outline(deck, 0.02);
    pav.add(deck);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const p = mesh(new THREE.CylinderGeometry(0.18, 0.2, 3.6, 10), toon(0xb45309));
      p.position.set(Math.cos(a) * 3.7, 2.3, Math.sin(a) * 3.7);
      outline(p, 0.05);
      pav.add(p);
      if (i !== 1) {
        const rail = mesh(roundBox(3.5, 0.14, 0.14, 0.04), toon(0xb45309), false);
        const a2 = a + Math.PI / 6;
        rail.position.set(Math.cos(a2) * 3.2, 1.2, Math.sin(a2) * 3.2);
        rail.rotation.y = -a2 + Math.PI / 2;
        pav.add(rail);
        const seat = mesh(roundBox(3.0, 0.12, 0.55, 0.04), toon(0xffffff, TEX.plankH, [1, 0.2]), false);
        seat.position.set(Math.cos(a2) * 2.85, 0.95, Math.sin(a2) * 2.85);
        seat.rotation.y = -a2 + Math.PI / 2;
        pav.add(seat);
      }
    }
    const proof = mesh(new THREE.ConeGeometry(5.2, 2.6, 6), toon(0x34d399, TEX.shingle, [6, 2]));
    proof.position.y = 5.3;
    outline(proof, 0.02);
    pav.add(proof);
    const knob = mesh(new THREE.SphereGeometry(0.35, 10, 8), toon(0xfacc15));
    knob.position.y = 6.75;
    pav.add(knob);
    const lp = paperLantern(0xfde68a, 0.45);
    lp.position.y = 3.4;
    pav.add(lp);
    const tea = mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.1, 6), toon(0xffffff, TEX.ringWood));
    tea.position.y = 1.0;
    const tleg = mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.5, 8), toon(0x8a5a2b), false);
    tleg.position.y = 0.75;
    pav.add(tea, tleg);
    pav.position.set(4, 0, -1);
    g.add(pav);
    g.userData.colliders = [{ c: [-5, 2], r: 1.55, h: 1.35, stand: true }, { c: [4, -1], r: 4.0, h: 0.5, stand: true },
      ...Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2; return { c: [4 + Math.cos(a) * 3.7, -1 + Math.sin(a) * 3.7], r: 0.3, h: 4.1 }; }),
      ...Array.from({ length: 6 }, (_, i) => i).filter(i => i !== 1).map(i => { const a2 = (i / 6) * Math.PI * 2 + Math.PI / 6; return { b: [4 + Math.cos(a2) * 3.15, -1 + Math.sin(a2) * 3.15], w: 3.5, d: 0.6, ry: -a2 + Math.PI / 2, h: 1.3 }; }),
      { c: [4, -1], r: 0.8, h: 1.05, stand: true }];
    return g;
  }

  // ------------------------------------------------------------------
  // 🧱 충돌 시스템 (구조물·나무 통과 방지 + 위에 올라서기)
  // ------------------------------------------------------------------
  const COLS = [];
  const STEP = 0.7;
  function registerColliders(scene) {
    scene.updateMatrixWorld(true);
    const q = new THREE.Quaternion(), sc = new THREE.Vector3(), wp = new THREE.Vector3(), xv = new THREE.Vector3();
    scene.traverse(o => {
      const list = o.userData && o.userData.colliders;
      if (!list || !o.visible) return;
      o.getWorldQuaternion(q);
      o.getWorldScale(sc);
      xv.set(1, 0, 0).applyQuaternion(q);
      const yaw = Math.atan2(-xv.z, xv.x);
      o.getWorldPosition(wp);
      const by = wp.y, s = sc.x;
      list.forEach(c => {
        const p = new THREE.Vector3((c.c || c.b)[0], 0, (c.c || c.b)[1]).applyMatrix4(o.matrixWorld);
        const top = by + (c.h === undefined ? 99 : c.h * sc.y);
        const bottom = by + (c.bottom || 0) * sc.y;
        if (c.c) COLS.push({ t: 0, x: p.x, z: p.z, r: c.r * s, br: c.r * s, top, bottom, stand: !!c.stand });
        else {
          const ry = yaw + (c.ry || 0);
          COLS.push({ t: 1, x: p.x, z: p.z, hw: (c.w * s) / 2, hd: (c.d * s) / 2, cos: Math.cos(ry), sin: Math.sin(ry), br: Math.hypot(c.w, c.d) * s / 2, top, bottom, stand: !!c.stand });
        }
      });
    });
  }
  function addWorldCollider(c) {
    const top = c.h === undefined ? 99 : c.h;
    if (c.r) COLS.push({ t: 0, x: c.x, z: c.z, r: c.r, br: c.r, top, bottom: c.bottom || 0, stand: !!c.stand });
    else COLS.push({ t: 1, x: c.x, z: c.z, hw: c.w / 2, hd: c.d / 2, cos: Math.cos(c.ry || 0), sin: Math.sin(c.ry || 0), br: Math.hypot(c.w, c.d) / 2, top, bottom: c.bottom || 0, stand: !!c.stand });
  }
  function collide(pos, pr = 0.85) {
    for (let iter = 0; iter < 2; iter++) {
      for (let i = 0; i < COLS.length; i++) {
        const c = COLS[i];
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const lim = c.br + pr;
        if (dx > lim || dx < -lim || dz > lim || dz < -lim) continue;
        if (pos.y >= c.top - 0.05) continue;           // 위에 올라서 있음
        if (pos.y + 1.6 < c.bottom) continue;           // 공중 발판 아래로 지나감
        if (c.stand && c.top - pos.y <= STEP) continue; // 낮은 턱은 자동으로 올라섬
        if (c.t === 0) {
          const d = Math.hypot(dx, dz), m = c.r + pr;
          if (d < m) {
            if (d < 1e-4) { pos.z = c.z + m; continue; }
            pos.x = c.x + (dx / d) * m;
            pos.z = c.z + (dz / d) * m;
          }
        } else {
          let lx = dx * c.cos - dz * c.sin, lz = dx * c.sin + dz * c.cos;
          const cx = Math.max(-c.hw, Math.min(c.hw, lx)), cz = Math.max(-c.hd, Math.min(c.hd, lz));
          const ex = lx - cx, ez = lz - cz, d = Math.hypot(ex, ez);
          if (d > 0 && d < pr) { lx = cx + (ex / d) * pr; lz = cz + (ez / d) * pr; }
          else if (d === 0) {
            const px = c.hw - Math.abs(lx), pz = c.hd - Math.abs(lz);
            if (px < pz) lx = (lx < 0 ? -1 : 1) * (c.hw + pr); else lz = (lz < 0 ? -1 : 1) * (c.hd + pr);
          } else continue;
          pos.x = c.x + lx * c.cos + lz * c.sin;
          pos.z = c.z - lx * c.sin + lz * c.cos;
        }
      }
    }
  }
  function support(pos) {
    let ground = 0;
    for (let i = 0; i < COLS.length; i++) {
      const c = COLS[i];
      if (!c.stand || c.top > 50) continue;
      const dx = pos.x - c.x, dz = pos.z - c.z;
      if (dx > c.br || dx < -c.br || dz > c.br || dz < -c.br) continue;
      if (pos.y < c.top - STEP - 0.05) continue;
      let inside;
      if (c.t === 0) inside = dx * dx + dz * dz <= c.r * c.r;
      else {
        const lx = dx * c.cos - dz * c.sin, lz = dx * c.sin + dz * c.cos;
        inside = Math.abs(lx) <= c.hw && Math.abs(lz) <= c.hd;
      }
      if (inside && c.top > ground) ground = c.top;
    }
    return ground;
  }

  // ------------------------------------------------------------------
  // 17) 레이드 입장 제단 + 입장 존 바닥 링
  // ------------------------------------------------------------------
  function zoneRing(r, color) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uC: { value: new THREE.Color(color) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uT; uniform vec3 uC; varying vec2 vUv;
        void main(){ vec2 p = vUv * 2.0 - 1.0; float d = length(p); if (d > 1.0) discard;
          float edge = smoothstep(0.86, 0.96, d) * smoothstep(1.0, 0.97, d);
          float a = atan(p.y, p.x);
          float dash = step(0.5, fract(a * 6.0 / 3.14159 + uT * 0.25));
          float inner = smoothstep(0.80, 0.84, d) * smoothstep(0.88, 0.84, d) * dash;
          float fill = (1.0 - smoothstep(0.0, 0.95, d)) * 0.10 * (0.7 + 0.3 * sin(uT * 2.0));
          float al = edge * 0.95 + inner * 0.7 + fill;
          gl_FragColor = vec4(uC * (1.2 + edge), al); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 64), mat);
    m.rotation.x = -Math.PI / 2;
    m.renderOrder = 2;
    animated.push({ type: 'uniform', mat });
    return m;
  }
  function raidAltar() {
    const g = new THREE.Group();
    const stoneM = toon(0xffffff, TEX.stone, [3, 1]);
    const darkM = toon(0x4c3a63);
    [[7.0, 0.35, 0.17], [5.8, 0.35, 0.52]].forEach(([r, h, y], i) => {
      const st = mesh(new THREE.CylinderGeometry(r, r + 0.3, h, 8), i ? darkM : stoneM);
      st.position.y = y;
      outline(st, 0.015);
      g.add(st);
    });
    // 보랏빛 룬 원판
    const rune = mesh(new THREE.CircleGeometry(4.6, 48), new THREE.MeshBasicMaterial({ map: typeof fxTex === 'function' ? fxTex('rune') : null, color: 0xc084fc, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }), false);
    rune.rotation.x = -Math.PI / 2;
    rune.position.y = 0.72;
    g.add(rune);
    animated.push({ type: 'spin2', obj: rune, speed: 0.25 });
    // 8개의 오벨리스크 + 수정
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const ob = new THREE.Group();
      const body = mesh(new THREE.CylinderGeometry(0.35, 0.6, 4.2, 4), darkM);
      body.position.y = 2.1;
      body.rotation.y = Math.PI / 4;
      outline(body, 0.04);
      ob.add(body);
      const cr = mesh(new THREE.OctahedronGeometry(0.5, 0), basic(0xd8b4fe), false);
      cr.position.y = 4.9;
      cr.scale.y = 1.5;
      ob.add(cr);
      const gl = glowSprite(0xa855f7, 2.6, 0.6);
      gl.position.y = 4.9;
      ob.add(gl);
      animated.push({ type: 'bob', obj: cr, glow: gl, base: 4.9, phase: i });
      ob.position.set(Math.cos(a) * 8.6, 0, Math.sin(a) * 8.6);
      g.add(ob);
    }
    // 중앙: 아노코 문양 석판
    const tab = mesh(roundBox(2.4, 3.0, 0.5, 0.12), darkM);
    tab.position.set(0, 2.2, -3.2);
    outline(tab, 0.04);
    g.add(tab);
    const sigil = mesh(new THREE.PlaneGeometry(1.8, 1.8), new THREE.MeshBasicMaterial({ map: textTex('🐉', { w: 128, h: 128, bg: '#2e1065', fg: '#e9d5ff', border: '#a855f7', font: 90 }) }), false);
    sigil.position.set(0, 2.3, -2.94);
    g.add(sigil);
    const ring = zoneRing(7.5, 0xa855f7);
    ring.position.y = 0.74;
    g.add(ring);
    g.userData.colliders = [{ c: [0, 0], r: 7.2, h: 0.35, stand: true }, { c: [0, 0], r: 6.0, h: 0.7, stand: true },
      { b: [0, -3.2], w: 2.4, d: 0.6, h: 3.7 },
      ...Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; return { c: [Math.cos(a) * 8.6, Math.sin(a) * 8.6], r: 0.6, h: 4.3 }; })];
    return g;
  }

  // 신규 구조물 위치 (x, z, 반경, 이름)
  const SITES = [
    { x: -60, z: -36, r: 12, fn: () => hachiCave(), label: '🏠 하치와레의 동굴 집', sy: 8.8 },
    { x: 54, z: -8, r: 11, fn: () => laborOffice(), label: '🛠️ 노동 안내소 (일거리 게시판)', sy: 9.2 },
    { x: -30, z: -62, r: 13, fn: () => sento(), label: '♨️ 대중목욕탕', sy: 10.5 },
    { x: 26, z: 58, r: 14, fn: () => market(), label: '🍎 마켓 거리 (과일·꽃·빵)', sy: 6.8 },
    { x: -110, z: 18, r: 18, fn: () => farm(), label: '🥕 들판 농장', sy: 7.5 },
    { x: 44, z: 98, r: 13, fn: () => playground(), label: '🛝 놀이터', sy: 6.8 },
    { x: 58, z: -48, r: 11, fn: () => wellRest(), label: '⛲ 우물 & 육각 정자 쉼터', sy: 8.6 },
    { x: 8, z: -44, r: 10, fn: () => raidAltar(), label: '🐉 레이드 입장 제단 · 아노코 / 파자마 새 (원 안에서 [E] 준비)', sy: 8.0, noFace: true }
  ];
  if (typeof WQ_EXCLUDE !== 'undefined') SITES.forEach(s => WQ_EXCLUDE.push([s.x, s.z, s.r]));
  function blocked(x, z, pad = 0) {
    return SITES.some(s => Math.hypot(x - s.x, z - s.z) < s.r + pad);
  }

  // ------------------------------------------------------------------
  // 마을 소품 배치
  // ------------------------------------------------------------------
  function decorate(app) {
    const scene = app.scene;
    const add = (obj, x, z, ry = 0, y = 0) => { obj.position.set(x, y, z); obj.rotation.y = ry; obj.userData.townHQ = true; scene.add(obj); return obj; };
    // 광장 가로등 8개 + 벤치 4개 + 화분
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      if (Math.abs(a - Math.PI * 1.5) < 0.4) continue; // 집 앞쪽은 비움
      add(streetLamp(), Math.cos(a) * 19.5, Math.sin(a) * 19.5, -a + Math.PI);
    }
    [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75].forEach(a => {
      add(bench(), Math.cos(a) * 9, Math.sin(a) * 9, -a - Math.PI / 2);
      add(pot(0xe07a5f), Math.cos(a + 0.35) * 9.2, Math.sin(a + 0.35) * 9.2);
    });
    // 길을 따라 가로등 (기존 징검다리 3방향)
    [[62.4, 25.2], [-62.4, 30], [-69.6, -57.6]].forEach(([ex, ez]) => {
      for (let k = 1; k <= 3; k++) {
        const t = k / 4 + 0.08;
        const x = ex * t, z = ez * t;
        const nx = -ez, nz = ex;
        const nl = Math.hypot(nx, nz);
        if (Math.abs(z - 28) < 7) continue; // 시냇물 위 제외
        add(streetLamp(), x + (nx / nl) * 3.2, z + (nz / nl) * 3.2, Math.atan2(ex, ez));
      }
    });
    // 이정표
    add(signpost([
      { text: '🍜 라멘 랑', yaw: -0.4 },
      { text: '🌾 풍차 언덕', yaw: Math.PI - 0.3 },
      { text: '⛩️ 출격 포털', yaw: 0.9 }
    ]), 7.5, 12.5, 0);
    // 라멘 포차 주변: 테이블·의자·나무통
    [[44, 26], [30, 28]].forEach(([x, z]) => {
      const tg = new THREE.Group();
      const tt = mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.12, 18), toon(0xffffff, TEX.ringWood));
      tt.position.y = 1.1;
      outline(tt, 0.04);
      tg.add(tt);
      const tl = mesh(new THREE.CylinderGeometry(0.12, 0.25, 1.1, 8), toon(0x3b3550), false);
      tl.position.y = 0.55;
      tg.add(tl);
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2;
        const st = mesh(new THREE.CylinderGeometry(0.35, 0.3, 0.7, 12), toon(0xef4444));
        st.position.set(Math.cos(a) * 1.6, 0.35, Math.sin(a) * 1.6);
        outline(st, 0.05);
        tg.add(st);
      }
      tg.userData.colliders = [{ c: [0, 0], r: 1.0, h: 1.16, stand: true }, ...[0, 1, 2].map(k => ({ c: [Math.cos((k / 3) * Math.PI * 2) * 1.6, Math.sin((k / 3) * Math.PI * 2) * 1.6], r: 0.36, h: 0.7, stand: true }))];
      add(tg, x, z);
    });
    add(barrel(), 31, 10, 0.3);
    add(barrel(), 32.2, 9.2, 0.8);
    // 풍차 언덕 울타리 + 건초
    for (let i = 0; i < 5; i++) add(fence(6, 4), -26 - i * 6.2, 36, 0);
    for (let i = 0; i < 3; i++) {
      const hay = mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.4, 14), toon(0xf4d27a));
      hay.rotation.z = Math.PI / 2;
      outline(hay, 0.04);
      add(hay, -52 + i * 2.2, 22 + (i % 2) * 1.8, i * 0.5, 0.9);
      hay.userData.colliders = [{ b: [0, 0], w: 1.4, d: 1.8, h: 0.9, stand: true, bottom: -0.9 }];
    }
    // 덤불 & 꽃밭 (구조물 주변)
    [[-9, -12], [9, -12], [-14, 6], [14, 8], [-12, -24], [12, -26], [22, -12], [-24, -14], [40, 6], [-40, 4], [24, 22], [-26, 24]].forEach(([x, z], i) => {
      add(bush(0.9 + (i % 3) * 0.25), x, z, i);
    });
    for (let i = 0; i < 14; i++) {
      const a = rnd() * Math.PI * 2, r = 23 + rnd() * 12;
      add(flowerCluster(undefined, 7, 0.9), Math.cos(a) * r, Math.sin(a) * r);
    }
    // 상자 더미 (포털 옆, 의상실 뒤)
    add(crate(1.1), 40, -14, 0.2);
    add(crate(0.8), 40.9, -13.2, -0.4, 0);
    add(crate(0.7), 40.3, -14.1, 0.6, 1.1);
    add(crate(1.0), 11, -9, 0.4);

    // 🏘️ 신규 구조물 (치이카와 애니 속 장소 + 마을 시설)
    SITES.forEach(st => {
      const obj = st.fn();
      add(obj, st.x, st.z, st.noFace ? 0 : Math.atan2(-st.x, -st.z));
      if (app.addZoneSign) app.addZoneSign(st.label, st.x, st.sy, st.z);
      if (typeof POLISH !== 'undefined' && POLISH.registerOccluder) { try { POLISH.registerOccluder(obj, st.r * 0.6, 6); } catch (e) {} }
    });

    // ⚔️ 출격 포털 입장 존 링 (coop.js ZONES.stage와 같은 위치·반경)
    const sring = zoneRing(8.2, 0xf97316);
    sring.position.set(32, 1.2, -22);
    scene.add(sring);

    // 🧱 충돌 등록: 구조물·소품(userData.colliders) + 기존 시설
    COLS.length = 0;
    registerColliders(scene);
    if (app.weedZonePos) addWorldCollider({ x: app.weedZonePos.x, z: app.weedZonePos.z, w: 5.0, d: 0.6, h: 4.3 });
    [app.puddingPos, app.pudding2Pos].forEach(pp => { if (pp) addWorldCollider({ x: pp.x, z: pp.z, r: 5.0, h: 4.0 }); });
    [[-26, 1.8, -28], [-28, 3.6, -34], [-31, 5.2, -37], [-74, 1.8, -10], [-77, 3.6, -14], [-80, 5.2, -16]].forEach(([x, y, z]) => {
      addWorldCollider({ x, z, r: 2.3, h: y + 0.375, bottom: y - 0.375, stand: true });
    });
  }

  // ------------------------------------------------------------------
  // 매 프레임 애니메이션
  // ------------------------------------------------------------------
  let night = false;
  function update(app, dt) {
    const t = performance.now() / 1000;
    night = app && app.timeOfDay === 'night';
    for (const a of animated) {
      switch (a.type) {
        case 'spin': a.obj.rotation.y += dt * a.speed; break;
        case 'spin2': a.obj.rotation.z += dt * a.speed; break;
        case 'uniform': a.mat.uniforms.uT.value = t; break;
        case 'lamp':
          a.glow.material.opacity = (night ? 0.85 : 0.35) + Math.sin(t * 2 + a.phase) * 0.05;
          a.glow.scale.setScalar(night ? 3.4 : 2.2);
          break;
        case 'lantern':
          a.g.rotation.z = Math.sin(t * 1.3 + a.phase) * 0.06;
          a.glow.material.opacity = night ? 0.75 : 0.35;
          break;
        case 'flicker': a.obj.material.opacity = a.base * (0.85 + Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.07); break;
        case 'window': a.mat.color.setHex(night ? 0xffd57a : 0xfff1b8); break;
        case 'cloth': a.obj.rotation.x = Math.sin(t * 1.6 + a.phase) * 0.08; break;
        case 'swing': a.obj.rotation.x = Math.sin(t * 1.8 + a.phase) * 0.35; break;
        case 'seesaw': a.obj.rotation.z = Math.sin(t * 1.4) * 0.22; break;
        case 'bob':
          a.obj.position.y = a.base + Math.sin(t * 1.5 + a.phase) * 0.3;
          a.obj.rotation.y = t + a.phase;
          a.glow.position.y = a.obj.position.y;
          break;
        case 'smoke':
          a.puffs.forEach(p => {
            p.t = (p.t + dt * 0.18) % 1;
            p.sp.position.set(a.base.x + Math.sin(p.t * 6 + a.base.x) * 0.4 * p.t, a.base.y + p.t * 3.2, a.base.z + p.t * 0.6);
            p.sp.scale.setScalar(0.6 + p.t * 2.2);
            p.sp.material.opacity = 0.55 * Math.sin(p.t * Math.PI);
          });
          break;
        default: break;
      }
    }
  }

  // 🧱 베이크 태그: 각 빌더 결과물에 이름(+인자)을 붙여, town_baked.js가 Blender에서 구운 모델로 교체할 수 있게 함
  const ANIM_OF = new WeakMap();
  const seedOf = str => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return (h % 2147483646) + 1; };
  const tagB = (name, fn) => function (...args) {
    const n0 = animated.length;
    const key = name + (args.length ? ':' + args.map(a => (typeof a === 'number' ? +a.toFixed(3) : a)).join(',') : '');
    const saved = RS;
    RS = seedOf(key);
    let o;
    try { o = fn.apply(this, args); } finally { RS = saved; }
    if (o && o.userData) {
      o.userData.bakeKey = key;
      if (animated.length > n0) ANIM_OF.set(o, animated.slice(n0));
    }
    return o;
  };
  house = tagB('house', house); fountain = tagB('fountain', fountain); ramenStall = tagB('ramenStall', ramenStall);
  boutique = tagB('boutique', boutique); windmill = tagB('windmill', windmill); tent = tagB('tent', tent);
  campsite = tagB('campsite', campsite); stoneLantern = tagB('stoneLantern', stoneLantern); onsen = tagB('onsen', onsen);
  portalGate = tagB('portalGate', portalGate); ruins = tagB('ruins', ruins); hachiCave = tagB('hachiCave', hachiCave);
  laborOffice = tagB('laborOffice', laborOffice); sento = tagB('sento', sento); marketStall = tagB('marketStall', marketStall);
  market = tagB('market', market); farm = tagB('farm', farm); playground = tagB('playground', playground);
  wellRest = tagB('wellRest', wellRest); raidAltar = tagB('raidAltar', raidAltar);
  streetLamp = tagB('streetLamp', streetLamp); bench = tagB('bench', bench); barrel = tagB('barrel', barrel);
  crate = tagB('crate', crate); fence = tagB('fence', fence); bush = tagB('bush', bush); mailbox = tagB('mailbox', mailbox);
  pot = tagB('pot', pot); flowerBox = tagB('flowerBox', flowerBox);

  return {
    house, fountain, ramenStall, boutique: () => { const g = boutique(); g.userData.townHQ = true; return g; }, windmill, campsite, onsen, portalGate, ruins,
    decorate, update, TEX, SITES, blocked, collide, support, registerColliders, addWorldCollider,
    animOf: o => ANIM_OF.get(o) || [],
    get colliderCount() { return COLS.length; },
    get animatedCount() { return animated.length; }
  };
})();

// 기존 단순 구조물 생성 함수를 고퀄리티 버전으로 교체 (main.js는 같은 이름으로 호출)
function createChiikawaHouse3D() { const g = TOWNHQ.house(); g.userData.townHQ = true; return g; }
function createPlazaFountain3D() { const g = TOWNHQ.fountain(); g.userData.townHQ = true; return g; }
function createRamenStall3D() { const g = TOWNHQ.ramenStall(); g.userData.townHQ = true; return g; }
function createWindmill3D() { const g = TOWNHQ.windmill(); g.userData.townHQ = true; return g; }
function createStarlightCampsite3D() { const g = TOWNHQ.campsite(); g.userData.townHQ = true; return g; }
function createSakuraOnsenLake3D() { const g = TOWNHQ.onsen(); g.userData.townHQ = true; return g; }
function createSubjugationPortalGate3D() { const g = TOWNHQ.portalGate(); g.userData.townHQ = true; return g; }
function createAncientRuins3D() { const g = TOWNHQ.ruins(); g.userData.townHQ = true; return g; }
