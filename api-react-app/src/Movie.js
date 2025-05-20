import { useState } from "react";
import axios from "axios";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");



    const handleList = async (e) => {
        e.preventDefault();
        setError(null);

        if (!/^\d{8}$/.test(date)) {
            alert("날짜를 YYYYMMDD 형식으로 입력해주세요. (예: 20240519)");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get(
                "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
                {
                    params: {
                        key: "KEY",
                        targetDt: date,
                    },
                }
            );
            setMovies(response.data.boxOfficeResult.dailyBoxOfficeList);
        } catch (err) {
            setError("결과를 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>🎬 MOVIE </h2>
            <form onSubmit={handleList}>
                <input
                    type="text"
                    placeholder="날짜 입력 (YYYYMMDD)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">조회</button>
            </form>

            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {
                    movies.map((movie) => {
                        return (
                            <li key={movie.movieCd}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "16px",
                                    marginBottom: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.51)",
                                    width: "100%",
                                    maxWidth: "500px",
                                    boxSizing: "border-box"
                                }}>
                                <p>🏆순위: {movie.rank} </p>
                                <p>영화 제목: {movie.movieNm} </p>
                                <p>개봉일: {movie.openDt} </p>
                                <p>매출액: {Number(movie.salesAmt).toLocaleString()}원</p>
                            </li>
                        );
                    })
                }
            </ul>
        </div >
    );
};

export default Movie;
