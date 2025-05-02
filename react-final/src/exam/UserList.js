import { useEffect, useState } from "react"

export const UserList = () => {
    const [users, setUsets] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () =>{ 
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if(!response.ok){
                    throw new Error('데이터를 불러오눈데 실패했습니다')
                }
                const data = await response.json();
                setUsets(data)
            } catch (error) {
                setError(error.message)
            }finally{
                setLoding(false)
            }
        }
        fetchData();
    }, []);
    

    if(loading){
        return<p>로딩중 ...</p>
    }
    if(error){
        return<p>에러 발생 : {error}</p>
    }

    return (
        <>
            <h1>사용자 목록</h1>
            <ul>
                {users.map((user)=>(
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </>
    )

}