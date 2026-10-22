// 모듈의 최상위 이름을 window에 "살아있는 연결"(getter/setter)로 노출
//  - HTML의 onclick="openStageSelectModal()" 같은 인라인 호출
//  - 뒤쪽 모듈을 앞쪽 모듈이 실행 중에 부를 때 (window.SHOPHQ 등)
//  - window.X = 새함수 로 덮어쓰면 원래 모듈 안의 변수도 함께 바뀜 (예전 전역 스크립트와 같은 동작)
const mine = new Set();
export function expose(obj) {
  const d = Object.getOwnPropertyDescriptors(obj);
  for (const k of Object.keys(d)) {
    // 브라우저 기본 전역(open, close, name 등)은 건드리지 않음
    if (k in window && !mine.has(k)) {
      const cur = Object.getOwnPropertyDescriptor(window, k);
      if (!cur || !cur.configurable) continue;
      if (!(typeof cur.value === 'undefined' || cur.get)) continue;
    }
    mine.add(k);
    Object.defineProperty(window, k, {
      get: d[k].get,
      set: d[k].set || (() => { throw new TypeError(`${k}은(는) 상수라서 바꿀 수 없어요`); }),
      configurable: true,
      enumerable: true
    });
  }
}
