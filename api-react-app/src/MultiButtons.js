import { useNavigate } from "react-router-dom";

function MultipleButtons(){
    const navigate = useNavigate();

    const handleButtonClick = (e) => {
        const buttonId = e.target.id;

        switch(buttonId){
            case 'address':
                navigate("/address");
            case 'member':
                navigate("/member");
        }
    }

    return(
        <div>
            <button id="address" onClick={handleButtonClick}>
                주소찾기 api
            </button>
            <button id="member" onClick={handleButtonClick}>
                회원가입
            </button>
        </div>
    )
}
export default MultipleButtons;