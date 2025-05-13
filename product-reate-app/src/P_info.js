import { useEffect, useState } from 'react';
import { call } from './service/ApiService'; 
import { AddProduct } from './AddProduct';

export function P_info() {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [item, setItems]= useState([]);
    const [form ,setForm] = useState(false);
    const [selected, setSelected] = useState(null); 
    const [editForm, setEditForm] = useState({ p_name: '', p_price: '', p_count: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        call('/Products', 'GET')
            .then((data) => {
                setProducts(data.data || []); 
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false); 
            });
    };

    const add = (item) => {
        call("/Products", "POST", item)
            .then(() => {
                setItems([]);
                loadProducts(); // 목록 갱신
            });
    };

    const handleRowClick = (product) => {
        setSelected(product);
        setEditForm({
            p_name: product.p_name,
            p_price: product.p_price,
            p_count: product.p_count
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        if (!selected) return;
        call(`/Products/${selected.p_id}`, 'PUT', {
            ...selected,
            ...editForm
        }).then(() => {
            alert("수정 완료!");
            setSelected(null);
            loadProducts(); // 목록 갱신
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>상품 목록</h1>
           
            <button onClick={() => setForm(!form)}>
                {form ? "입력 폼 닫기" : "상품 추가"}
            </button>

            {form && <AddProduct add={add} />}
            {products.length === 0 ? (
                <p>상품이 없습니다.</p>
            ) : (
                <table className="product-table" style={{border: '1px solid black', borderCollapse: 'collapse', width: '100%'}}>
                    <thead style={{border:'1px solid'}}>
                        <tr>
                            <th>상품번호</th>
                            <th>상품이름</th>
                            <th>상품재고</th>
                            <th>상품가격</th>
                            <th>등록날짜</th>
                            <th>수정날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.p_id} onClick={() => handleRowClick(product)} style={{ cursor: 'pointer' }}>
                                <td>{product.p_id}</td>
                                <td>{product.p_name}</td>
                                <td>{product.p_count}</td>
                                <td>{product.p_price}</td>
                                <td>{new Date(product.p_create_date).toLocaleDateString()}</td>
                                <td>{new Date(product.p_update_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selected && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>상품 수정 (상품번호: {selected.p_id})</h3>
                    <input
                        type="text"
                        name="p_name"
                        value={editForm.p_name}
                        onChange={handleChange}
                        placeholder="상품 이름"
                    />
                    <input
                        type="number"
                        name="p_count"
                        value={editForm.p_count}
                        onChange={handleChange}
                        placeholder="상품 재고"
                    />
                    <input
                        type="number"
                        name="p_price"
                        value={editForm.p_price}
                        onChange={handleChange}
                        placeholder="상품 가격"
                    />
                    <button onClick={handleUpdate}>수정</button>
                    <button onClick={() => setSelected(null)}>취소</button>
                </div>
            )}
        </div>
    );
};
