import { useState } from "react"

export const Sol1 = () => {

    const [input, setInput] = useState("");
    const [list, setList] = useState([]);

    const listAdd = (e) => {
        setInput(e.target.value);
    }
    const addList = () => {
        setList(prev => [input, ...prev]);
    }

    return (
        <>
            <input onChange={listAdd} />
            <button onClick={addList}>추가</button>
            <ul>
                {list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

        </>
    )
}