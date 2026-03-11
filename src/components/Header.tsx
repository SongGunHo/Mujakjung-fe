import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
    // 페이지 이동 함수 
    const navigte = useNavigate();
    // 검색어 상태 
    const [keyword, setKeyword] = useState("");
    // 여행 타입 상태 (국내 / 해오ㅣ)
    const [type , setType] = useState("domestic");

    // 검색 버튼 클릭 
    const search = () =>{
    // 검색 페이지 이동
        navigte(`/search?keyword=${keyword}&type=${type}`)
    }
  return (
    <header>
    {/** 사이트 제목 */}
      <h1>AI 여행 사이트</h1>
    {/** 검색어 입력 */}
    <input type="text" value={keyword} onChange={(e)=> setKeyword(e.target.value)} placeholder="검색어를 입력을 하새요" />
    {/** 검색 버튼  */}
    <select value={type} onChange={(e)=> setType(e.target.value)}>
        <option value="domestic">국내 여행 </option>
        <option value="overseas">해외 여행</option>
    </select>
    {/** 검색 버튼  */}
    <button onClick={search}>검색</button>
    {/** 회원 가입 페이지 이동  */}
    <button onClick={()=> navigte("/join")}>회원 가입</button>
    {/** 로그인 페이지 이동 */}
    <button onClick={()=> navigte("login")}>로그인</button>




    </header>
  );
}

export default Header;