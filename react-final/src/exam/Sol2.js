import { useEffect, useState } from "react"

export const Sol2 = () => {

    const [number, setNumber] = useState(0);
    const [input, setInput] = useState("");

   

    const upperNumber = () => {
        setNumber(number+1);
        console.log("count 값이 바뀜");
    }

    const InputIn = (e) => {
        setInput(e.target.value);
        console.log("input 값이 바뀜")
    }
    useEffect=(()=>{
        console.log("랜더링 완료");
    },[])


    return (
        <>
            <h2>{number}</h2>
            <button onClick={upperNumber}>+1</button>
            <hr/>
            <input onChange={InputIn}/>
            <p>{input}</p>
        </>
    )
}