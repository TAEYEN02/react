import { useEffect, useRef, useState } from "react";
//useRef() 훅
//변경가능한 객체 하나를 생성을 해준다
//반환된 객체는 {current : 값} 형태이고, 컴포넌트의 전체 생명주기동안
//같은 객체를 유지한다\

//const refContainer = useRef(0);
//const refContainer = {current : 0}

//주요 특징
//1. 값저장
//렌더링 사이에 값을 기억해두고 싶을 때 사용한다
//값이 바뀌어도 리렌러링을 발생시키지 않는다

//2. DOM 접근
//JSX로 작성한 요소를 ref속성으로 연결해주면, 해당 DOM노드에 
//직접 접근할 수 있다

export const Counter = () => {
    const countRef = useRef(0);

    const onClick = () => {
        countRef.current +=1;
        console.log(`현재 카운트 : ${countRef.current}`)
    }
    return(
        <div>
            <h1>{countRef.current}</h1>
            <button onClick={onClick}>증가</button>
        </div>
    )
}

//DOM 접근 예시 
export const InputFocus = () => {
    //inputEl = {current :<input ref={inputEl} placeholder="여기에 입력해 보세요" />};
    const inputEl = useRef(null);

    useEffect(()=>{
        //화면이 랜더링 되면 input태그에 focus를 줘서 바로 입력
        inputEl.current.focus();
    },[])

    return(
        <div>
            <input ref={inputEl} placeholder="여기에 입력해 보세요" />
        </div>
    )
}

//InputSample
//이름과 닉네임을 입력하는 필드를 만든다
//이름과 닉네임을 입력하면 밑에 띄운다
//초기화 버튼을 만들고 버튼을 누를시 이름 입력필드에 포커스가 가도록 만들기

export const InputSample = () => {
    const inputName = useRef(null);
    const inputNickName = useRef(null);

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(()=>{
        inputName.current.focus();
    },[])

    const inputPerson=(e)=>{
        const {name, value} = e.target;

        if(name ==='name'){
            setName(value);
            console.log(`name : ${name}`);
        } else if (name === 'nickname') {
            setNickname(value);
            console.log(`Nickname : ${nickname}`);
          }
    }

    const cleanBtn =()=>{
        setName('');
        setNickname('');
        inputName.current.focus();
    }

    return(
        <div>
            <input 
                name = "name"
                placeholder="이름 입력"
                value={name} 
                onChange={inputPerson}
                ref={inputName} />
            <input 
                name = "nickname"
                placeholder="닉네임 입력"
                value={nickname}
                onChange={inputPerson}
                ref={inputNickName}  />
            <button onClick={cleanBtn}>초기화</button>
            <p>이름 :  {name}  ({nickname})</p>
            
        </div>
    )
}
