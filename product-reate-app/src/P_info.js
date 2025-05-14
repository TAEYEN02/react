import React, { useState, useEffect } from 'react';
import './css/styles.css';
import { call } from './service/ApiService';
import {AddProduct} from './AddProduct';
import OrderInfo from './order_info';
import './css/styles.css'

function P_info() {
    const [items, setItems] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [orderCount, setOrderCount] = useState('');
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [selected, setSelected] = useState(null);
    const [editForm, setEditForm] = useState({ p_name: '', p_price: '', p_count: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        call('/product', 'GET')
            .then(result => setItems(result.data))
            .catch(error => console.error('상품 불러오기 실패:', error));
    };

    const addItem = (item) => {
        call("/product", "POST", item).then(() => {
            setOpenForm(false);
            loadProducts();
        });
    };

    const handleRadioChange = (index) => {
        setSelectedIndex(index);
        setOrderCount('');
    };

    const handleOrderCountChange = (e) => {
        setOrderCount(e.target.value);
    };

    const orderProduct = () => {
        if (selectedIndex !== null && orderCount > 0 && items[selectedIndex]) {
            const orderData = {
                productId: items[selectedIndex].productId,
                productCount: parseInt(orderCount)
            };
            call("/orders", "POST", orderData)
                .then(() => {
                    alert("주문이 완료되었습니다!");
                    loadProducts();
                });
        } else {
            alert("상품을 선택하고 주문 개수를 입력하세요.");
        }
    };

    const showOrderDetails = () => {
        setShowOrderInfo(!showOrderInfo);
    };

    const handleRowClick = (product, index) => {
        setSelected(product);
        setEditForm({
            p_name: product.productName,
            p_price: product.productPrice,
            p_count: product.productStock
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        if (!selected) return;
        call(`/product/${selected.productId}`, 'PUT', {
            ...selected,
            productName: editForm.p_name,
            productPrice: editForm.p_price,
            productStock: editForm.p_count
        }).then(() => {
            alert("수정 완료!");
            setSelected(null);
            loadProducts();
        });
    };

    return (
        <div className="container">
            <h1>상품 관리</h1>
            <button onClick={() => setOpenForm(!openForm)}>
                {openForm ? "상품 추가 닫기" : "상품 추가"}
            </button>

            {openForm && <AddProduct add={addItem} />}

            {items.length === 0 ? (
                <p>상품이 없습니다.</p>
            ) : (
                <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>주문 개수</th>
                            <th>상품 번호</th>
                            <th>상품 이름</th>
                            <th>상품 재고</th>
                            <th>상품 가격</th>
                            <th>등록 날짜</th>
                            <th>수정 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={item.productId}
                                onClick={() => handleRowClick(item, index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    <input
                                        type="radio"
                                        name="productId"
                                        checked={selectedIndex === index}
                                        onChange={() => handleRadioChange(index)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={selectedIndex === index ? orderCount : ''}
                                        onChange={handleOrderCountChange}
                                        readOnly={selectedIndex !== index}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.productStock}</td>
                                <td>{item.productPrice}</td>
                                <td>{item.registerDate}</td>
                                <td>{item.updateDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: '10px' }}>
                <button onClick={orderProduct}>주문 완료</button>
                <button onClick={showOrderDetails}>주문 내역</button>
            </div>

            {selected && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>상품 수정 (상품번호: {selected.productId})</h3>
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

            {showOrderInfo && <OrderInfo />}
        </div>
    );
}

export default P_info;
