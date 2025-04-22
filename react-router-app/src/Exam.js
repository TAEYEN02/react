//URL 파라미터를 사용하여 다국어 지원을 위한 경로 만들기
//Ex) /:lang/home 으로 언어코드를 받아서 해당하는 언어에 맞는 내용을 보여주기
//ex) /eng/home, /kor/home, /jp/home

import { useParams, Navigate,Link,Outlet } from "react-router-dom";



// 컴포넌트 이름은 Home
const Home2 = () => {
    const { lang } = useParams();

    const content = {
        ko: {
            greeting: '안녕하세요!',
            description: '이것은 한국어 페이지입니다.',
        },
        en: {
            greeting: 'Hello!',
            description: 'This is an English page.',
        },
        jp: {
            greeting: 'こんにちは！',
            description: 'これは日本語のページです。',
        },
    };

    const languageContent = content[lang];

    if (!languageContent) {
        alert("잘못된 경로입니다")
        return <Navigate to="/ko/home" />
    }

    return (
        <>
            <ul>
                <li>{languageContent.greeting}</li>
                <li>{languageContent.description}</li>
            </ul>
        </>
    )
}

//상품별 카테고리와 상품 상세 페이지 구현하기
//카테고리별 상품들이 나오게 만들자
//카테고리 경로 : /categories/:categorild
//상품상세경로 : /categories/:categorild/products/:productId

const Categorie = () => {
    const categories = [
        { id: 1, name: '전자제품' },
        { id: 2, name: '의류' },
        { id: 3, name: '식료품' }
    ];
    return (
        <>
            <h2>카테고리</h2>
            <ul>
                {categories.map(c => (
                    <li key ={c.id}>
                        <Link to ={`/categories/${c.id}`}>
                        {c.name}</Link>
                    </li>
                ))}

            </ul>
            <Outlet />
        </>
    )

}

const Product = () => {
    const { categoryId } = useParams();

    const products = [
        { id: 1, name: '노트북', categoryId: '1' },
        { id: 2, name: '스마트폰', categoryId: '1' },
        { id: 3, name: '셔츠', categoryId: '2' },
        { id: 4, name: '청바지', categoryId: '2' },
        { id: 5, name: '사과', categoryId: '3' },
        { id: 6, name: '우유', categoryId: '3' }
    ];

    const filteredProducts = products.filter(p => p.categoryId === categoryId);


        return (
            <>
                <ul>
                    {filteredProducts.map(c => (
                        <li key ={c.id}>
                            <Link to ={`/categories/${c.categoryId}/products/${c.id}`}>
                            {c.name}</Link>
                        </li>
                    ))}
    
                </ul>
            </>
        )
        
}



const ProductDetail = () => {
    const { productId,categoryId } = useParams();
    
    const p_detail = [
        { id: 1, name: '노트북', description: '최신형 노트북입니다.', categoryId: '1' },
        { id: 2, name: '스마트폰', description: '최신 스마트폰입니다.', categoryId: '1' },
        { id: 3, name: '셔츠', description: '멋진 셔츠입니다.', categoryId: '2' },
        { id: 4, name: '청바지', description: '편안한 청바지입니다.', categoryId: '2' },
        { id: 5, name: '사과', description: '신선한 사과입니다.', categoryId: '3' },
        { id: 6, name: '우유', description: '신선한 우유입니다.', categoryId: '3' }
        ];

        const product = p_detail.find(p => p.id.toString() === productId && p.categoryId === categoryId);


 return (
            <>
                <ul>
                  <li>상품명 : {product.name}</li>
                  <li>상세 설명 : {product.description}</li>
                </ul>
            </>
        )

}



export { Home2, Categorie,Product,ProductDetail }


