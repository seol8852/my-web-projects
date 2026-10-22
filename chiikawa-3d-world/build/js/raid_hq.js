const RAIDHQ=(()=>{const l=(n=0,o=0,t=0)=>new THREE.Vector3(n,o,t),_=l(0,0,-820),O=46,eo=38,w=54,to=n=>Math.max(0,Math.min(1,n)),k=n=>1-Math.pow(1-to(n),3),H=()=>typeof FXHQ!="undefined"&&!!FXHQ._add,G=()=>typeof POLISH!="undefined"&&POLISH.detail||1;let P=null,b=1,W=0,M=null,K="anoko";const g=()=>K==="bird";let $=0;const z=`
    float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
    float fbm(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.7) * 0.3 + vn(p * 4.3 + 1.3) * 0.15; }`,q=`varying vec2 vUv; varying vec3 vW;
    void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,ao=`
    uniform float uT; uniform float uP3; uniform float uR;
    varying vec2 vUv; ${z}
    void main() {
      vec2 p = (vUv - 0.5) * 2.0 * uR;
      float r = length(p);
      if (r > uR) discard;
      float a = atan(p.y, p.x);
      // \uB3CC \uD0C0\uC77C: \uB3D9\uC2EC\uC6D0 + \uBC29\uC0AC\uD615 \uC904\uB208
      float ringI = floor(r / 5.5);
      float rf = fract(r / 5.5);
      float segN = 10.0 + ringI * 6.0;
      float af = fract((a / 6.28318) * segN + ringI * 0.37);
      float mortar = max(smoothstep(0.06, 0.0, rf) + smoothstep(0.94, 1.0, rf), smoothstep(0.035, 0.0, af) + smoothstep(0.965, 1.0, af));
      float n = fbm(p * 0.35 + ringI);
      vec3 stone = mix(vec3(0.20, 0.18, 0.22), vec3(0.30, 0.27, 0.30), n);
      stone *= 0.9 + 0.2 * h21(vec2(ringI, floor(af * 0.0 + (a / 6.28318) * segN)));
      vec3 col = mix(stone, vec3(0.06, 0.05, 0.07), clamp(mortar, 0.0, 1.0) * 0.85);
      // \uB8EC \uACE0\uB9AC (\uACBD\uACC4\uC120 46m, 30m, 14m) + \uBC29\uC0AC\uD615 \uB8EC \uBB38\uC591
      float pulse = 1.0; // \uAE5C\uBE61\uC784 \uC5C6\uC74C (\uACF5\uACA9 \uC608\uACE0 \uC7A5\uD310\uACFC \uAD6C\uBD84)
      float rings = smoothstep(0.35, 0.0, abs(r - 46.0)) * 1.2 + smoothstep(0.25, 0.0, abs(r - 30.0)) * 0.8 + smoothstep(0.22, 0.0, abs(r - 14.0)) * 0.7;
      float glyph = step(0.0, sin(a * 24.0)) * smoothstep(1.2, 0.0, abs(r - 43.5)) * step(abs(r - 43.5), 1.2);
      glyph *= 0.55 + 0.45 * step(0.5, fract(a * 3.8197 + 0.25));
      float spokes = smoothstep(0.12, 0.0, abs(fract(a / 6.28318 * 8.0 + 0.0625) - 0.5) - 0.48) * step(14.0, r) * step(r, 30.0) * 0.5;
      // 3\uD398\uC774\uC988: \uBC14\uB2E5 \uADE0\uC5F4\uC5D0\uC11C \uC6A9\uC554\uBE5B\uC774 \uC0C8\uC5B4 \uB098\uC634
      float crack = smoothstep(0.035, 0.0, abs(fbm(p * 0.12 + 5.0) - 0.5)) * uP3;
      // \uB8EC\uC740 \uBE68\uAC15 \uB300\uC2E0 \uCC28\uBD84\uD55C \uCCAD\uBCF4\uB77C (\uBE68\uAC15\uC740 \uACF5\uACA9 \uC608\uACE0 \uC804\uC6A9)
      vec3 rune = mix(vec3(0.42, 0.36, 0.95), vec3(1.0, 0.38, 0.08), uP3); // 3\uD398\uC774\uC988: \uC8FC\uD669\xB7\uBE68\uAC15
      col += rune * (rings + glyph * 0.8 + spokes) * 0.55 * pulse;
      col += mix(vec3(1.0, 0.22, 0.04), vec3(1.0, 0.55, 0.1), fbm(p * 0.05 + uT * 0.15)) * crack * 1.1; // \uC6A9\uC554 \uADE0\uC5F4 (\uCC9C\uCC9C\uD788 \uD750\uB984, \uAE5C\uBE61\uC784 \uC5C6\uC74C)
      // \uC911\uC559 \uC5B4\uB450\uC6B4 \uADF8\uC744\uB9BC + \uBC14\uAE65 \uAC00\uC7A5\uC790\uB9AC \uC5B4\uB461\uAC8C
      col *= 0.82 + 0.18 * smoothstep(0.0, 12.0, r);
      col *= 1.0 - smoothstep(uR - 4.0, uR, r) * 0.6;
      col = mix(col, col * vec3(1.2, 0.75, 0.6), uP3 * 0.5);
      gl_FragColor = vec4(col, 1.0);
    }`,no=`
    uniform float uT; uniform float uP3; uniform vec3 uCol;
    varying vec2 vUv; ${z}
    void main() {
      float f = fbm(vec2(vUv.x * 40.0, vUv.y * 3.0 - uT * 1.4));
      float fade = pow(1.0 - vUv.y, 2.2);
      float lines = smoothstep(0.92, 1.0, fract(vUv.x * 96.0 + uT * 0.2)) * 0.5;
      float a = (fade * (0.25 + f * 0.55) + lines * fade) * (0.55 + uP3 * 0.35);
      vec3 col = mix(mix(uCol, vec3(1.0, 0.32, 0.06), uP3), vec3(1.0, 0.8, 0.7), fade * f * 0.5);
      gl_FragColor = vec4(col * a, a);
    }`,so=`
    uniform float uT; uniform float uP3;
    varying vec2 vUv; ${z}
    void main() {
      vec2 p = (vUv - 0.5) * 2.0;
      float r = length(p);
      if (r > 1.0) discard;
      float a = atan(p.y, p.x);
      float sw = fbm(vec2(a * 2.0 + r * 6.0 - uT * 0.35, r * 3.0 - uT * 0.2));
      float arms = smoothstep(0.45, 0.8, sw);
      float core = smoothstep(0.35, 0.0, r);
      float edge = 1.0 - smoothstep(0.6, 1.0, r);
      vec3 col = mix(vec3(0.55, 0.05, 0.08), vec3(1.0, 0.35, 0.2), arms * 0.6);
      col = mix(col, vec3(0.35, 0.0, 0.05), uP3 * 0.6);
      float alpha = (arms * 0.55 + core * 0.4) * edge * (0.35 + uP3 * 0.4);
      gl_FragColor = vec4(col * alpha, alpha);
    }`,yo=`
    uniform float uT; uniform float uFade;
    varying vec2 vUv; ${z}
    void main() {
      float f = fbm(vec2(vUv.x * 9.0 + sin(vUv.y * 4.0 + uT) * 0.4, vUv.y * 2.6 - uT * 2.2));
      float g = fbm(vec2(vUv.x * 17.0, vUv.y * 5.0 - uT * 3.4));
      float fade = pow(1.0 - vUv.y, 1.3) * smoothstep(0.0, 0.06, vUv.y);
      float body = smoothstep(0.32, 0.72, f * 0.7 + g * 0.4 + fade * 0.35) * fade;
      vec3 col = mix(vec3(0.16, 0.0, 0.01), vec3(0.62, 0.0, 0.03), smoothstep(0.4, 0.9, f));
      col = mix(col, vec3(1.0, 0.18, 0.08), smoothstep(0.78, 1.0, g) * 0.6);
      gl_FragColor = vec4(col, body * 0.88 * uFade);
    }`,ro=`
    uniform float uT; uniform float uFade;
    varying vec2 vUv; ${z}
    void main() {
      float f = fbm(vec2(vUv.x * 12.0, vUv.y * 3.2 - uT * 3.0));
      float fade = pow(1.0 - vUv.y, 2.0) * smoothstep(0.0, 0.05, vUv.y);
      float a = smoothstep(0.45, 0.85, f) * fade * 0.8 * uFade;
      vec3 col = mix(vec3(0.9, 0.02, 0.05), vec3(1.0, 0.45, 0.25), f);
      gl_FragColor = vec4(col * a, a);
    }`;function Q(n,o,t={}){return new THREE.ShaderMaterial({uniforms:Object.assign({uT:{value:0},uP3:{value:0},uFade:{value:1}},o),vertexShader:q,fragmentShader:n,transparent:t.transparent!==!1,depthWrite:!!t.depthWrite,blending:t.normal?THREE.NormalBlending:THREE.AdditiveBlending,side:t.side||THREE.DoubleSide})}const D=n=>new THREE.MeshToonMaterial({color:n,gradientMap:typeof getToonGradientMap=="function"?getToonGradientMap():null});function io(n){const o=new THREE.Group;o.name="raid-arena",o.position.copy(_);const t=[],e=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uP3:{value:0},uR:{value:w}},vertexShader:q,fragmentShader:ao});t.push(e);const a=new THREE.Mesh(new THREE.CircleGeometry(w,96),e);a.geometry.rotateX(-Math.PI/2),a.position.y=.03,o.add(a);const c=new THREE.Mesh(new THREE.CylinderGeometry(w+1.2,w+2.2,1.4,96,1,!0),D(2761776));c.position.y=-.55,o.add(c);const r=new THREE.Mesh(new THREE.RingGeometry(w-.1,w+1.25,96),D(3879744));r.geometry.rotateX(-Math.PI/2),r.position.y=.12,o.add(r);const h=Q(no,{uCol:{value:new THREE.Color(8154111)}});t.push(h);const i=new THREE.Mesh(new THREE.CylinderGeometry(O+.6,O+.6,7,128,1,!0),h);i.position.y=3.5,o.add(i);const s=[],f=D(2959155),d=D(4274249),v=new THREE.MeshBasicMaterial({color:10320895});for(let m=0;m<12;m++){const F=m/12*Math.PI*2+Math.PI/12,S=Math.cos(F)*(w+3.5),B=Math.sin(F)*(w+3.5),I=m%3===0?14:10,V=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.7,I,4),m%2?f:d);V.position.set(S,I/2,B),V.rotation.y=-F+Math.PI/4,typeof addCartoonOutline=="function"&&addCartoonOutline(V,.04),o.add(V);const X=new THREE.Mesh(new THREE.OctahedronGeometry(1.1,0),v);X.position.set(S,I+2.2,B),X.scale.y=1.7,o.add(X);const j=new THREE.Sprite(new THREE.SpriteMaterial({map:typeof fxTex=="function"?fxTex("glow"):null,color:9399295,transparent:!0,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:!1}));j.scale.setScalar(6),j.position.copy(X.position),o.add(j),s.push({cr:X,glow:j,base:X.position.y,i:m})}const x=D(2038308);for(let m=0;m<26;m++){const F=m/26*Math.PI*2+m%2*.08,S=w+30+m%3*6,B=12+m*37%13,I=new THREE.Mesh(new THREE.ConeGeometry(3+m%4,B,5),x);I.position.set(Math.cos(F)*S,B/2-.5,Math.sin(F)*S),I.rotation.set((m%3-1)*.12,m,(m%2-.5)*.2),o.add(I)}const p=Q(so,{});t.push(p);const u=new THREE.Mesh(new THREE.PlaneGeometry(260,260),p);u.rotation.x=Math.PI/2,u.position.y=95,o.add(u);const T=Math.round(420*G()),E=new Float32Array(T*3),y=new Float32Array(T);for(let m=0;m<T;m++){const F=Math.random()*Math.PI*2,S=Math.sqrt(Math.random())*(w+6);E[m*3]=Math.cos(F)*S,E[m*3+1]=Math.random()*30,E[m*3+2]=Math.sin(F)*S,y[m]=Math.random()}const U=new THREE.BufferGeometry;U.setAttribute("position",new THREE.BufferAttribute(E,3)),U.setAttribute("seed",new THREE.BufferAttribute(y,1));const L=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uP3:{value:0}},vertexShader:`attribute float seed; uniform float uT; varying float vS; varying float vA;
        void main(){ vec3 p = position; float h = mod(p.y + uT * (2.0 + seed * 3.0), 32.0);
          p.y = h; p.x += sin(uT * 0.7 + seed * 30.0) * 1.5; p.z += cos(uT * 0.6 + seed * 20.0) * 1.5;
          vA = smoothstep(0.0, 3.0, h) * (1.0 - smoothstep(22.0, 32.0, h)); vS = seed;
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = (2.0 + seed * 4.0) * (120.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform float uP3; varying float vS; varying float vA;
        void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float a = smoothstep(0.5, 0.0, d) * vA;
          vec3 c = mix(vec3(1.0, 0.45, 0.15), vec3(1.0, 0.1, 0.12), vS); c = mix(c, vec3(0.9, 0.0, 0.1), uP3 * 0.6);
          gl_FragColor = vec4(c * a, a); }`,transparent:!0,depthWrite:!1,blending:THREE.AdditiveBlending});t.push(L);const oo=new THREE.Points(U,L);oo.frustumCulled=!1,o.add(oo),o.visible=!1,n.add(o),P={group:o,mats:t,crystals:s,vortex:u,floorMat:e}}function J(n){if(!P&&n&&n.scene)try{io(n.scene)}catch(o){console.warn("\uB808\uC774\uB4DC \uD22C\uAE30\uC7A5 \uC0DD\uC131 \uC624\uB958:",o)}return P}function Y(n){b=n}const fo=`
    uniform sampler2D uMap; uniform float uT; uniform float uFade; uniform float uSpread; uniform float uMode;
    uniform vec3 uD1; uniform vec3 uD2; uniform vec3 uG1; uniform vec3 uG2;
    varying vec2 vUv; ${z}
    float A(vec2 uv) { if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0; return texture2D(uMap, uv).a; }
    void main() {
      vec2 tuv = (vUv - 0.5) * uSpread + 0.5;
      float n = fbm(vec2(vUv.x * 7.0, vUv.y * 4.0 - uT * 2.6));
      float n2 = fbm(vec2(vUv.x * 13.0 + 3.0, vUv.y * 7.0 - uT * 4.0));
      vec2 lift = vec2((n - 0.5) * 0.05, -0.05 - n2 * 0.08);
      float a = 0.0;
      for (int i = 0; i < 12; i++) {
        float ang = float(i) * 0.5236;
        vec2 o = vec2(cos(ang), sin(ang));
        a = max(a, A(tuv + lift + o * 0.045));
        a = max(a, A(tuv + lift * 1.6 + o * 0.085) * 0.75);
      }
      float inner = A(tuv);
      float edge = a * (1.0 - inner);
      float flame = edge * smoothstep(0.2, 0.7, n * 0.7 + n2 * 0.5);
      vec3 col;
      float alpha;
      if (uMode < 0.5) {
        col = mix(uD1, uD2, n2);
        alpha = flame * 0.95;
      } else {
        col = mix(uG1, uG2, n2);
        alpha = flame * smoothstep(0.55, 0.9, n2) * 0.8;
        col *= alpha;
      }
      gl_FragColor = vec4(col, alpha * uFade);
    }`;function co(n,o){N(n);const t=new THREE.Group,e=(o.bodyRadius||7)*1.05,a=typeof loadCleanCharacterTexture=="function"?loadCleanCharacterTexture(g()?"assets/raid_bird_phase3.png":"assets/anoko_phase3.png"):null,c=u=>new THREE.Color(u[0],u[1],u[2]),r=g()?{d1:[.05,.05,.25],d2:[.2,.25,.75],g1:[.3,.75,1],g2:[.85,.95,1],disc:1981066,aura:5195493}:{d1:[.22,0,.02],d2:[.62,0,.04],g1:[.95,.05,.08],g2:[1,.45,.3],disc:9109504,aura:11534352},h=o.mesh&&o.mesh.userData&&o.mesh.userData.sizeW||8.6,i=o.mesh&&o.mesh.userData&&o.mesh.userData.sizeH||8.6,s=1.45,f=(u,T)=>{const E=new THREE.ShaderMaterial({uniforms:{uMap:{value:a},uT:{value:0},uFade:{value:0},uSpread:{value:s},uMode:{value:u},uD1:{value:c(r.d1)},uD2:{value:c(r.d2)},uG1:{value:c(r.g1)},uG2:{value:c(r.g2)}},vertexShader:q,fragmentShader:fo,transparent:!0,depthWrite:!1,side:THREE.DoubleSide,blending:u<.5?THREE.NormalBlending:THREE.AdditiveBlending}),y=new THREE.Mesh(new THREE.PlaneGeometry(h*s,i*s),E);return y.position.set(0,i*.5,T),y.renderOrder=-1,o.mesh&&o.mesh.add(y),{pl:y,mm:E}},d=f(0,-.35),v=f(1,-.3),x=new THREE.Mesh(new THREE.CircleGeometry(e*2.1,48),new THREE.MeshBasicMaterial({map:typeof fxTex=="function"?fxTex("glow"):null,color:r.disc,transparent:!0,opacity:.9,depthWrite:!1}));x.geometry.rotateX(-Math.PI/2),x.position.y=.09,t.add(x);let p=null;typeof fxCreateBossAura=="function"&&(p=fxCreateBossAura(e*1.6,r.aura),t.add(p)),n.scene.add(t),M={group:t,sils:[d,v],bossAura:p,t:0,emit:0,m:o}}function N(n){M&&(M.sils.forEach(o=>{o.pl.parent&&o.pl.parent.remove(o.pl),o.pl.geometry.dispose(),o.mm.dispose()}),M.group.parent&&M.group.parent.remove(M.group),n&&n.disposeObject3D&&n.disposeObject3D(M.group),M=null)}function lo(n,o){if(!n||!o)return;Y(3);const t=o.mesh,e=o.pos.clone(),a=g(),c=a?6333946:16718378,r=a?1973067:5898248,h=a?725040:1703942;if(H()){FXHQ.screenFlash(r,.55,600),FXHQ.fovPunch(6,1.2),FXHQ.shockwave(l(e.x,0,e.z),c,30),FXHQ.shockwave(l(e.x,0,e.z),r,18);for(let i=0;i<Math.round(26*G());i++){const s=FXHQ._sprite("smoke",h,!1,.85),f=Math.random()*Math.PI*2;s.position.set(e.x+Math.cos(f)*3,3+Math.random()*12,e.z+Math.sin(f)*3);const d=l(Math.cos(f)*(8+Math.random()*10),2+Math.random()*6,Math.sin(f)*(8+Math.random()*10)),v=6+Math.random()*6;FXHQ._add(s,1.6,(x,p,u)=>{s.position.addScaledVector(d,p*(1-u)),s.scale.setScalar(v*(.5+u*1.3)),s.material.opacity=.85*(1-u)})}for(let i=0;i<10;i++){const s=i/10*Math.PI*2;R(l(e.x,16,e.z),l(e.x+Math.cos(s)*22,.2,e.z+Math.sin(s)*22),a?9684477:16719920,.5,.18)}C(l(e.x,0,e.z),8,90,a?3900150:11534351,1.2)}n&&(n.camShake=Math.max(n.camShake||0,1.2));try{const i=a?4:4.65,s=createMonster3D(a?"pjbird3":"anoko3");s.position.copy(t.position),s.rotation.y=t.rotation.y,s.scale.setScalar(i*.45),n.scene.add(s),n.scene.remove(t),n.disposeObject3D&&n.disposeObject3D(t),o.mesh=s,o.baseScale=i,o.sc=i*.45,o.bodyRadius=(s.userData.bodyRadius||2.4)*i,o.sizeH=(s.userData.sizeH||8.6)*i,o.heightOffset=8.8*i}catch(i){console.warn("3\uD398\uC774\uC988 \uBCC0\uC2E0 \uC624\uB958:",i)}co(n,o)}function R(n,o,t,e=.35,a=.14){if(!H())return;const c=[],r=o.clone().sub(n),h=r.length(),i=l(-r.z,0,r.x).normalize();i.lengthSq()<.01&&i.set(1,0,0);const s=12;for(let u=0;u<=s;u++){const T=u/s,E=n.clone().addScaledVector(r,T);u>0&&u<s&&(E.addScaledVector(i,(Math.random()-.5)*h*.12),E.y+=(Math.random()-.5)*h*.08),c.push(E)}const f=new THREE.CatmullRomCurve3(c,!1,"catmullrom",.1),d=new THREE.Group,v=(u,T,E)=>{const y=new THREE.MeshBasicMaterial({color:T,transparent:!0,opacity:E,blending:THREE.AdditiveBlending,depthWrite:!1});return d.add(new THREE.Mesh(new THREE.TubeGeometry(f,40,u,5,!1),y)),y},x=v(a,16777215,1),p=v(a*3.4,t,.5);FXHQ._add(d,e,(u,T,E)=>{const y=Math.random()<.3?.3:1;x.opacity=(1-E)*y,p.opacity=.5*(1-E)*y})}const uo=`
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; ${z}
    void main() {
      float f = fbm(vec2(vUv.x * 10.0, vUv.y * 3.0 - uT * 7.0));
      float ends = smoothstep(0.0, 0.05, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y));
      float a = (0.3 + f * 1.1) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.92, 0.85), smoothstep(0.55, 0.95, f) * 0.8);
      gl_FragColor = vec4(col * a, a);
    }`;function C(n,o,t,e,a=.6){if(!H())return;const c=new THREE.Group;c.position.set(n.x,0,n.z);const r=[];[[o,e,1],[o*.35,16777215,.9]].forEach(([h,i,s])=>{const f=new THREE.CylinderGeometry(h,h*1.1,t,32,1,!0);f.translate(0,t/2,0);const d=Q(uo,{uColor:{value:new THREE.Color(i)}});d.userData.al=s,r.push(d),c.add(new THREE.Mesh(f,d))}),FXHQ._add(c,a,(h,i,s)=>{const f=k(h.t/.07),d=s>.4?1-k((s-.4)/.6):1;c.scale.set(f*d+.001,Math.min(1,h.t/.1),f*d+.001),r.forEach(v=>{v.uniforms.uT.value=h.t,v.uniforms.uFade.value=v.userData.al*(s<.8?1:(1-s)/.2)})})}const ho=`
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv;
    void main() {
      vec2 p = (vUv - 0.5) * 2.0; float r = length(p); float a = atan(p.y, p.x);
      float ring = smoothstep(0.03, 0.0, abs(r - 0.95)) + smoothstep(0.025, 0.0, abs(r - 0.78)) + smoothstep(0.02, 0.0, abs(r - 0.42));
      float star = smoothstep(0.03, 0.0, abs(r * cos(mod(a + uT, 1.2566) - 0.6283) - 0.62)) * step(r, 0.8);
      float teeth = step(0.5, fract(a * 9.549 + uT * 2.0)) * step(0.8, r) * step(r, 0.93) * 0.6;
      float a2 = (ring + star * 0.8 + teeth) * step(r, 1.0) * uFade;
      gl_FragColor = vec4(mix(uColor, vec3(1.0), ring * 0.4) * a2, a2);
    }`;function Z(n,o,t,e=.7){if(!H())return;const a=Q(ho,{uColor:{value:new THREE.Color(t)}}),c=new THREE.PlaneGeometry(2,2);c.rotateX(-Math.PI/2);const r=new THREE.Mesh(c,a);r.position.set(n.x,.18,n.z),FXHQ._add(r,e,(h,i,s)=>{const f=o*(.6+k(s*2)*.5);r.scale.set(f,1,f),r.rotation.y=h.t*1.6,a.uniforms.uT.value=h.t,a.uniforms.uFade.value=s<.2?s/.2:1-(s-.2)/.8})}function vo(n,o,t,e=.9){if(!H())return;const a=Q(ro,{}),c=new THREE.CylinderGeometry(o,o,4,64,1,!0);c.translate(0,2,0);const r=new THREE.Mesh(c,a);r.position.set(n.x,0,n.z),FXHQ._add(r,e,(h,i,s)=>{const f=.6+k(s*1.5)*.5;r.scale.set(f,1-s*.6,f),a.uniforms.uT.value=h.t,a.uniforms.uFade.value=1-s})}function A(n,o,t,e=18){if(!H())return;const a=Math.round(t*G());for(let c=0;c<a;c++){const r=Math.random()*Math.PI*2,h=e*(.5+Math.random()*.7);FXHQ._glow(l(n.x,.8,n.z),c%3===0?16777215:o,l(Math.cos(r)*h,6+Math.random()*12,Math.sin(r)*h),.7+Math.random()*.6,.6+Math.random()*.4,22,Math.random()<.4?"star":"glow")}}function po(n,o){const t=o.center,e=o.reach||5,a=l(t.x,0,t.z),c=b>=3,r=c?6514417:3718648,h=o.yaw||0,i=l(Math.sin(h),0,Math.cos(h));if(o.patternType==="circle"){Z(a,e*1.05,r,.7),FXHQ.shockwave(a,16777215,e*1.15),FXHQ.shockwave(a,r,e*1.45),A(a,14742270,e>8?26:10,e>8?24:12);const s=Math.round((e>8?26:8)*G());for(let f=0;f<s;f++){const d=Math.random()*Math.PI*2,v=6+Math.random()*10;FXHQ._glow(l(t.x+Math.cos(d)*e*.3,1+Math.random()*2,t.z+Math.sin(d)*e*.3),f%2?16777215:16708551,l(Math.cos(d)*v,4+Math.random()*6,Math.sin(d)*v),1.2+Math.random()*.6,1.1,3,"star")}if(e>=8.5&&e<12)C(a,e*.35,40,c?8490232:12248829,.6),n&&(n.hitStopTimer=Math.max(n.hitStopTimer||0,.05));else if(e>=20){for(let f=0;f<10;f++){const d=f/10*Math.PI*2;R(l(t.x,26,t.z),l(t.x+Math.cos(d)*e*.9,.2,t.z+Math.sin(d)*e*.9),9684477,.45,.16)}C(a,e*.25,80,r,.8),typeof FXHQ.screenFlash=="function"&&FXHQ.screenFlash(c?3223169:8246268,.3,450)}else e<5&&R(l(t.x+(Math.random()-.5)*4,30,t.z+(Math.random()-.5)*4),l(t.x,.2,t.z),c?10859772:16777215,.25,.1)}else if(o.patternType==="sector"){for(let s=0;s<4;s++)FXHQ.slash(a,h,s%2?16777215:r,3,0,(s-1.5)*.3,{radius:e*(.4+s*.2),span:Math.PI*.7,life:.5,y:1.2+s*.8,noOffset:!0,dir:s%2?-1:1});A(a.clone().addScaledVector(i,e*.5),16777215,22,24)}else{c&&R(l(t.x,2,t.z),l(t.x+i.x*e,.6,t.z+i.z*e),10859772,.35,.18);const s=Math.max(4,Math.round(e/5));for(let f=0;f<s;f++){const d=(f+.5)/s;FXHQ._glow(l(t.x+i.x*e*d,1.2,t.z+i.z*e*d),f%2?16777215:r,l(i.x*14,2,i.z*14),1.6,.45,0,"star")}A(l(t.x+i.x*e,0,t.z+i.z*e),r,8,10)}}function mo(n,o){if(!H()||!o||!o.monster||!o.monster.isRaidBoss)return;if(o.monster.raidKind==="bird"){po(n,o);return}const t=o.center,e=o.reach||5,a=l(t.x,0,t.z),c=b>=3,r=c?13631514:o.patternType==="line"?16738847:16722474,h=c?5898256:16756848,i=o.yaw||0,s=l(Math.sin(i),0,Math.cos(i));if(o.patternType==="circle"){if(Z(a,e*1.05,r,.8),vo(a,e*.95,r,.8),A(a,r,e>10?26:10,e>10?26:14),e<9)R(l(t.x+(Math.random()-.5)*6,40,t.z+(Math.random()-.5)*6),l(t.x,.2,t.z),r,.3,.2);else{for(let f=0;f<8;f++){const d=f/8*Math.PI*2+Math.random()*.3;R(l(t.x,1.2,t.z),l(t.x+Math.cos(d)*e,.3,t.z+Math.sin(d)*e),r,.35,.12)}C(a,e*.22,70,r,.8)}if(e>=20){const f=new THREE.Group,d=new Set,v=12,x=18;FXHQ._add(f,.9,p=>{for(let u=0;u<v+x;u++){const T=u>=v,E=T?.22+(u-v)*.012:u*.012;if(d.has(u)||p.t<E)continue;d.add(u);const y=T?(u-v)/x*Math.PI*2+.17:u/v*Math.PI*2,U=T?e*.9:e*.5,L=l(t.x+Math.cos(y)*U,0,t.z+Math.sin(y)*U);C(L,1.4,T?34:46,u%2?r:h,.55)}}),FXHQ.shockwave(a,16777215,e*1.3),FXHQ.shockwave(a,r,e*1.6),typeof FXHQ.screenFlash=="function"&&FXHQ.screenFlash(c?7995408:16728096,.3,450),n&&(n.hitStopTimer=Math.max(n.hitStopTimer||0,.06))}}else if(o.patternType==="sector"){for(let v=0;v<3;v++)FXHQ.slash(a,i,v===1?16777215:r,3,0,(v-1)*.35,{radius:e*(.55+v*.22),span:Math.PI*.7,life:.42,y:1.6+v,noOffset:!0,dir:v%2?-1:1});const f=new THREE.Group,d=new Set;FXHQ._add(f,.5,v=>{for(let x=0;x<9;x++){if(d.has(x)||v.t<x*.03)continue;d.add(x);const p=i+(x/8-.5)*Math.PI*.64,u=l(t.x+Math.sin(p)*e*.92,0,t.z+Math.cos(p)*e*.92);C(u,1.1,22,r,.5)}}),A(a.clone().addScaledVector(s,e*.5),r,18,20)}else{R(l(t.x,1.4,t.z),l(t.x+s.x*e,1.4,t.z+s.z*e),r,.4,.22),R(l(t.x,2.2,t.z),l(t.x+s.x*e,.6,t.z+s.z*e),16777215,.3,.1);const f=new THREE.Group,d=new Set,v=Math.max(4,Math.round(e/6));FXHQ._add(f,.6,x=>{for(let p=0;p<v;p++){if(d.has(p)||x.t<p*.035)continue;d.add(p);const u=l(t.x+s.x*(e*(p+.5)/v),0,t.z+s.z*(e*(p+.5)/v));C(u,1.5,26,p%2?r:h,.45),p%2===0&&A(u,r,5,10)}})}}function Mo(n,o){const t=!!(n&&n.raidMode);if(t&&J(n),!P)return;if(P.group.visible=t,!t){M&&N(n),b=1,W=0;return}const e=performance.now()/1e3;if(W+=((b>=3&&!g()?1:0)-W)*Math.min(1,o*1.5),g()&&b>=3&&H()&&($-=o,$<=0)){$=.35+Math.random()*.6;const a=Math.random()*Math.PI*2,c=10+Math.random()*44,r=l(_.x+Math.cos(a)*c,0,_.z+Math.sin(a)*c);R(l(r.x+(Math.random()-.5)*8,60,r.z+(Math.random()-.5)*8),l(r.x,.2,r.z),Math.random()<.5?10859772:14742270,.22,.14)}if(P.mats.forEach(a=>{a.uniforms.uT&&(a.uniforms.uT.value=e),a.uniforms.uP3&&(a.uniforms.uP3.value=W)}),P.vortex.rotation.z=e*.05,P.crystals.forEach(a=>{a.cr.position.y=a.base+Math.sin(e*1.6+a.i)*.5,a.cr.rotation.y=e*.8+a.i,a.glow.position.y=a.cr.position.y,a.glow.material.opacity=.7,a.glow.material.color.setHex(b>=3?g()?6333946:16734751:g()?8246268:9399295),a.cr.material.color.setHex(b>=3?g()?9684477:16738858:g()?12248829:10320895)}),M){const a=M.m;if(!a||!a.alive||!a.mesh||!a.mesh.parent){N(n);return}M.group.position.set(a.pos.x,0,a.pos.z),M.t+=o;const c=Math.min(1,M.t/.8);if(M.sils.forEach(r=>{r.mm.uniforms.uT.value=e,r.mm.uniforms.uFade.value=c}),M.bossAura&&M.bossAura.userData.update&&M.bossAura.userData.update(e),M.emit-=o,M.emit<=0&&H()){M.emit=.05/G();const r=Math.random()*Math.PI*2,h=(a.bodyRadius||7)*(.8+Math.random()*.6);FXHQ._glow(l(a.pos.x+Math.cos(r)*h,1+Math.random()*4,a.pos.z+Math.sin(r)*h),g()?Math.random()<.3?14742270:5195493:Math.random()<.3?16728112:9109504,l(0,8+Math.random()*8,0),1+Math.random()*.8,.9,-3)}}}function xo(n){b=1,N(n)}function Eo(n,o,t){const e=t/2,a=(t/2-8)/(w+2);o.fillStyle="#1e1b24",o.fillRect(0,0,t,t),o.fillStyle="#3a3340",o.beginPath(),o.arc(e,e,w*a,0,Math.PI*2),o.fill(),o.strokeStyle=b>=3?"#b0000f":"#ef4444",o.lineWidth=2,o.beginPath(),o.arc(e,e,O*a,0,Math.PI*2),o.stroke();const c=(i,s)=>[e+(i-_.x)*a,e+(s-_.z)*a];(n.monsters||[]).forEach(i=>{if(!i.alive)return;const[s,f]=c(i.pos.x,i.pos.z);o.fillStyle=i.isRaidBoss?b>=3?"#b0000f":"#facc15":"#ef4444",o.beginPath(),o.arc(s,f,i.isRaidBoss?7:3,0,Math.PI*2),o.fill()}),window.coop&&window.coop.remotes&&window.coop.remotes.forEach(i=>{if(i.area!=="raid"||!i.hasPos)return;const[s,f]=c(i.mesh.position.x,i.mesh.position.z);o.fillStyle=i.downed?"#94a3b8":"#86efac",o.beginPath(),o.arc(s,f,4,0,Math.PI*2),o.fill()});const[r,h]=c(n.playerPos.x,n.playerPos.z);o.fillStyle="#38bdf8",o.beginPath(),o.arc(r,h,4.5,0,Math.PI*2),o.fill(),o.strokeStyle="#ffffff",o.lineWidth=2,o.stroke()}return{CENTER:_,ARENA_R:O,BOSS_R:eo,update:Mo,impact:mo,phase3:lo,setPhase:Y,reset:xo,drawMinimap:Eo,ensureArena:J,setTheme(n){K=n==="bird"?"bird":"anoko"},get phase(){return b}}})();
