import { useEffect, useState } from "react";

export const Posts = ()=>{
    const [error, setError] = useState(false);
    const [lodding, setLodding] = useState(true);
    const [posts, setPosts]= useState([]);

    useEffect(async ()=>{
        const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
        try {
            setPosts(fetchData);
        } catch (error) {
           setError(error.message); 
        }finally{
            setLodding(false);
        }

        fetchData();
    },[])

    if(!error){
        return<p>에러 발생: {error}</p>
    }
    if(lodding){
        return<p>Loading posts…</p>
    }

    return(
        <div>
            <h3>Post</h3>
            <ul>
                {posts.map((post)=>(
                    <li key={post.id}>{post.title}</li>
                ))}
                
            </ul>
        </div>
    )
}