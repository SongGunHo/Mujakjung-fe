import { useNavigate } from "react-router-dom";

// Travel 타입 정의
// 하나의 여행 데이터를 어떤 구조로 받을지 정하는 타입
type Travel = {
  id: number; // 여행 고유 번호
  title: string; // 여행 제목
  image: string; // 여행 이미지
  price: string; // 여행 가격
  location: string; // 여행 지역
};

// Props 타입 정의
// TravelCard 컴포넌트가 부모 컴포넌트(Search)에서
// travel 데이터를 받을 때 사용하는 타입
type Props = {
  travel: Travel;
};

// TravelCard 컴포넌트
function TravelCard({ travel }: Props) {

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 카드 클릭 시 상세 페이지 이동
  const moveDetail = () => {
    navigate(`/travel/${travel.id}`);
  };

  return (
    <div onClick={moveDetail}>
      <img src={travel.image} width="200" />
      <h3>{travel.title}</h3>
      <p>{travel.location}</p>
      <p>{travel.price}</p>
    </div>
  );
}

export default TravelCard;