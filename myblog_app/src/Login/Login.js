const Login = () =>{
    return(
        <div>
            <form>
                <input
                    type="text"
                    placeholder="아이디"
                    name="userid"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    name="userPw"
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}
export default Login;