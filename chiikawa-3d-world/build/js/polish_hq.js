const POLISH=(()=>{const z=(e,o)=>{try{const a=localStorage.getItem(e);return a===null?o:a}catch{return o}},D=(e,o)=>{try{localStorage.setItem(e,o)}catch{}},j=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),I=[],B=new THREE.Vector3,S=new THREE.Vector3,Q=new THREE.Vector3;function $(e,o,a){const t=[],s=[];e.traverse(i=>{if(!(!i.isMesh||!i.material)){if(i.material.side===THREE.BackSide){s.push(i);return}(Array.isArray(i.material)?i.material:[i.material]).forEach(r=>{t.includes(r)||t.push(r)})}}),I.push({obj:e,centerOffsetY:o,radius:a,mats:t,outlines:s,fade:0,faded:!1})}function q(e,o,a){const t=a.x-o.x,s=a.y-o.y,i=a.z-o.z,r=t*t+s*s+i*i||1;let n=((e.x-o.x)*t+(e.y-o.y)*s+(e.z-o.z)*i)/r;n=Math.max(0,Math.min(1,n));const l=o.x+t*n-e.x,c=o.y+s*n-e.y,h=o.z+i*n-e.z;return Math.sqrt(l*l+c*c+h*h)}function J(e,o,a){B.copy(e.position),S.set(o.x,o.y+2.2,o.z);for(const t of I){const s=t.obj.position,i=t.obj.scale.x;if((Math.abs(s.x-S.x)>40||Math.abs(s.z-S.z)>40)&&t.fade===0)continue;Q.set(s.x,s.y+t.centerOffsetY*i,s.z);const n=q(Q,B,S)<t.radius*i?1:0;t.fade+=(n-t.fade)*Math.min(1,a*10),Math.abs(t.fade-n)<.01&&(t.fade=n);const l=1-t.fade*.75;t.fade>.01&&!t.faded&&(t.faded=!0,t.mats.forEach(c=>{c.transparent=!0,c.depthWrite=!1,c.needsUpdate=!0}),t.outlines.forEach(c=>{c.visible=!1})),t.faded&&t.mats.forEach(c=>{c.opacity=l}),t.fade<=.01&&t.faded&&(t.faded=!1,t.mats.forEach(c=>{c.transparent=!1,c.depthWrite=!0,c.opacity=1,c.needsUpdate=!0}),t.outlines.forEach(c=>{c.visible=!0}))}}function V(e){if(!e||!e.image||!e.userData||!e.userData.cleanReady)return null;if(e.userData.backTex)return e.userData.backTex;const o=e.image,a=512,t=()=>{const f=document.createElement("canvas");return f.width=a,f.height=a,f},s=t(),i=s.getContext("2d");i.drawImage(o,0,0,a,a),i.globalCompositeOperation="destination-in";const r=5;[[r,0],[-r,0],[0,r],[0,-r],[r*.7,r*.7],[-r*.7,r*.7],[r*.7,-r*.7],[-r*.7,-r*.7]].forEach(([f,p])=>{i.drawImage(o,f,p,a,a)});const n=t(),l=n.getContext("2d");"filter"in l?(l.filter="blur(48px) saturate(1.05)",l.drawImage(o,0,0,a,a),l.drawImage(o,0,0,a,a),l.filter="none"):(l.fillStyle="#f8fafc",l.fillRect(0,0,a,a));const c=l.createLinearGradient(0,0,0,a);c.addColorStop(0,"rgba(255,255,255,0.18)"),c.addColorStop(.6,"rgba(255,255,255,0)"),c.addColorStop(1,"rgba(60,40,40,0.16)"),l.fillStyle=c,l.fillRect(0,0,a,a),l.globalCompositeOperation="destination-in",l.drawImage(s,0,0);const h=t(),d=h.getContext("2d");d.drawImage(o,0,0,a,a),d.globalCompositeOperation="source-in",d.fillStyle="#3a2a26",d.fillRect(0,0,a,a),d.globalCompositeOperation="source-over",d.drawImage(n,0,0);const u=new THREE.CanvasTexture(h);return u.minFilter=THREE.LinearMipmapLinearFilter,u.anisotropy=8,e.userData.backTex=u,u}function Z(e,o){const a=e.userData;a.isBackView=!1,a.setBackView=t=>{if(t===a.isBackView)return;const s=a.parts;if(!s||!s.standeeMaterials)return;const i=t?V(o):null;t&&!i||(a.isBackView=t,s.standeeMaterials.forEach(r=>{r.map=t?i:o,r.needsUpdate=!0}),a.triggerJellyBounce&&a.triggerJellyBounce(.18))}}const Y={head:"\u{1F3AF}",back:"\u26A1",legs:"\u{1F9B5}",armor:"\u{1F6E1}\uFE0F"};function K(e,o,a,t={}){const s=o.clone().project(e);if(s.z>1)return;const i=(s.x*.5+.5)*window.innerWidth+(Math.random()-.5)*40,r=(-(s.y*.5)+.5)*window.innerHeight+(Math.random()-.5)*16,n=document.createElement("div");if(n.className="dmg-num"+(t.crit?" crit":"")+(t.critical?" critical":"")+(t.player?" player":"")+(t.weak?" weak":""),t.critical){const h=document.createElement("span");h.className="dmg-crit-label",h.textContent="CRITICAL!",n.appendChild(h)}n.style.left=`${i}px`,n.style.top=`${r}px`,t.color&&n.style.setProperty("--dmg-color",t.color);const l=t.part&&Y[t.part];if(l){const h=document.createElement("span");h.className="dmg-tag",h.textContent=l,n.appendChild(h)}const c=document.createElement("span");c.textContent=t.player?`-${a}`:`${a}`,n.appendChild(c),document.body.appendChild(n),setTimeout(()=>n.remove(),t.critical?1150:900)}let v=null;function ee(e){const t=new Float32Array([-.11,0,0,.11,0,0,-.066,.425,0,.11,0,0,.066,.425,0,-.066,.425,0,-.066,.425,0,.066,.425,0,0,.85,0]),s=new THREE.InstancedBufferGeometry;s.setAttribute("position",new THREE.BufferAttribute(t,3));const i=new Float32Array(t.length);for(let f=0;f<i.length;f+=3)i[f+1]=1;s.setAttribute("normal",new THREE.BufferAttribute(i,3));const r=new Float32Array(e*4),n=new Float32Array(e*3),l=[6265388,6989874,5212708,7911484,8831562],c=new THREE.Color;for(let f=0;f<e;f++)r[f*4]=(Math.random()-.5)*60,r[f*4+1]=(Math.random()-.5)*60,r[f*4+2]=Math.random()*Math.PI*2,r[f*4+3]=.55+Math.random()*.75,c.setHex(l[Math.random()*l.length|0]).offsetHSL(0,0,(Math.random()-.5)*.05),n[f*3]=c.r,n[f*3+1]=c.g,n[f*3+2]=c.b;s.setAttribute("aOff",new THREE.InstancedBufferAttribute(r,4)),s.setAttribute("aCol",new THREE.InstancedBufferAttribute(n,3)),s.instanceCount=e;const h={uTime:{value:0},uCenter:{value:new THREE.Vector3}},d=new THREE.MeshLambertMaterial({color:16777215,side:THREE.DoubleSide});d.onBeforeCompile=f=>{f.uniforms.uTime=h.uTime,f.uniforms.uCenter=h.uCenter,f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
          uniform float uTime; uniform vec3 uCenter;
          attribute vec4 aOff; attribute vec3 aCol;
          varying vec3 vGrassCol;`).replace("#include <begin_vertex>",`
          vec2 rel = mod(aOff.xy - uCenter.xz + 30.0, 60.0) - 30.0;
          vec2 wp = uCenter.xz + rel;
          float rr = length(wp);
          float ok = step(22.0, rr) * (1.0 - step(226.0, rr)) * step(4.8, abs(wp.y - 28.0)) * step(-250.0, wp.y);
          float fadeEdge = 1.0 - smoothstep(20.0, 29.0, length(rel));
          float sc = aOff.w * ok * fadeEdge;
          float cs = cos(aOff.z), sn = sin(aOff.z);
          vec3 transformed = vec3(position.x * cs, position.y, position.x * sn) * sc;
          float h = position.y / 0.85;
          float gust = sin(uTime * 1.3 + wp.x * 0.045 + wp.y * 0.03) * 0.5 + 0.5;
          float sway = sin(uTime * 2.4 + wp.x * 0.35 + wp.y * 0.27) * (0.1 + gust * 0.14);
          transformed.x += sway * h * h * sc;
          transformed.z += sway * 0.5 * h * h * sc;
          transformed.xz += wp;
          vGrassCol = aCol * mix(0.72, 1.12, h);`),f.fragmentShader=f.fragmentShader.replace("( gl_FrontFacing ) ? vLightFront : vLightBack","vLightFront").replace("( gl_FrontFacing ) ? vIndirectFront : vIndirectBack","vIndirectFront").replace("#include <common>",`#include <common>
varying vec3 vGrassCol;`).replace("#include <color_fragment>",`#include <color_fragment>
  diffuseColor.rgb *= vGrassCol;`)};const u=new THREE.Mesh(s,d);return u.frustumCulled=!1,u.receiveShadow=!0,u.userData.uniforms=h,u.userData.fullCount=e,v=u,u}let g=null,C=null;function X(){g||(g=document.createElement("div"),g.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:55;opacity:0;background:radial-gradient(ellipse at center, rgba(239,68,68,0) 45%, rgba(220,38,38,0.65) 100%);",C=document.createElement("div"),C.className="lowhp-vignette",document.body.append(g,C))}function te(e=1){X(),g.animate&&g.animate([{opacity:.85*e},{opacity:0}],{duration:420,easing:"ease-out"})}function ae(e){X(),C.classList.toggle("on",e>0&&e<.3)}function oe(e,o,a){return new THREE.ShaderMaterial({uniforms:{uProg:{value:0},uTime:{value:0},uReach:{value:o},uColor:{value:new THREE.Color(a)},uLine:{value:e==="line"?1:0}},vertexShader:`
        varying vec3 vPos;
        void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
        uniform float uProg; uniform float uTime; uniform float uReach; uniform vec3 uColor; uniform float uLine;
        varying vec3 vPos;
        void main() {
          float t; float border;
          if (uLine > 0.5) {
            t = clamp(vPos.z / uReach, 0.0, 1.0);
            border = max(smoothstep(0.8, 0.98, abs(vPos.x)), smoothstep(0.97, 1.0, t));
          } else {
            t = length(vPos.xz) / uReach;
            border = smoothstep(0.93, 0.985, t) * (1.0 - smoothstep(0.995, 1.0, t));
          }
          float filled = step(t, uProg);
          float front = smoothstep(0.035, 0.0, abs(t - uProg)) * step(uProg, 0.999);
          // \uBC14\uB2E5 \uC904\uBB34\uB2AC (\uACBD\uACE0 \uD328\uD134)
          float stripes = step(0.5, fract((vPos.x + vPos.z) * 0.9 - uTime * 1.5)) * 0.08;
          float a = 0.14 + stripes + filled * 0.32 + border * 0.75 + front * 0.8;
          vec3 col = uColor;
          col = mix(col, vec3(1.0, 0.95, 0.85), front * 0.8 + border * 0.25);
          // \uBC1C\uB3D9 \uC9C1\uC804 \uD558\uC597\uAC8C \uC810\uBA78
          float warn = smoothstep(0.82, 1.0, uProg);
          float blink = 0.5 + 0.5 * sin(uTime * 38.0);
          col = mix(col, vec3(1.0), warn * blink * 0.55);
          a = min(1.0, a + warn * blink * 0.25);
          gl_FragColor = vec4(col, a * 0.92);
        }`,transparent:!0,depthWrite:!1,side:THREE.DoubleSide})}function A(e,o=2,a=1){if(typeof FXHQ=="undefined"||!FXHQ._add)return!1;const t=Math.max(1,Math.round(o*M));for(let s=0;s<t;s++){const i=FXHQ._sprite("smoke",15986662,!1,.7);i.position.set(e.x+(Math.random()-.5)*.9,Math.max(.2,e.y+.25),e.z+(Math.random()-.5)*.9);const r=(Math.random()-.5)*2.4,n=(Math.random()-.5)*2.4,l=.8+Math.random()*1.2,c=(.7+Math.random()*.5)*a;FXHQ._add(i,.5+Math.random()*.25,(h,d,u)=>{i.position.x+=r*d*(1-u),i.position.z+=n*d*(1-u),i.position.y+=l*d*(1-u),i.scale.setScalar(c*(.6+u*1.2)),i.material.opacity=.65*(1-u)})}return!0}function ne(e,o=1){typeof FXHQ!="undefined"&&(A(e,7*o,1.3),FXHQ.shockwave(new THREE.Vector3(e.x,0,e.z),16777215,2.6*o))}function re(e,o,a=12248829){if(typeof FXHQ=="undefined"||!FXHQ._add)return;const t=Math.round(10*M)+2;for(let s=0;s<t;s++){const i=FXHQ._sprite("spark",s%3?a:16777215,!0,.9),r=new THREE.Vector3(o.z,0,-o.x).multiplyScalar((Math.random()-.5)*2.4);i.position.set(e.x+r.x,.6+Math.random()*2.6,e.z+r.z);const n=o.clone().multiplyScalar(-(14+Math.random()*10));FXHQ._add(i,.28+Math.random()*.12,(l,c,h)=>{if(i.position.addScaledVector(n,c),POLISH._camera){const d=i.position.clone().project(POLISH._camera),u=i.position.clone().addScaledVector(n,.03).project(POLISH._camera);i.material.rotation=Math.atan2(u.y-d.y,(u.x-d.x)*(POLISH._camera.aspect||1.6))}i.scale.set(2.6*(1-h*.5),.22,1),i.material.opacity=.9*(1-h)})}FXHQ.shockwave(new THREE.Vector3(e.x,0,e.z),a,3.2)}let m=null;function ie(){return m||(m=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uTime:{value:0},uDeep:{value:new THREE.Color(754889)},uShallow:{value:new THREE.Color(5032432)},uSky:{value:new THREE.Color(13624567)},uRiverZ:{value:28},uHalfW:{value:3.75},uNight:{value:0}}]),vertexShader:`
        #include <fog_pars_vertex>
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,fragmentShader:`
        #include <fog_pars_fragment>
        uniform float uTime; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uSky;
        uniform float uRiverZ; uniform float uHalfW; uniform float uNight;
        varying vec3 vWorld;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
        void main() {
          vec2 p = vWorld.xz;
          float across = clamp(abs(p.y - uRiverZ) / uHalfW, 0.0, 1.0);
          vec2 q = vec2(p.x * 0.22 - uTime * 0.9, p.y * 0.9);
          float r1 = n(q) * 0.6 + n(q * 2.3 + vec2(uTime * 0.3, 0.0)) * 0.4;
          float r2 = n(vec2(p.x * 0.5 - uTime * 1.6, p.y * 1.7));
          vec3 col = mix(uDeep, uShallow, smoothstep(0.15, 0.95, across) * 0.75 + r1 * 0.25);
          // \uD558\uB298 \uBC18\uC0AC
          vec3 V = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 2.5);
          col = mix(col, uSky, fres * 0.55);
          // \uBB3C\uACB0 \uD558\uC774\uB77C\uC774\uD2B8 \uC904\uBB34\uB2AC
          float ripple = smoothstep(0.62, 0.72, r1) * (1.0 - smoothstep(0.72, 0.85, r1));
          col += vec3(1.0) * ripple * 0.28;
          // \uAC00\uC7A5\uC790\uB9AC \uAC70\uD488
          float foam = smoothstep(0.78, 0.98, across + (r2 - 0.5) * 0.25);
          col = mix(col, vec3(0.96, 0.99, 1.0), foam * 0.75);
          // \uBC18\uC9DD\uC784
          vec2 cell = floor(p * vec2(1.6, 3.0));
          float sp = h(cell + floor(uTime * 2.0));
          float spark = step(0.965, sp) * step(0.55, r2) * (1.0 - foam);
          col += vec3(1.0, 0.98, 0.9) * spark * (0.9 - uNight * 0.5);
          gl_FragColor = vec4(col, 1.0);
          #include <fog_fragment>
        }`,fog:!0}),m)}const L={low:"\uB0AE\uC74C",mid:"\uBCF4\uD1B5",high:"\uB192\uC74C"};let b=z("chiikawa_gfx_quality",j?"low":"high");L[b]||(b="high");let M=1;function U(e,o=b){b=o,D("chiikawa_gfx_quality",o);const a={low:{pr:.75,minPr:.55,shadow:0,bloom:!1,forest:.15,grass:.18,near:0,flowers:.15,detail:.3,lowPower:!0,far:340,lights:!1},mid:{pr:1.5,minPr:.85,shadow:2048,bloom:!0,forest:.6,grass:.75,near:.5,flowers:.7,detail:.75},high:{pr:2,minPr:.85,shadow:4096,bloom:!0,forest:1,grass:1,near:1,flowers:1,detail:1}}[o];if(M=a.detail,typeof FXHQ!="undefined"&&FXHQ.setDetail&&FXHQ.setDetail(a.detail),!e||!e.renderer)return;const t=!!e.lowPower;if(e.lowPower=!!a.lowPower,document.body.classList.toggle("gfx-low",!!a.lowPower),e.minPixelRatio=a.minPr,e.camera){const r=a.far||1100;e.camera.far!==r&&(e.camera.far=r,e.camera.updateProjectionMatrix())}if(e.scene){const r=!!a.lowPower;e.scene.traverse(n=>{n.isPointLight?n.visible=a.lights!==!1:n.userData&&n.userData.isOutline&&(n.visible=!r)}),e.scene.children.forEach(n=>{!n.userData||!n.userData.townHQ||n.traverse(l=>{if(!l.isMesh||l.isInstancedMesh||!l.geometry||l.userData&&l.userData.isOutline)return;l.geometry.boundingSphere||l.geometry.computeBoundingSphere(),(l.geometry.boundingSphere?l.geometry.boundingSphere.radius*Math.max(l.scale.x,l.scale.y,l.scale.z):1)<.32&&(l.visible=!r)})})}if(e._baseEncoding===void 0&&(e._baseEncoding=e.renderer.outputEncoding),e.renderer.outputEncoding=a.lowPower?THREE.LinearEncoding:e._baseEncoding,e.scene&&e.scene.fog&&(e._baseFogDensity===void 0&&(e._baseFogDensity=e.scene.fog.density),e.scene.fog.density=a.lowPower?Math.max(e._baseFogDensity,.0042):e._baseFogDensity),e.maxPixelRatio=Math.min(window.devicePixelRatio||1,a.pr),(a.lowPower||e.currentPixelRatio>e.maxPixelRatio)&&(e.currentPixelRatio=e.maxPixelRatio,e.renderer.setPixelRatio(e.currentPixelRatio),e.composer&&(e.composer.setPixelRatio&&e.composer.setPixelRatio(e.currentPixelRatio),e.composer.setSize(window.innerWidth,window.innerHeight))),e.dirLight){const r=e.renderer.capabilities.maxTextureSize,n=Math.min(a.shadow,r>=8192?4096:2048);e.dirLight.castShadow=a.shadow>0,a.shadow>0&&e.dirLight.shadow.mapSize.width!==n&&(e.dirLight.shadow.mapSize.set(n,n),e.dirLight.shadow.map&&(e.dirLight.shadow.map.dispose(),e.dirLight.shadow.map=null))}e.bloomPass&&(e.bloomPass.enabled=a.bloom);const s=(r,n)=>{r&&r.traverse(l=>{l.isInstancedMesh&&(l.userData.fullCount===void 0&&(l.userData.fullCount=l.count),l.count=Math.max(1,Math.floor(l.userData.fullCount*n)))})};e.scene&&e.scene.children.forEach(r=>{!r.userData||r.userData.stageHQ||r.userData.townHQ||r.name==="jump-tower"||r.traverse(n=>{n.isInstancedMesh&&(n.userData.fullCount===void 0&&(n.userData.fullCount=n.count),!(n.userData.fullCount<=40)&&(n.count=Math.max(1,Math.floor(n.userData.fullCount*(a.lowPower?.3:1)))))})}),s(e.forestGroup,a.forest),s(e.instancedGrass,a.grass),s(e.flowerGroup,a.flowers),v&&(v.visible=a.near>0,v.geometry.instanceCount=Math.floor(v.userData.fullCount*Math.max(a.near,.01))),e.renderer.shadowMap&&(e.renderer.shadowMap.autoUpdate=a.shadow>0);const i=document.getElementById("btn-gfx-quality");i&&(i.innerText=`\u{1F3A8} \uD654\uC9C8: ${L[o]}`),a.lowPower&&!t&&e.gameStarted&&typeof showToast=="function"&&showToast("\u{1F422} \uC800\uC0AC\uC591 \uBAA8\uB4DC! \uC0C8\uB85C\uACE0\uCE68(F5)\uD558\uBA74 \uACC4\uB2E8 \uD604\uC0C1 \uBCF4\uC815\uAE4C\uC9C0 \uAEBC\uC838\uC11C \uB354 \uAC00\uBCBC\uC6CC\uC838\uC694.")}function se(e){const o=["high","mid","low"],a=o[(o.indexOf(b)+1)%o.length];U(e,a),typeof showToast=="function"&&showToast(`\u{1F3A8} \uADF8\uB798\uD53D \uD488\uC9C8: ${L[a]}`)}function le(){document.querySelectorAll(".quest-panel, .teleport-panel").forEach((e,o)=>{const a=`chiikawa_hud_collapsed_${o}`,t=e.querySelector(".panel-header-title");if(!t)return;t.classList.add("collapsible"),z(a,"1")==="1"&&e.classList.add("collapsed"),t.addEventListener("click",()=>{e.classList.toggle("collapsed"),D(a,e.classList.contains("collapsed")?"1":"0")})}),z("chiikawa_hud_compact","0")==="1"&&document.body.classList.add("hud-compact"),G()}function G(){const e=document.getElementById("btn-hud-compact");e&&(e.innerText=document.body.classList.contains("hud-compact")?"\u{1F9E9} UI \uD3BC\uCE58\uAE30":"\u{1F9F9} UI \uAC04\uC18C\uD654")}function ce(){document.body.classList.toggle("hud-compact"),D("chiikawa_hud_compact",document.body.classList.contains("hud-compact")?"1":"0"),G()}function ue(e,o,a,t){if(!e||!e.mesh)return;e.windupT=t,e.windupMax=t;const s=a.x-e.pos.x,i=a.z-e.pos.z;e.windupJump=o==="circle"&&Math.hypot(s,i)<2.5,e.windupLunge=o!=="circle"}const P=`
    float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
    float fbm2(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.7) * 0.3 + vn(p * 4.3 + 1.3) * 0.15; }`,fe=`
    varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vPos;
    void main() {
      vUv = uv; vPos = position;
      vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,W=(e,o,a={})=>new THREE.ShaderMaterial({uniforms:o,vertexShader:fe,fragmentShader:e,transparent:!0,depthWrite:!1,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,...a}),_=e=>new THREE.Color(e),w=e=>1-Math.pow(1-Math.min(1,Math.max(0,e)),3),x=()=>typeof FXHQ!="undefined"&&FXHQ._add,de=`
    uniform vec3 uColor; uniform float uT; uniform float uFade; uniform float uCore;
    varying vec2 vUv; varying vec3 vN; varying vec3 vV;
    ${P}
    void main() {
      float facing = abs(dot(normalize(vN), normalize(vV)));
      float flow = fbm2(vec2(vUv.x * 7.0, vUv.y * 6.0 - uT * 7.0));
      float vfade = smoothstep(0.0, 0.03, vUv.y) * (1.0 - smoothstep(0.5, 1.0, vUv.y));
      float a = pow(facing, 1.4) * (0.5 + 0.75 * flow) * vfade * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.96, 0.92), clamp(pow(facing, 5.0) * uCore + flow * 0.12, 0.0, 1.0));
      gl_FragColor = vec4(col * a, a);
    }`;function H(e,o,a,t,s=.65,i={}){if(!x())return;const r=new THREE.Group;r.position.set(e.x,0,e.z);const n=(d,u,f)=>{const p=new THREE.CylinderGeometry(d,d*1.08,a,40,1,!0);p.translate(0,a/2,0);const y=W(de,{uColor:{value:_(f)},uT:{value:0},uFade:{value:1},uCore:{value:u}}),E=new THREE.Mesh(p,y);return r.add(E),y},l=n(o,.6,t),c=n(o*.32,1.6,16757683),h=i.grow||.07;FXHQ._add(r,s,(d,u,f)=>{const p=d.t,y=w(p/h),E=f>.45?1-w((f-.45)/.55):1;r.scale.set(y*E+.001,Math.min(1,p/(h*1.4)),y*E+.001),[l,c].forEach(N=>{N.uniforms.uT.value=p,N.uniforms.uFade.value=(i.alpha||1)*(f<.85?1:(1-f)/.15)})})}const he=`
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vPos;
    ${P}
    void main() {
      float facing = abs(dot(normalize(vN), normalize(vV)));
      float rim = pow(1.0 - facing, 2.2);
      float bands = fbm2(vec2(atan(vPos.x, vPos.z) * 3.0, vPos.y * 2.0 - uT * 5.0));
      float a = (rim * 1.3 + 0.06 + bands * 0.12) * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.85, 0.7), rim * 0.5);
      gl_FragColor = vec4(col * a, a);
    }`;function k(e,o,a,t=.55){if(!x())return;const s=new THREE.SphereGeometry(1,40,20,0,Math.PI*2,0,Math.PI*.5),i=W(he,{uColor:{value:_(a)},uT:{value:0},uFade:{value:1}}),r=new THREE.Mesh(s,i);r.position.set(e.x,.05,e.z),FXHQ._add(r,t,(n,l,c)=>{const h=.3+w(c*1.4)*o;r.scale.set(h,h*.75,h),i.uniforms.uT.value=n.t,i.uniforms.uFade.value=1-c*c})}function pe(){if(F.burn)return F;const e=256,o=a=>{const t=document.createElement("canvas");return t.width=e,t.height=e,a(t.getContext("2d")),new THREE.CanvasTexture(t)};return F.burn=o(a=>{const t=a.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);t.addColorStop(0,"rgba(20,6,6,0.85)"),t.addColorStop(.55,"rgba(30,10,8,0.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=t,a.fillRect(0,0,e,e)}),F.cracks=o(a=>{a.translate(e/2,e/2),a.strokeStyle="rgba(255,255,255,1)",a.shadowColor="rgba(255,255,255,1)",a.shadowBlur=6;for(let s=0;s<11;s++){let i=s/11*Math.PI*2+Math.random()*.4,r=0,n=0;a.lineWidth=3,a.beginPath(),a.moveTo(0,0);for(let l=0;l<7;l++){i+=(Math.random()-.5)*.7;const c=10+Math.random()*10;r+=Math.cos(i)*c,n+=Math.sin(i)*c,a.lineTo(r,n),a.lineWidth=Math.max(.6,3-l*.4)}a.stroke()}const t=a.createRadialGradient(0,0,0,0,0,40);t.addColorStop(0,"rgba(255,255,255,0.9)"),t.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=t,a.fillRect(-e/2,-e/2,e,e)}),F}const F={};function T(e,o,a=16726815,t=2.6,s=null){if(!x())return;const i=pe(),r=new THREE.Group;r.position.set(e.x,.06,e.z);const n=new THREE.MeshBasicMaterial({map:i.burn,transparent:!0,depthWrite:!1,opacity:.9}),l=new THREE.MeshBasicMaterial({map:i.cracks,color:a,transparent:!0,depthWrite:!1,blending:THREE.AdditiveBlending}),c=new THREE.PlaneGeometry(o*2,o*2);c.rotateX(-Math.PI/2);const h=new THREE.Mesh(c,n),d=new THREE.Mesh(c.clone(),l);d.position.y=.02,d.rotation.y=Math.random()*Math.PI*2,r.add(h,d),s&&(r.rotation.y=s.yaw,r.scale.set(s.w,1,s.l)),FXHQ._add(r,t,(u,f,p)=>{n.opacity=.85*(1-Math.max(0,(p-.5)/.5)),l.opacity=Math.max(0,1-p*1.6)*(.75+.25*Math.sin(u.t*30))})}function R(e,o,a,t=18){if(x()){t=Math.max(4,Math.round(t*M));for(let s=0;s<t;s++){const i=FXHQ._sprite(s%4===0?"star":"glow",s%3===0?16770262:a,!0),r=s/t*Math.PI*2,n=o*(.2+Math.random()*.5),l=7+Math.random()*9,c=.35+Math.random()*.5;FXHQ._add(i,.9+Math.random()*.5,(h,d,u)=>{const f=r+h.t*3.5,p=n*(1-u*.5);i.position.set(e.x+Math.cos(f)*p,.3+l*w(u),e.z+Math.sin(f)*p),i.scale.setScalar(c*(1-u*.6)),i.material.opacity=1-u*u})}}}const ve="varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",me=`
    uniform vec3 uColor; uniform float uT; uniform float uFront; uniform float uFade; uniform float uR; uniform float uHalf;
    varying vec3 vPos;
    ${P}
    void main() {
      float d = length(vPos.xz) / uR;
      float ang = atan(vPos.x, vPos.z) / uHalf;
      float edge = 1.0 - smoothstep(0.8, 1.0, abs(ang));
      float n = fbm2(vec2(ang * 5.0, d * 7.0 - uT * 6.0));
      float front = smoothstep(uFront - 0.22 - n * 0.08, uFront, d) * (1.0 - smoothstep(uFront, uFront + 0.025, d));
      float trail = (1.0 - step(uFront, d)) * smoothstep(0.0, uFront, d) * 0.35 * n;
      float a = (front * 1.5 + trail) * edge * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.92, 0.6), front * 0.75);
      gl_FragColor = vec4(col * a, a);
    }`;function we(e,o,a,t,s,i=.45){if(!x())return;const r=48,n=[0,0,0],l=[];for(let u=0;u<=r;u++){const f=-t/2+u/r*t;n.push(Math.sin(f)*a,0,Math.cos(f)*a),u>0&&l.push(0,u,u+1)}const c=new THREE.BufferGeometry;c.setAttribute("position",new THREE.Float32BufferAttribute(n,3)),c.setIndex(l);const h=new THREE.ShaderMaterial({uniforms:{uColor:{value:_(s)},uT:{value:0},uFront:{value:0},uFade:{value:1},uR:{value:a},uHalf:{value:t/2}},vertexShader:ve,fragmentShader:me,transparent:!0,depthWrite:!1,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),d=new THREE.Mesh(c,h);d.position.set(e.x,.25,e.z),d.rotation.y=o,FXHQ._add(d,i,(u,f,p)=>{h.uniforms.uT.value=u.t,h.uniforms.uFront.value=.08+w(p*1.25)*.95,h.uniforms.uFade.value=1-Math.max(0,(p-.6)/.4)}),FXHQ.slash(e,o,s,3,0,0,{radius:a,span:t,y:1.2,dir:1,life:.34,noOffset:!0})}const xe=`
    uniform vec3 uColor; uniform float uT; uniform float uFade; uniform float uLen;
    varying vec2 vUv;
    ${P}
    void main() {
      float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
      float core = pow(across, 9.0);
      float glow = pow(across, 2.2);
      float flow = fbm2(vec2(vUv.y * uLen * 0.25 - uT * 14.0, vUv.x * 3.0));
      float ends = smoothstep(0.0, 0.03, vUv.y) * (1.0 - smoothstep(0.96, 1.0, vUv.y));
      float a = (glow * 0.65 * (0.55 + 0.6 * flow) + core * 1.4) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.95, 0.92), clamp(core * 1.2, 0.0, 1.0));
      gl_FragColor = vec4(col * a, a);
    }`;function O(e,o,a,t,s,i=.55,r=1,n=1.3){if(!x())return;const l=new THREE.Group,c=new THREE.ShaderMaterial({uniforms:{uColor:{value:_(s)},uT:{value:0},uFade:{value:r},uLen:{value:a}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:xe,transparent:!0,depthWrite:!1,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});for(let h=0;h<2;h++){const d=new THREE.PlaneGeometry(t,a);d.translate(0,a/2,0),d.rotateX(Math.PI/2);const u=new THREE.Mesh(d,c);u.rotation.z=h*Math.PI/2,l.add(u)}l.position.set(e.x,n,e.z),l.rotation.y=o,FXHQ._add(l,i,(h,d,u)=>{c.uniforms.uT.value=h.t;const f=u<.12?w(u/.12):1-w((u-.12)/.88)*.95;l.scale.set(f,f,1),c.uniforms.uFade.value=r*(u<.8?1:(1-u)/.2)})}function ye(e,o){if(!x()||o<=.05)return;const a=e.center,t=e.reach||5,s=e.patternType==="line"?16738877:16723245;if(e.patternType==="line"){O(a,e.yaw||0,t,.35,s,o,.55,.6);return}if(e.patternType==="circle"){H(a,Math.min(.9,.18+t*.04),34,s,o,{grow:o*.6,alpha:.6});const i=Math.max(4,Math.round((t<6?5:14)*M));for(let r=0;r<i;r++){const n=FXHQ._sprite("glow",r%2?16765120:s,!0),l=Math.random()*Math.PI*2,c=Math.random()*o*.5;FXHQ._add(n,o,(h,d,u)=>{const f=Math.max(0,h.t-c)/Math.max(.05,o-c),p=t*(1-w(f));n.position.set(a.x+Math.cos(l)*p,.4+f*1.5,a.z+Math.sin(l)*p),n.scale.setScalar(.5*(1-f*.5)),n.material.opacity=h.t<c?0:1})}}}function Ee(e,o){if(!x())return!1;const a=o.center,t=o.reach||5,s=o.monster,i=!!(s&&(s.isBoss||s.isRaidBoss)),r=o.patternType==="line"?16734751:16720932,n=new THREE.Vector3(a.x,0,a.z),l=o.yaw||0,c=new THREE.Vector3(Math.sin(l),0,Math.cos(l));if(o.patternType==="circle")if(i&&t<6)H(n,Math.max(.8,t*.32),30,r,.55),FXHQ.shockwave(n,r,t*1.1),T(n,t*.85,16726815,2),R(n,t*.6,r,6);else if(i){if(H(n,Math.max(1.2,t*.38),38,r,.7),k(n,t*1.05,r,.55),FXHQ.shockwave(n,r,t*1.15),FXHQ.shockwave(n,16765634,t*.6),T(n,t*.9,16726815,2.8),R(n,t,r,20),t>=11){const d=new THREE.Group,u=new Set;FXHQ._add(d,.6,f=>{for(let p=0;p<8;p++){if(u.has(p)||f.t<p*.05)continue;u.add(p);const y=p/8*Math.PI*2,E=n.clone().add(new THREE.Vector3(Math.cos(y),0,Math.sin(y)).multiplyScalar(t*.72));H(E,.9,26,r,.55),T(E,2.4,16726815,2)}})}}else k(n,t*.9,r,.4),FXHQ.shockwave(n,r,t),R(n,t*.7,r,8),T(n,t*.6,16726815,1.6);else if(o.patternType==="sector")we(n,l,t,Math.PI*.64,r,i?.5:.4),i&&([-.24,0,.24].forEach((d,u)=>{const f=n.clone().add(new THREE.Vector3(Math.sin(l+d*Math.PI),0,Math.cos(l+d*Math.PI)).multiplyScalar(t*.78));H(f,.7,18,r,.45)}),T(n.clone().addScaledVector(c,t*.45),t*.55,16726815,2.2)),R(n.clone().addScaledVector(c,t*.5),t*.5,r,i?12:6);else{O(n,l,t,i?2.6:1.6,r,.55,1,1.3),T(n.clone().addScaledVector(c,t*.5),1,16734751,2.2,{yaw:l,w:1.4,l:t*.5});const d=n.clone().addScaledVector(c,t);k(d,i?4:2.5,r,.4),FXHQ.shockwave(d,r,i?4.5:3),R(d,2,r,8)}if(Math.hypot(e.playerPos.x-a.x,e.playerPos.z-a.z)<t*1.6&&(e.camShake=Math.max(e.camShake||0,i?.6:.25),i&&typeof FXHQ.screenFlash=="function"&&FXHQ.screenFlash(r,t>=7?.2:.1,220)),s&&s.mesh){const d=s.baseScale||1;s.mesh.scale.set(d*1.25,d*.76,d*1.25),s.windupT=0}return!0}function ge(e){(e.telegraphs||[]).forEach(o=>{if(o.fxCharged||!o.duration)return;const a=o.monster,t=!!(a&&(a.isBoss||a.isRaidBoss));if(!(o.patternType==="line"||t&&o.patternType==="circle")){o.fxCharged=!0;return}o.progress/o.duration>=.5&&(o.fxCharged=!0,ye(o,o.duration-o.progress))})}function be(e,o){const a=e.clock?e.clock.elapsedTime:0;(e.monsters||[]).forEach(t=>{if(!t.alive||!t.mesh)return;const s=t.mesh.userData.mats||[];if(t.windupT>0){t.windupT-=o;const i=Math.min(1,1-Math.max(0,t.windupT)/(t.windupMax||1)),r=.5+.5*Math.sin(a*(12+26*i));s.forEach(l=>{l.userData.fxFlash&&(l.userData.fxFlash.uFlashColor.value.setHex(16726843),l.userData.fxFlash.uFlash.value=Math.max(l.userData.fxFlash.uFlash.value,.1+.32*i*r))});const n=t.baseScale||1;if(t.windupJump&&i>.62){const l=(i-.62)/.38,c=Math.sin(l*Math.PI*.5)*(t.isRaidBoss?4.5:t.isBoss?3:1.6);t.mesh.position.y+=c,t.mesh.scale.set(n*.92,n*1.12,n*.92)}else t.mesh.scale.set(n*(1+.07*i*r),n*(1-.1*i),n*(1+.07*i*r)),t.windupLunge&&(t.mesh.position.y+=Math.sin(a*40)*.05*i)}})}function Me(e,o){POLISH._camera=e.camera,be(e,o),ge(e),e.camera&&e.playerPos&&J(e.camera,e.playerPos,o);const a=e.clock?e.clock.elapsedTime:0;v&&v.visible&&(v.userData.uniforms.uTime.value=a,v.userData.uniforms.uCenter.value.copy(e.playerPos)),m&&(m.uniforms.uTime.value=a,e.scene&&e.scene.fog&&m.uniforms.uSky.value.copy(e.scene.fog.color),m.uniforms.uNight.value=e.timeOfDay==="night"?1:0),e.stats&&ae(e.stats.hp/Math.max(1,e.stats.maxHp)*(e.battleState&&e.battleState.active?1:0))}return{registerOccluder:$,attachBackView:Z,makeBackTexture:V,damageNumber:K,createNearGrass:ee,playerHurt:te,telegraphMaterial:oe,dust:A,landing:ne,dashBurst:re,getWaterMaterial:ie,applyQuality:U,cycleQuality:se,initHud:le,toggleCompact:ce,update:Me,onTelegraph:ue,attackImpact:Ee,get quality(){return b},get detail(){return M},_camera:null}})();
