import { useState,useEffect } from "react";

const Count = () => {
    const [count, setCount] = useState(0);
    const [rander, setRander] = useState(0);

    const clickButton = () => {
        if(clickButton){
            setCount(count+1);
        }
    }
    
    useEffect(()=>{
           setRander(rander + 1)
           console.log("랜더링 완료")
    },[count])
  

    return(
        <div>
            <h2>Count : {count}</h2>
            <h2>랜더링 횟수 : {rander}</h2>
            <button onClick={clickButton}>클릭</button>
        </div>
        
    )
}
export default Count;