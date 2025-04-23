import { createContext,useState } from "react";

//1. 새로운 Context 생성하기
//createContext라는건 아무 정보없는 컴포넌트
//이 컴포넌트는 상위 컴포넌트에서 컨텍스트(변수)값을 지정하기 위해 사용
export const UserContext = createContext();

//사용자 정보를 관리하고 하위 컴포넌트에 데이터를 제공하기 위한 UserProvider 컴포넌트

export const UserProvider = ({children}) =>{
    //2. 전달하고자하는 내용을 적는다
    const [user,setUser] = useState({name:'John Doe', age : 30});

    return(
        //3. Provider컴포넌트를 이용하여 전달하고 싶은 데이터를 value에 담는다

        // Provider : Context에서 제공하는 특수한 컴포넌트
        //value에 전달하고 싶은 데이터를 적는다.

        <UserContext.Provider value={{user,setUser}}>
            {children} {/*결국 App.js에서는 Parent를 불러왔지만 중간 하나의 컴포넌트가 오류가 생길시 다음 하위에서 안되는 부분에 있어 이런 부분때문에 최종 하위 컴포넌트를 사용할 수 있게 불러올 수 있는 ContextAPI*/}
        </UserContext.Provider>
    )
}
