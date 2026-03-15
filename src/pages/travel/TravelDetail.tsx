import { useParams } from "react-router-dom";
function TravelDetail (){
    // URL에서 id 값 가지고 오기 
    // 예: /travel/1 -> id = "1"
    const {id} = useParams();
  // 추천 여행지 데이터 (임시 데이터)
    const places = [
    { id: 1, name: "제주도", desc: "바다와 자연이 아름다운 여행지", type: "domestic" },
    { id: 2, name: "부산", desc: "맛집과 바다를 함께 즐길 수 있는 도시", type: "domestic" },
    { id: 3, name: "도쿄", desc: "쇼핑과 먹거리가 많은 해외 여행지", type: "overseas" },
    { id: 4, name: "오사카", desc: "가볍게 다녀오기 좋은 인기 여행지", type: "overseas" },
  ];
  const place = places.find((place) => place.id === Number(id)); 
  if(!place){
    return <p>해당 여행지를 찾을 수 없습니다 </p>
  }

    return (
        <div>
            <h1>{place.name}</h1>
            <p>{place.desc}</p>
            <p>{place.type}</p>       
        </div>
    )
}

export default TravelDetail;