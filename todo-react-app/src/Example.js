import { useState } from "react"
let Example= () => {
    const [message, setMessage] = useState("Hello, World");
    return (
        
        <div>
            <p>{message}</p>
            {/*상태는 무조건 setter를 이용하여 변경해야 한다 */}
            <button onClick={() => setMessage("Hello, React")}>Change message</button>
        </div>
    )
}
export default Example;