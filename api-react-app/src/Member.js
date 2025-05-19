import { useState } from "react";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Member = () => {
  const open = useDaumPostcodePopup();

  const [form, setForm] = useState({
    userId: "",
    password: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddress = () => {
    open({
      onComplete: (data) => {
        setForm((prev) => ({ ...prev, address: data.address }));
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/member", form);
      alert("회원가입이 완료되었습니다.");
      setForm({ userId: "", password: "", address: "", email: "" });
    } catch (err) {
      console.error(err);
      alert("에러가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-80 mx-auto mt-10">
      <h3 className="text-xl font-semibold text-center mb-4">회원가입</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={form.userId}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="address"
            placeholder="주소"
            value={form.address}
            readOnly
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={handleAddress}
            className="border rounded px-3"
          >
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
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Member;