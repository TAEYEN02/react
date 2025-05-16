import { useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import '../css/BoardList.css';
import { BoardContext } from "../context/BoardContext";
import api from "../api/api";

export const BoardList = () => {

    const { boardList, setBoardList } = useContext(BoardContext);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postsPerPage, setPostsPerPage] = useState(3); //한 페이지 보여줄 게시물 개수
    const [totalPages, setTotalPages] = useState(1);//총 페이지수

    // --- 검색 상태 추가 ---
    const [searchType, setSearchType] = useState("title");
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const fetchBoardList = async () => {
        try {
            const response = await api.getBoards({ searchType, keyword });
            setBoardList(response.data);
            setSelectedIds([]);
            setCurrentPage(1); // 검색 시 페이지 1로 초기화
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
            alert("게시글을 불러오는 데 실패했습니다.");
        }
    };

    // 처음 로딩 시, 또는 검색 조건 변경 시 게시글 불러오기
    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                const { data } = await api.getBoards({ searchType, keyword });
                setBoardList(data);
            } catch (err) {
                console.error("게시글 불러오기 실패:", err);
            }
        };
        fetchBoardList();
    }, [searchType, keyword]);


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

    const handleSearch = () => {
        fetchBoardList();
    };

    return (
        <div className="board-container">
            <h1 className="board-title">게시판</h1>

            <div style={{ marginBottom: "20px" }}>
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ marginRight: "10px" }}
                >
                    <option value="title">제목</option>
                    <option value="author">작성자</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleSearch}>검색</button>
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
                        {currentPosts.map((board) => (
                            <li key={board.id} className="board-post-item">
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