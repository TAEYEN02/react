import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { Button, Container, Select} from "@mui/material";
import CustomButton from "../component/CustomButton";
import '../css/BoardList.css';
import { BoardContext } from "../context/BoardContext";
import { mockData } from "../mockData";
import WritePost from "./WritePost";

export const BoardList = () => {

    const {boardList, setBoardList} = useContext(BoardContext);
    
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postsPerPage, setPostsPerPage] = useState(3); //한 페이지 보여줄 게시물 개수
    const [totalPages, setTotalPages] = useState(1);//총 페이지수

    const navigate = useNavigate();

    // useEffect(()=>{
    //     //백엔드와 통신하는 척 boardList에 가짜데이터를 넣는다.
    //     setBoardList(mockData);
    //     //게시판의 총 페이지수
    //     setTotalPages(Math.ceil(mockData.length/postsPerPage));
    //     //게시글 개수와, 총 페이지 수가 변할 때 만다 재렌더링
    // },[])

    useEffect(()=>{
        console.log(boardList);
        setTotalPages(Math.ceil(mockData.length/postsPerPage));
        setCurrentPage(1);
    },[postsPerPage,boardList.length]);
    //페이지 계산
    //현재 페이지의 마지막 게시글 인덱스 +1을 구한다.
    //ex) 현재페이지 : 2, 한페이지에 보여줄 게시글: 3
    const indexOfLastPost = currentPage*postsPerPage
    //현재 페이지의 첫번째 게시물의 인덱스
    //ex) 6-3 = 3
    const indexOfFirstPost = indexOfLastPost-postsPerPage
    //indexOfFirstPost부터 indexOfLastPost 미만까지 잘라낸다.
    const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //글쓰기 페이지로 이동
    const handlewritePost = () => {
        navigate("/write");
    }

    const handlePostPerChange = (e) => {
        setPostsPerPage(parseInt(e.target.value));
        setCurrentPage(1);//1페이지로 돌아간다
    }
 
    return (
        <div className="board-container">
            <h1 className="board-title">게시판</h1>
            <div className="board-button">
                <button onClick={handlewritePost}>글쓰기</button>
            </div>
            <br/>
            {/* 목업데이터 출력하기 */}
            <ul className="board-posts">
                {currentPosts.map((board)=>(
                    <li key={board.id} className="board-post-item">
                        <Link to={`/post/${board.id}`}>{board.title}</Link>
                        <span>작성자 : {board.author}</span>
                        <span> | 작성 시간 : {board.writingTime}</span>
                    </li>
                ))}
            </ul>
            {/* 한번에 보여줄 게시물 수 조정 */}
            <div className="board-posts-per-page">
                <label>
                    게시물 수 : {" "}
                    <select value={postsPerPage} onChange={handlePostPerChange}>
                        <option value={3}>3개</option>
                        <option value={5}>5개</option>
                        <option value={10}>10개</option>
                    </select>
                </label>
            </div>
            {/* 이동할 페이징 처리 */}
            <div className="board-pagination">
                {/* 1. Arrays(totalPages) : 전체 페이지만큼 방을 가지는 배열 생성
                    2. .keys() : 0 부터 totalPages-1까지 인덱스 이터레이터가 생성된다.
                    3. ...으로 펼쳐서 [0,1,2,3,...totalPages-1] 형태의 배열을 얻는다.
                    4. map((number)=>...) 각 number에 대해 버튼을 생성한다
                */}
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number+1}
                        className={currentPage === number+1 ? "selected" : ""}
                        onClick={()=>paginate(number+1)}
                    >
                        {number+1}
                    </button>
                    
                ))}
            </div>

        </div>
    );
}