import { useNavigate } from "react-router-dom";

function MultipleButtons(){
    const navigate = useNavigate();

    const handleButtonClick = (e) => {
        const buttonId = e.target.id;

        switch(buttonId){
            case 'address':
                navigate("/address");
                break;
            case 'member':
                navigate("/member");
                break;
            case 'movie':
                navigate("/movie");
                break;
            case 'map':
                navigate("/map");
                break;
            case 'search':
                navigate("/search");
                break;
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
            <button id="movie" onClick={handleButtonClick}>
                영화 api
            </button>
            <button id="map" onClick={handleButtonClick}>
                지도 api
            </button>
            <button id="search" onClick={handleButtonClick}>
                키워드로 장소 검색하기
            </button>
        </div>
    )
}
export default MultipleButtons;