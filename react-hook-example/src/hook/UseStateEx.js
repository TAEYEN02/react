//usestate훅을 사용하기 위해서는 import를 해줘야한다
import { useState } from "react";

//컴포넌트 생성하기
//하나의 파일에 하나의 컴포넌트만 만들수도 있지만
//여러개의 컴포넌트를 정의할 수도 있다.
let Counter = (props) =>{
    
    //hook은 항상 함수형컴포넌트 안에서 사용할 수 있다.
    //usestate()는 상태값과 상태값을 바꾸는 함수 두가지를 요소로 갖는 배열을 반환한다
    //반환한 배열을 구조분해할당을 통해서 받는다

    //매개변수로 읽어온 값을 변경하기 위해서는 state로 관리를 해야한다
    const [count,setcount] = useState(props.count);

    // let handleClick = () => {
    //     setcount(count+1);
    // }
    //함수를 정의하고 호출하던지
    //화살표함수를 이용해서 호출하던지
    return(
        <div>
            <h1>{count}</h1>
            <button onClick={()=>setcount(count+1)}>up</button>
        </div>
    )
}
// 컴포넌트를 외부에서 import하기 위해서는 반드시 export가 선행되어야 한다
export default Counter;
//모듈당 1개만 허용 import할때 {}안해도 됨,
//import할 때 이름 마음대로 지정가능

// export {Counter};
//named export
//모듈당 여러개를 내보낼 수 있다.
//import할 때도 export할때 쓰던 이름을 {}안에 정확히 맞춰 써야한다
//as를 써서 별칭(alias)를 붙힐 수 있다.













