import { useContext } from "react"
import { UserContext } from "./UserContext"

const GrandChild = () => {
    // useContext(Context객체)
    // 함수의 반환값은 Context의 데이터이벼 
    //Provider에서 전달한 값을 읽어온다.
    //UserContext를 가져왔으니 UserContext안에서 useContext.Provider로 받았던
    //uese과 setUser을 가져올 수 있었던거임
    const {user, setUser} = useContext(UserContext);

    return (
        <>
            <p>name : {user.name}</p>
            <p>age : {user.age}</p>
            <button onClick={()=>{setUser({name:'Jane Dao', age:28})}}>Change User</button>
        </>
    )
}
export {GrandChild}  