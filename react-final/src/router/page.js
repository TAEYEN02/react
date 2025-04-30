import { useParams } from "react-router"

export const Home = () => {

    return(
        <>
            <h1>Home 화면입니다</h1>
        </>
    )
}

export const About = () => {

    return(
        <>
            <h1>설명 화면입니다</h1>
        </>
    )
}
export const Users =() =>{
    //동적 라우팅으로 넘어오는 값을 받는법
    //localhost:3000/users/1
    const {id} = useParams();
    return <p> 사용자 Id : {id}</p>
}

export const Settings = () => {
    return(
        <h1>설정 화면입니다</h1>
    )
}

export const OverView = () => {
    return(
        <h1>개요 화면 입니다</h1>
    )
}
