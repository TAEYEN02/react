const { useState, useEffect } = require("react")

export const Sol3 = () =>{
    const [count, setCount]= useState(0);
    const [number, setNumber] = useState(0);

    useEffect(()=>{
        console.log("랜더링 완료")
        setNumber(number+1);
    },[count])

    const landering = () => {
        setCount(count+1);
    }

    return (
        <>
            <h3>Count : {count}</h3>
            <h3>랜더링 횟수 : {number}</h3>
            <button onClick={landering}>클릭</button>
        </>
    )
}