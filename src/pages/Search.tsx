// React Router에서 URL query 값을 가져오기
import { useSearchParams } from "react-router-dom";

function Search() {

  // URL query parameter 읽기
  const [params] = useSearchParams();

  // 검색어 가져오기
  const keyword = params.get("keyword");

  // 여행 타입 가져오기 (domestic / overseas)
  const type = params.get("type");


  // 추천 여행지 데이터 (임시 데이터)
  const places = [
    { id: 1, name: "제주도", desc: "바다와 자연이 아름다운 여행지", type: "domestic" },
    { id: 2, name: "부산", desc: "맛집과 바다를 함께 즐길 수 있는 도시", type: "domestic" },
    { id: 3, name: "도쿄", desc: "쇼핑과 먹거리가 많은 해외 여행지", type: "overseas" },
    { id: 4, name: "오사카", desc: "가볍게 다녀오기 좋은 인기 여행지", type: "overseas" },
  ];


  // 검색 조건에 맞는 여행지 필터링
  const filteredPlaces = places.filter((place) => {

    // 검색어가 있으면 이름 포함 여부 확인
    // 검색어가 없으면 모든 여행지 통과
    const matchKeyword = keyword ? place.name.includes(keyword) : true;

    // 여행 타입이 있으면 타입 비교
    // 타입이 없으면 모든 여행지 통과
    const matchType = type ? place.type === type : true;

    // 두 조건을 모두 만족해야 결과에 포함
    return matchKeyword && matchType;
  });


  return (
    <div>

      {/* 페이지 제목 */}
      <h1>추천 여행 결과</h1>

      {/* 검색 조건 표시 */}
      <p>검색어: {keyword}</p>
      <p>여행 타입: {type}</p>

      <hr />

      {/* 검색 결과가 있으면 리스트 출력 */}
        {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place)=> (
            <div key={place.id}>
                <h3>{place.name}</h3>
                <p>{place.desc}</p>
            </div>
        ))
    ):(
        <p>조건에 맞는 여행지가 없습니다</p>
    )}
    </div>
  );
}

export default Search;