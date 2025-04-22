import { useState,useEffect } from "react";

//useEffect() 
//함수형 컴포넌트에서 컴포넌트가 렌더링 되거나, 특정 state의 값이 바뀌었을때
//처리하고 싶은 내용을 자동으로 수행하는 훅
//첫번째 인자 : useEffect()가 호출됐을 때 처리하고 싶은 내용
//두번째 인자 : 의존성 배열
//생략하면 매 렌더링마다 실행
//빈 배열이면 컴포넌트 마운트 시 한번만 실행
//값을 하나 이상 넣으면, 그 값이 바뀔 때마다 실행
const TimerFunction = () => {
    const [time, setTime] =useState(0);

    useEffect(()=>{
        // setInterval : 일정한 시간 간격으로 지정된 함수를 반복적으로 실행
        const timer = setInterval(() => {
            setTime((Prev) => Prev+1);
        },1000);

        //클린업 함수
        return () => {
            clearInterval(timer);
        }
    },[]);

    //클린업 함수(선택사항)
    return(
        <div>
            <h1>Timer : {time} sec</h1>
        </div>
    )
}

//외부에서 데이터를 불러와 화면에 출력해주는 예제
//fetch()함수를 사용하기
//브라우저를 제공하는 네트워크 요청 인터페이스
export const UserList = () =>{
    const [users, setUsers] = useState([]); //유저데이터를 담기위한 상태
    const [loading, setLoading] =useState(true); //로딩상태
    const [error, setError] =useState(null);//에러상태

    //화면이 떴을때 유저목록이 이미 보여야한다
    useEffect(()=>{
        //async : 이 함수를 비동기 함수로 만들겠다
        //비동기처리 : 특정 작업이 완료되기를 기다리면서도 다른 작업을 계속 실행할 수 있는 방식
        //await : 비동기 함수 안에서만 쓸 수 있는 함수
        //await이 붙은 함수가 종료될 때까지 비동기 함수는 잠깐 멈춘다
        const fetchUsers = async()=>{
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                
                if(!response.ok){
                    throw new Error(`HTTP 오류 상태 : ${response.status}`)
                }
                
                //통신에 문제가 없었다
                const data = await response.json();
                setUsers(data);

            } catch (err) {
                setError(err);
            }finally{
                setLoading(false);
            }
        }

        fetchUsers();
    },[]);

    if(loading){
        return <div>로딩 중 ...</div>
    }
    if(error){
        return<div>에러발생 : {error.message}</div>
    }
    return(
        <div>
            <h2>사용자 목록</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TimerFunction;

//props => let props = {value:"hi"}
//{value} => value = "h1"

export const Cleanup = (props) => {
    //App에서 value를 받아  화면에 출력

    //외부에서 가져온 값은 읽기 전용이라 
    //수정하고 싶으면 값을 다시 state에 담아야한다.

    const [value, setValue] = useState(props.value);

    useEffect(()=>{
        console.log(`▶ 이펙트 실행 : ${value}`);

        return () =>{
            console.log(`■ 정리(cleanup) : ${value}`);
        }
    },[value])

    return(
        <div>
            <p>현재 value : {value}</p>
            <button onClick={()=>setValue(v => v+1)}>버튼</button>
        </div>
    )
}