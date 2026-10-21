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
  const rnd = (() => { let s = 12345; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; })();
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
    const key = `${color}|${texFn ? texFn.name || texFn : ''}|${repeat ? repeat.join('x') : ''}|${JSON.stringify(extra)}`;
    if (matCache[key]) return matCache[key];
    const opt = Object.assign({ color, gradientMap: GM() }, extra);
    if (texFn) {
      let t = texFn();
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
    if (plant === 'bush') {
      const b = mesh(new THREE.IcosahedronGeometry(0.55, 1), toon(0x5fae3e));
      b.position.y = 1.05;
      outline(b, 0.04);
      g.add(b);
    } else {
      const fl = flowerCluster(undefined, 5, 0.18);
      fl.position.y = 0.62;
      g.add(fl);
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
    return g;
  }

  // ------------------------------------------------------------------
  // 마을 소품 배치
  // ------------------------------------------------------------------
  function decorate(app) {
    const scene = app.scene;
    const add = (obj, x, z, ry = 0, y = 0) => { obj.position.set(x, y, z); obj.rotation.y = ry; scene.add(obj); return obj; };
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

  return {
    house, fountain, ramenStall, boutique, windmill, campsite, onsen, portalGate, ruins,
    decorate, update, TEX,
    get animatedCount() { return animated.length; }
  };
})();

// 기존 단순 구조물 생성 함수를 고퀄리티 버전으로 교체 (main.js는 같은 이름으로 호출)
function createChiikawaHouse3D() { return TOWNHQ.house(); }
function createPlazaFountain3D() { return TOWNHQ.fountain(); }
function createRamenStall3D() { return TOWNHQ.ramenStall(); }
function createWindmill3D() { return TOWNHQ.windmill(); }
function createStarlightCampsite3D() { return TOWNHQ.campsite(); }
function createSakuraOnsenLake3D() { return TOWNHQ.onsen(); }
function createSubjugationPortalGate3D() { return TOWNHQ.portalGate(); }
function createAncientRuins3D() { return TOWNHQ.ruins(); }
