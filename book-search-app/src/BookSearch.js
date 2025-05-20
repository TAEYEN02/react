import { useState } from "react";
import axios from 'axios';

function BookSearch() {
    const [books, setBooks] = useState([]);//검색 결과로 얻은 책 목록
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    //네이버 도서 검색 API 호출하는 함수
    const searchBooks = async () => {
        setLoading(true);
        setError(null);

        const clientId = 'TzdG2nxYyFrqktV3sk4c'; // 네이버에서 발급받은 Client ID
        const clientSecret = 'lFjWnil6Bf '; // 네이버에서 발급받은 Client Secret

        try {
            const response = await axios({
                url :'http://localhost:10000/api/books',
                params: {
                    query: query,  // 검색어
                },
            });
            // 검색 결과를 books 상태에 저장
            setBooks(response.data.items);
        } catch (err) {
            setError('도서 검색에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchBooks();
    }

    return (
        <div>
            <h1> 네이버 도서 검색 </h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="책 이름을 입력하세요"
                />
                <button type="submit">검색</button>
            </form>
            <hr />
            <ul>
                {books.map((book) => {
                    <li key={book.isbn}>
                        <img src={book.image} alt={book.title} />
                        <p>제목 : {book.title}</p>
                        <p>저자 : {book.author}</p>
                        <p>출판사 : {book.publisher}</p>
                        <p>가격 : {book.discount ? `${book.discount}원` : '가격정보 없음'}</p>
                        <a href={book.link}>더보기</a>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default BookSearch;