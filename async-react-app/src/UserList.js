//fetch를 사용하여, 외부 api에서 데이터를 가져와 화면에서 렌더링하는 프로그램 만들기

//외부 api를 호출하여 데이터를 가져온다
//데이터를 가져오는 동안 로딩 상태를 표시한다
//api 요청 실패시, 에러 메시지를 표시해야한다
//가져온 데이터를 화면에 목록 형태로 출력해야한다
//사용자의 이름과 이메일 주소를 출력해주세요

import { useState,useEffect } from "react";

export const UseList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
        const fetchData = async () =>{
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => {
                    if(!response.ok){
                        throw new Error('데이터를 불러오는데 실패했습니다');
                    }  
                    return response.json();
                })
                .then((data)=>{
                    setUser(data);
                })
                .catch((error)=>{
                    setError(error.message);
                })
                .finally(()=>{
                    setLoading(false);
                })
        }
        fetchData();

    },[]);

    if(loading){
        return <p>로딩 중.....</p>
    }

    if(error){
        return <p>에러발생 : {error}</p>
    }

    return(
        <div>
            <h1>User 목록</h1>
            <ul>
                {user.map((user)=>(
                    <li key={user.id} style={{listStyle:"-moz-initial"}}>
                        {user.name} : {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}