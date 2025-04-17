import React from "react";

export function Greeting({name="김철수"}){
    return <h1>Hello, {name}!</h1>
}


//데이터가 props로 넘어오면 {}는 무시하고 {name : "홍길동"}이된다
export function Farewell(props ={}){
    //(props에 값이 들어갔다는 얘기는 App.js 에서 <Farewell name="홍길동"/>이 선언되었을때)
    //props에 값이 들어있으면 김철수는 무시하고 홍길동으로 들어간다
    //구조분해 할당에서 =은 대입연산자의 역할이 아니라 기본값을 표기하는 역할
    //{x=y} x에 값이 없으면 y를 넣는다는 조건부 대입


    const {name = "김철수"}= props;
    //기본적으로 props로 넘어온 데이터들은 읽기 전용이지만
    //수정하고 싶다면 state를 이용해서 바꾸면 된다.
    // const [name,setName] = useState(props.name);

    return(
        <div>
            <h1>Good,Bye,{name}</h1>
        </div>
        
    );
}
