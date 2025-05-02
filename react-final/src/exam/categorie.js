import { Link, useParams } from "react-router";

export const Categorie = () =>{
    const categories = [
        { id: 1, name: '전자제품' },
        { id: 2, name: '의류' },
        { id: 3, name: '식료품' },
    ];

    return(
        <>
            <h3>카테고리</h3>
            <ul>
                {categories.map((category)=>(
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export const Products = () =>{

    const {categoryId} = useParams();

    const products = [
        { id: 1, name: '노트북', categoryId: '1' },
        { id: 2, name: '스마트폰', categoryId: '1' },
        { id: 3, name: '셔츠', categoryId: '2' },
        { id: 4, name: '청바지', categoryId: '2' },
        { id: 5, name: '사과', categoryId: '3' },
        { id: 6, name: '우유', categoryId: '3' },
    ];

    const filteredProducts = products.filter(product => product.categoryId===categoryId);
    
    return(
        <>
            <h3>카테고리 {products.categoryId}의 상품 목록</h3>
            <ul>
                {filteredProducts.map((product)=>(
                    <li key={product.id}>
                        <Link to={`/categories/${product.categoryId}/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
    
}

export const Pdetail = () => {
    const p_detail = [
        { id: 1, name: '노트북', description: '최신형 노트북입니다.', categoryId: '1' },
        { id: 2, name: '스마트폰', description: '최신 스마트폰입니다.', categoryId: '1' },
        { id: 3, name: '셔츠', description: '멋진 셔츠입니다.', categoryId: '2' },
        { id: 4, name: '청바지', description: '편안한 청바지입니다.', categoryId: '2' },
        { id: 5, name: '사과', description: '신선한 사과입니다.', categoryId: '3' },
        { id: 6, name: '우유', description: '신선한 우유입니다.', categoryId: '3' },
        ];
    const {categoryId,productId} = useParams();
    
    const product = p_detail.find(
        item => item.id === Number(productId) && item.categoryId === categoryId
    )

    return(
        <>
            <h3>{product.name}</h3>
            <p>카테고리 ID : {product.categoryId}</p>
            <p>상품 ID : {product.id}</p>
            <p>설명 :{product.description} </p>
        </>
    )
} 