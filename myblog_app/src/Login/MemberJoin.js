const MemberJoin = ()=>{
    return(
        <div className="member-container">
            <h3>회원가입</h3>
            <form className="member-form">
                <input  
                    type="text"
                    name="userId"
                    placeholder="아이디"
                />
                <input  
                    type="password"
                    name="userPw"
                    placeholder="비밀번호"
                />
                <input
                    type="password"
                    name="userPwSame"
                    placeholder="비밀번호확인"
                />
                <input 
                    type="text"
                    name="userName"
                    placeholder="이름"
                />
                <input
                    type="email"
                    name="userEmail"
                    placeholder="이메일"
                />
                <button type="submit">가입하기</button>
            </form>
        </div>
    )
}
export default MemberJoin;