import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TravelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [travel, setTravel] = useState<any>(null); // 타입을 any나 인터페이스로 지정
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/api/travel/${id}`);
                setTravel(response.data);
            } catch (error) {
                console.error("데이터 가져오는 중 에러:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    // 1. 로딩 중일 때 먼저 처리
    if (loading) return <div className="loading">힐링 정보를 불러오는 중...</div>;

    // 2. 로딩이 끝났는데 데이터가 없을 때 처리
    if (!travel) return <div className="error">정보가 없습니다.</div>;

    // 3. 데이터가 있을 때만 아래 리턴문 실행
    return (
        <div className="travel-detail-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>뒤로가기</button>

            <header>
                <h1>{travel.title}</h1>
                {/* loading을 location으로 수정 */}
                <p className="location" style={{ color: '#666' }}>📍 {travel.location}</p>
            </header>

            {/* select 대신 div 사용 */}
            <div className="content" style={{ marginTop: '30px' }}>
                <img 
                    src={travel.imageUrl || "https://via.placeholder.com/800x400"} 
                    alt={travel.title} 
                    style={{ width: '100%', borderRadius: '15px' }} 
                />
            </div>

            <div className="description" style={{ marginTop: '20px', lineHeight: '1.6' }}>
                {travel.description}
            </div>

            <footer style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h3>쉼 포인트</h3>
                <p>{travel.healingPoint}</p>
            </footer>
        </div>
    );
}

export default TravelDetail;