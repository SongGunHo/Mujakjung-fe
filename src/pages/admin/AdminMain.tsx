import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. 스타일 정의: TypeScript에서 문자열 리터럴 에러 방지를 위해 'as const' 사용
const styles = {
  container: { 
    padding: '40px', 
    maxWidth: '800px', 
    margin: '0 auto', 
    textAlign: 'left' as const 
  },
  header: { color: '#333' },
  formGroup: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    marginTop: '20px' 
  },
  label: { 
    fontWeight: 'bold' as const, 
    marginBottom: '8px', 
    marginTop: '15px' 
  },
  select: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
  textarea: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '150px' },
  button: { 
    marginTop: '25px', 
    padding: '15px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '18px', 
    cursor: 'pointer', 
    fontWeight: 'bold' as const 
  }
};

function AdminMain() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 2. 입력 데이터 상태 관리 (State)
  const [category, setCategory] = useState("domestic"); // 국내/해외
  const [title, setTitle] = useState("");              // 여행지 이름
  const [location, setLocation] = useState("");        // 주소
  const [content, setContent] = useState("");          // 상세 설명
  const [imageFile, setImageFile] = useState<File | null>(null); // 파일 객체
  const [previewUrl, setPreviewUrl] = useState<string>("");      // 미리보기 URL
  const [price, setPrice] = useState<number>(0);       // 가격 데이터

  // 3. 이미지 선택 시 실행: 미리보기 생성 로직
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 임시 URL 생성
    }
  };

  // 4. 등록 버튼 클릭 시 실행: 백엔드 API 연동
  const handleRegister = () => {
    // 서버로 전송할 데이터 객체 생성
    const travelData = {
      category,
      title,
      location,
      content,  
      price,
      imageName: imageFile ? imageFile.name : "없음",
      regDate: new Date().toLocaleDateString() 
    };

    // axios를 이용한 POST 요청
    axios.post("http://localhost:8080/api/admin/travel/register", travelData)
      .then((res) => {
        // 백엔드에서 저장 후 리턴해준 id 값 추출
        const newId = res.data.id;

        console.log("등록 성공! 서버 응답 데이터:", res.data);
        alert(`${title} 등록이 완료되었습니다! (160번째 커밋 가즈아!)`);
        
        // 성공 시 상세 페이지로 즉시 이동 (절대 경로 / 사용)
        navigate(`/travel/${newId}`);
      })
      .catch((err) => {
        // 네트워크 에러나 서버 에러 발생 시 처리
        console.error("등록 실패:", err);
        alert("서버 연결에 실패했습니다. 백엔드가 켜져 있는지 확인해 보세요.");
      });

    // (선택) 입력창 초기화 - 이동 후에 실행되므로 상황에 따라 조정 가능
    setTitle("");
    setLocation("");
    setContent("");
    setImageFile(null);
    setPreviewUrl("");
    setPrice(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🛠 무작정 프로젝트 - 관리자 모드</h2>
      <p>새로운 여행 코스를 등록하고 상세 페이지를 구성해보세요.</p>
      <hr />

      <div style={styles.formGroup}>
        <label style={styles.label}>여행지 분류</label>
        <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="domestic">국내 여행지 (Domestic)</option>
          <option value="overseas">해외 여행지 (Overseas)</option>
        </select>

        <label style={styles.label}>📝 여행지 이름</label>
        <input type="text" style={styles.input} placeholder="예: 제주도 서귀포 숲길" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label style={styles.label}>🗺️ 위치 (주소 또는 좌표)</label>
        <input type="text" style={styles.input} placeholder="주소를 입력하세요" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label style={styles.label}>📄 상세 페이지 내용</label>
        <textarea style={styles.textarea} placeholder="상세 내용을 적어주세요." value={content} onChange={(e) => setContent(e.target.value)} />

        <label style={styles.label}>📸 대표 이미지 업로드</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        
        <label style={styles.label}>💰 가격 설정</label>
        <input 
          type="number" 
          placeholder="가격을 입력하세요 (예: 50000)" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} // 문자열을 숫자로 형변환
          style={styles.input}
        />
        
        {/* 미리보기 영역 */}
        {previewUrl && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={previewUrl} alt="미리보기" style={{ width: '100%', maxWidth: '300px', borderRadius: '10px', border: '1px solid #ddd' }} />
          </div>
        )}

        <button style={styles.button} onClick={handleRegister}>
          새 여행지 등록하기
        </button>
      </div>
    </div>
  );
}

export default AdminMain;