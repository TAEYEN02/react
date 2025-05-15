import { useContext, useState } from "react";
import CustomButton from "../component/CustomButton";
import CustomInput from "../component/CustomInput";
import { useNavigate } from "react-router-dom";
import { BoardContext } from "../context/BoardContext";

const WritePost = () => {
    const {boardList, setBoardList} = useContext(BoardContext);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const savePost = (e) => {
        e.preventDefault();
        const newPost = {
            id: boardList.length+1,
            title,
            author,
            writingTime:new Date().toISOString(),
            content,
        };

        setBoardList([...boardList,newPost]);
        alert("글이 저장되었습니다!"); 
        navigate("/");
    };

    const backtoBoard = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>글쓰기</h1>

            <form>
                <CustomInput
                    label="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <CustomInput
                    label="작성자"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <CustomInput
                    label="내용"
                    multiline
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div>
                    <CustomButton label="저장" onclick={savePost} />
                    <CustomButton label="취소" variant="outlined" color="secondary" onclick={backtoBoard} />
                </div>

            </form>



        </div>

    );
};

export default WritePost;
