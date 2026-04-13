import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg";

function Header() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("domestic");

  // 서랍에서 데이터 꺼내기 (Login.tsx와 대소문자까지 똑같아야 함!)
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const search = () => {
    navigate(`/search?keyword=${keyword}&type=${type}`);
  };

  const logout = () => {
    // 로그아웃 시 모든 정보 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    alert("로그아웃 되었습니다.");
    navigate("/", { replace: true });
    window.location.reload(); // 변경사항 반영을 위해 새로고침
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'success') {
      // 카카오 로그인 성공 시 처리 (오타 수정: ture -> true)
      localStorage.setItem("token", "true");
      localStorage.setItem("role", "ADMIN"); // 관리자라면 ADMIN 저장
      localStorage.setItem("userName", "회원"); 
      navigate("/", { replace: true });
      window.location.reload();
    }
  }, [navigate]);

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/"><img src={logo} alt="로고" width="80" /></Link>
      <h1 style={{ display: 'inline', margin: '0 20px' }}>AI 여행 사이트</h1>

      <input 
        type="text" 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
        placeholder="검색어 입력" 
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">모두</option>
        <option value="domestic">국내 여행</option>
        <option value="overseas">해외 여행</option>
      </select>
      <button onClick={search}>검색</button>

      <div style={{ float: 'right' }}>
        {token ? (
          <>
            {/* 1. 이름 표시 */}
            <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
              {userName || '송근호'}님 안녕하세요
            </span>

            {/* 2. 관리자 페이지 버튼 (권한 체크) */}
            {userRole?.toUpperCase() === "ADMIN" && (
              <button 
                onClick={() => navigate("/admin")} 
                style={{ backgroundColor: '#FFD700', fontWeight: 'bold', marginRight: '5px' }}
              >
                관리자 페이지
              </button>
            )}

            <button onClick={() => navigate("/mypage")}>마이페이지</button>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/join")}>회원 가입</button>
            <button onClick={() => navigate("/login")}>로그인</button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;