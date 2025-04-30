//컴포넌트 
//UI의 조각
//함수로 이루어져있다
//JSX문법을 이용해서 html을 반환
//하나의 화면을 구현할 수 있는 페이지

import { useEffect } from "react";


//일반함수
// function Counter(){

// }

//화살표 함수
//일반함수 화살표 함수 둘중 하나를 사용할 수 있다
//props => App.js에서 받아온 count 값을 가져오는거(다른 이름으로 쓸 수 있다)
const Counter = (props) => {
    //const Counter = ({count,setCount}) -> 구조분해 할당을 해서 가져올 수도 있다
    const count = props.count;
    const setCount = props.setCount;

    //useEffect(()=>{},[의존성배열]) 훅
    //컴포넌트가 렌더링됐을 때 특정 작업을 수행할 수 있도록 하는 훅
    //컴포넌트가 렌더링될 때 통신을 통해서 데이터를 조회를 해올 때
    //ex) 게시판 - 게시판글에 게시글이 다 나올 수 있도록할때
    //의존성 배열: 없으면 매 렌더링마다 useEffect의 콜백함수가 실행된다
    //[] -> 최초 렌더링시에만 useEffect가 실행됨
    //특정 값을 배열에 넣으면, 그 값들이 변경될 때마다 useEffect가 실행됨.
    useEffect(()=>{
        console.log('useEffect 실행됨')
        //백엔드와 통신하는 코드
    },[count]);

    //JSX
    //HTML 요소들을 JS와 함께 사용하는 문법
    //태그를 변수에 저장할 수 있다
    const element = <h1>hello, JSX</h1>

    const isLoggedIn = true;

    const items= ['사과','바나나','체리'];

    const AddCount = () => {
        setCount(count+1);
    }
    const Minus = ()=>{
        setCount(count-1);
    }
    return(
        //html 코드(화면에서 보게될 ui)
        //<> : JSX Fragment div는 쓰기 싫은데 안의 내용들을 하나로 묶어야 할때
        <>
            {element}
            {/* 조건부 렌더링 */}
            {/* {isLoggedIn ? 참일때 렌더링할 컴포넌트: 거짓일때 렌더링할 컴포넌트} */}
            {/* {isLoggedIn && 컴포넌트} */}
            {/* 앞에가 참이면 컴포넌트실행 / 참이 아니게 되면 실행 안됨 */}
            <ul>
                {/* map메서드를 이용해서 배열에 있는 내용을 출력 */}
                {/* 콜백함수에서 (item,index) => (<li key={index}>{item}</li>)
                콜백함수를 소괄호로 묶으면 안에 있는 내용을 묵시적으로 반환하겠다 */}
                {/* li를 쓸려면 중괄호가 아닌 소괄호 써야함 만약 중괄호를 썼으면 return을 써야함*/}
                {items.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))}
            </ul>
            {/* 스타일을 줄 때는 객체 형식으로 줘야 한다 */}
            <h2 style={{color:'red', fontSize:16}}>{count}</h2>
            {/* 태그에 속성을 줄때 반드시 카멜표기법으로 써야한다 */}
            <button onClick={AddCount}>+</button>
            <button onClick={Minus}>-</button>
        </>
    )

}

//컴포넌트를 생성하고 난 뒤에는 내보내기를 해줘야한다
// export default Counter; import할때 중괄호 안써도 되고, 이름을 마음대로 써도됨
export {Counter}; //내보내기 할 때도 중괄호, import할때도 중괄호, 이름을 맞춰서 써야함
