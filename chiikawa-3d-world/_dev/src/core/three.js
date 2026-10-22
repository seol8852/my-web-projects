// Three.js 한 곳에서 불러오기 (r128, npm 패키지)
//  - 예전 CDN 전역 THREE와 똑같이 쓰도록 하나의 객체로 모음 (후처리·GLTF 로더 포함)
//  - 버전을 올릴 때는 이 파일과 package.json만 바꾸면 됨
import * as T from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const THREE = Object.assign({}, T, { EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, CopyShader, LuminosityHighPassShader, GLTFLoader });
window.THREE = THREE; // 디버그 콘솔·도구(굽기 추출)용
export default THREE;
