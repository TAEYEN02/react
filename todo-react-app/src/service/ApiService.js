import axios from 'axios'
import { API_BASE_URL } from '../api-config'

//요청하는 메서드를 만들것이다.
//api : 호출할 API의 경로(/todo, /users)
//method : HTTP메서드(GET,POST,PUT,DELETE)
//request : 요청에 담을 데이터(주로 POST,PUT에서 사용)
export async function call(api,method,request){
    //기본 옵션 설정
    let options = {
        url : API_BASE_URL+ api,
        method : method,
        headers:{
            "Content-Type":"application/json"
        }
    }

    //false,0,빈문자열,null,undeifned,NaN -> false로 취급
    if(request){
        //JSON.stringify() : 객체를 JSON문자열로 변환 
        options.data = JSON.stringify(request);
    }

    //앞서 설정한 options객체를 사용하여 axios로 HTTP요청을 보낸다.
    try {
        const response = await axios(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("에러코드 : " + error.status);
        if (error.status === 403) {
            window.location.href = "/login";
        }
    }
}

export const signin = async (userDTO)=> {
    const response = await call("/auth/signin", "POST", userDTO);
    console.log("response : " + response);
    alert("로그인 토큰: " + response.token);
}