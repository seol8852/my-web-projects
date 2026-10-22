// Three.js 한 곳에서 불러오기 (r186, npm 패키지)
//  - 예전 전역 THREE와 똑같이 쓰도록 하나의 객체로 모음 (후처리·GLTF 로더 포함)
//  - r128 시절 화면을 그대로 유지하기 위한 호환 설정:
//    · 색 관리 끔 (예전처럼 0xff85a2 같은 색값을 그대로 사용)
//    · 조명 세기: 예전 "레거시 조명"은 내부적으로 ×π 였으므로 같은 숫자를 넣어도 같은 밝기가 되게 보정
import * as T from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

T.ColorManagement.enabled = false;
// r128처럼 "기본 재질마다" 톤매핑 (후처리 렌더 타깃에 그릴 때도 적용, 직접 만든 셰이더 재질은 제외)
//  → 최신 버전은 화면에 그릴 때만 톤매핑해서 후처리 경로에서 색이 달라짐
T.ShaderChunk.common += `
#ifndef TONE_MAPPING
uniform float toneMappingExposure;
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3( vec3( 0.59719, 0.07600, 0.02840 ), vec3( 0.35458, 0.90834, 0.13383 ), vec3( 0.04823, 0.01566, 0.83777 ) );
	const mat3 ACESOutputMat = mat3( vec3( 1.60475, -0.10208, -0.00327 ), vec3( -0.53108, 1.10813, -0.07276 ), vec3( -0.07367, -0.00605, 1.07602 ) );
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return clamp( color, 0.0, 1.0 );
}
#endif
`;
T.ShaderChunk.tonemapping_fragment = 'gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );';

// 레거시 조명 세기(×π) 보정: 코드에서는 예전 숫자 그대로 쓰고, 렌더러에는 ×π 값이 전달됨
const LEGACY = Math.PI;
function legacyIntensity(Base) {
  return class extends Base {
    get intensity() { return (this._legacyI === undefined ? 1 : this._legacyI) * LEGACY; }
    set intensity(v) { this._legacyI = v; }
  };
}
const DirectionalLight = legacyIntensity(T.DirectionalLight);
const HemisphereLight = legacyIntensity(T.HemisphereLight);
const AmbientLight = legacyIntensity(T.AmbientLight);
const SpotLight = legacyIntensity(T.SpotLight);
// 점광원: 예전엔 거리에 따라 직선적으로 약해짐(decay=1, cutoff). 새 버전의 물리 감쇠 대신 비슷한 곡선이 되도록 decay=0 + 세기 보정
class PointLight extends legacyIntensity(T.PointLight) {
  constructor(color, intensity = 1, distance = 0) {
    super(color, intensity, distance, 0);
    this._legacyI = intensity * 0.7;
  }
}

const THREE = Object.assign({}, T, {
  DirectionalLight, HemisphereLight, AmbientLight, SpotLight, PointLight,
  EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, OutputPass, CopyShader, LuminosityHighPassShader, GLTFLoader
});
// 굽기 도구(tools/bake/export.mjs)만 쓰는 내보내기 모듈: 필요할 때만 따로 받음
THREE.loadGLTFExporter = () => import('three/examples/jsm/exporters/GLTFExporter.js').then(m => m.GLTFExporter);
window.THREE = THREE; // 디버그 콘솔·도구(굽기 추출)용
export default THREE;
