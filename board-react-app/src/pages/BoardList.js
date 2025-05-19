import { useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import '../css/BoardList.css';
import { BoardContext } from "../context/BoardContext";
import api from "../api/api";
import { apiClient } from "../service/api-config";
import LogoutButton from "../component/LogoutButton";

export const BoardList = () => {

    const { boardList, setBoardList } = useContext(BoardContext);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postsPerPage, setPostsPerPage] = useState(3); //한 페이지 보여줄 게시물 개수
    const [totalPages, setTotalPages] = useState(1);//총 페이지수
    const [searchType, setSearchType] = useState("id");
    const [searchValue, setSearchValue] = useState(""); // 검색어


    const placeholders = {
        id: "ID 입력",
        title: "제목 입력",
        author: "저자 입력",
    };

    const navigate = useNavigate();

    useEffect(() => {
        setTotalPages(Math.ceil(boardList.length / postsPerPage));
        setCurrentPage(1);
    }, [postsPerPage, boardList.length]);

    //페이지 계산
    //현재 페이지의 마지막 게시글 인덱스 +1을 구한다.
    //ex) 현재페이지 : 2, 한페이지에 보여줄 게시글: 3
    const indexOfLastPost = currentPage * postsPerPage
    //현재 페이지의 첫번째 게시물의 인덱스
    //ex) 6-3 = 3
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    //indexOfFirstPost부터 indexOfLastPost 미만까지 잘라낸다.
    const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost);

    // 체크박스 선택/해제 함수
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // 전체 선택/해제 함수
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = currentPosts.map((post) => post.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // 선택된 게시글 삭제 함수
    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }

        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await api.deletePostsBulk(selectedIds);
            // 삭제 후 상태 업데이트
            setBoardList(boardList.filter(post => !selectedIds.includes(post.id)));
            setSelectedIds([]);
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };


    // 페이징 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 글쓰기 페이지 이동
    const handleWritePost = () => {
        navigate("/write");
    };

    const handlePostPerChange = (e) => {
        setPostsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchButton();
        }
    };

    const searchButton = async () => {
        if (!searchValue) {
            alert("검색어를 입력하세요.");
            return;
        }

        try {
            let response;

            if (searchType === "id") {
                response = await apiClient.get(`/api/board/id/${searchValue}`);
                setBoardList([response.data]);
            } else if (searchType === "title") {
                response = await apiClient.get(`/api/board/title/${searchValue}`);
                setBoardList(response.data);
            } else if (searchType === "author") {
                response = await apiClient.get(`/api/board/author/${searchValue}`);
                setBoardList(response.data);
            }

            setCurrentPage(1);
        } catch (error) {
            console.error("검색 오류:", error);
            alert("검색 결과가 없습니다.");
            setBoardList([]); // 실패 시 비우기
        }
    };

    return (
        <div className="board-container">
             <LogoutButton />
            <h1 className="board-title">게시판</h1>

            <div className="board-button" style={{margin:"10px"}}>
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ marginRight: "10px" }}
                >
                    <option value="id">아이디</option>
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                </select>

                <input
                    type="text"
                    placeholder={placeholders[searchType]}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={searchButton} style={{ marginLeft: "10px" }}>
                    찾기
                </button>
            </div>


            <div className="board-button">
                <button onClick={handleWritePost}>글쓰기</button>
                <button onClick={handleDeleteSelected} style={{ marginLeft: "10px" }}>
                    선택 삭제
                </button>
            </div>
            <br />
            <ul className="board-posts">
                {boardList.length === 0 ? (
                    <li className="no-posts-message">게시글이 등록된게 없습니다.</li>
                ) : (
                    <>
                        <li>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={
                                    currentPosts.length > 0 &&
                                    selectedIds.length === currentPosts.length
                                }
                            />
                            <strong style={{ fontSize: '12px' }}> 전체 선택</strong>
                        </li>
                        {currentPosts.map((board,index) => (
                            <li key={board.id} className="board-post-item">
                                <span className="index-number">{(currentPage - 1) * postsPerPage + index + 1}</span>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(board.id)}
                                    onChange={() => handleCheckboxChange(board.id)}
                                />
                                <Link to={`/post/${board.id}`}>{board.title}</Link>
                                <span>작성자 : {board.author}</span>
                                <span> | 작성 시간 : {board.writingTime}</span>
                            </li>
                        ))}
                    </>
                )}
            </ul>
            <div className="board-posts-per-page">
                <label>
                    게시물 수 :{" "}
                    <select value={postsPerPage} onChange={handlePostPerChange}>
                        <option value={3}>3개</option>
                        <option value={5}>5개</option>
                        <option value={10}>10개</option>
                    </select>
                </label>
            </div>
            <div className="board-pagination">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        className={currentPage === number + 1 ? "selected" : ""}
                        onClick={() => paginate(number + 1)}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};