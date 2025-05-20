import { useState, useEffect } from "react";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import "./Member.css";

const api = axios.create({ baseURL: "http://localhost:10000" });

const Member = () => {
  const open = useDaumPostcodePopup();

  /** 폼 입력값 */
  const [form, setForm] = useState({
    userId: "",
    password: "",
    address: "",
    email: "",
  });

  const [members, setMembers] = useState([]);


  const fetchMembers = async () => {
    try {
      const res = await api.get("/member");
      setMembers(res.data);
    } catch (err) {
      console.error("목록 조회 실패:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /** 인풋 변경 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** 주소 검색 */
  const handleAddress = () => {
    open({
      onComplete: (data) => {
        setForm((prev) => ({ ...prev, address: data.address }));
      },
    });
  };

  /** 제출 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/member", form);      
      alert("회원가입이 완료되었습니다.");
      setForm({ userId: "", password: "", address: "", email: "" });
      fetchMembers();                        
    } catch (err) {
      console.error(err);
      alert("에러가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  return (
    <div className="member-container">
      <h3>회원가입</h3>

      {/* ------- 가입 폼 ------- */}
      <form onSubmit={handleSubmit} className="member-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className="address-group">
          <input
            type="text"
            name="address"
            placeholder="주소"
            value={form.address}
            readOnly
          />
          <button type="button" onClick={handleAddress}>
            찾기
          </button>
        </div>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">가입하기</button>
      </form>

      <hr/>
      {members.length > 0 && (
        <>
          <hr style={{ margin: "30px 0" }} />
          <h4 style={{ marginBottom: "10px", fontWeight: 600 }}>회원 목록</h4>
          <table className="member-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이메일</th>
                <th>주소</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.userId}>
                  <td>{m.userId}</td>
                  <td>{m.email}</td>
                  <td>{m.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Member;
