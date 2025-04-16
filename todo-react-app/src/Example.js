import { useState } from "react"
let Example= () => {
    const [message, setMessage] = useState("Hello, World");
    const [name, setName] = useState("홍길동");
    const [count, setCount] = useState(0);
    return (
        
        <div>
            <p>{message} / {name}</p>
            {/*상태는 무조건 setter를 이용하여 변경해야 한다 */}
            <button onClick={() =>{ 
            if(message === "Hello, World"){
                setMessage("Hello, React");
            }else{
                setMessage("Hello, World");
            }
            }}>Change message</button>

            <p>Count: {count}</p>
            <button onClick={()=>setCount(count+1)}>Increase</button>
        </div>
    )
}
export default Example;