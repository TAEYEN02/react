import { useState, useEffect, useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../component/CustomButton";

const PostDetail = () => {

    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const [item, setItem] = useState({});
    const navigate = useNavigate();

    const { boardList, setBoardList } = useContext(BoardContext);
    //id를 통헤 boardList에 들어있는 게시글 한건을 꺼내서
    //화면에 출력하기
    //useEffect()사용하기

    useEffect(() => {
        const selected = boardList.find((post) => post.id === Number(id));
        if (selected) {
            setItem(selected);
        }
    }, [id, boardList]);

    const moveToEdit = (e) => {
        e.preventDefault();
        const updatedTitle = item.title;
        const updatedContent = item.content;

        if (!updatedTitle || !updatedContent) return;

        const updatedList = boardList.map(post => {
            if (post.id === item.id) {
                return {
                    ...post,
                    title: updatedTitle,
                    content: updatedContent,
                    writingTime: new Date().toLocaleString()
                };
            } else {
                return post;
            }
        });

        setBoardList(updatedList);
        alert("수정되었습니다!");
        navigate("/");
    };

    const handleDelete = () => {
        if(!window.confirm("정말 삭제하시겠습니까?")) return
        const deletList = boardList.filter(post => post.id !== item.id);
        setBoardList(deletList);
        navigate("/");
    }
    const moveToBoard = () => {
        navigate("/");
    }
    return (
        <div>
            <h2 className="board-detail-title">{item.title}</h2>
            <div className="board-detail-info">
                <h5>작성자 : {item.author}</h5>
                <p style={{ fontSize: "12px", color: "gray" }}>{item.writingTime}</p>
            </div>
            <hr />
            <p className="board-detail-body">{item.content}</p>
            <hr />
            <div>
                <CustomButton label="수정" onclick={moveToEdit} />
                <CustomButton label="삭제" color="secondary" onclick={handleDelete} />
                <CustomButton label="목록으로" variant="outlined" onclick={moveToBoard} />
            </div>
        </div>
    )
}
export default PostDetail;