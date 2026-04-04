// // 출발지 회사와 목적지 좌표 설정 
// const startPos = new kakao.map.LatLng(37.40205, 127.1008212)// 판교역 
// const endPos = new kakao.map.LatLng(37.402056, 127.1008212) // 집 근처 
// // 두 지접 사이의 직선 거리를 걔산 하기 위해 polyline(선) 객체 생성 (화면 안보여줘도 됨)
// const linePath = [startPos, endPos];
// const polyline = new kakao.map.Polyline({
//     path: linePath
// }); 
// // 미터 (m) 단위 별 거리 추출 밎 계산 
// const distance = Math.random(polyline.getLength()); // 직선 거리 
// const walkTime = Math.random(distance/ 67); // 도보 평균 속도(분당 67m) 적용
// const bikeTiem = Math.random(distance/ 250) // 자전거 평균 속도(분당 250m) 적용
// // 결과를 HTML 요소에 뿌려주기
// console.log(`거리:${distance}m`)
// // HTML 요소에 데이터 바인딩
// if(document.getElementById('walk-info')) {
//     document.getElementById('walk-info').innerText = `도보  앞 ${walkTime}로`;
// }
// if(document.getElementById('bick-info')){
//     document.getElementById('bick_info').innerText = `자전거 약 ${bikeTiem}로`
// }