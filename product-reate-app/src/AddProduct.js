import { useState } from "react";

export const AddProduct = ({ add }) => {
    const [item, setItems] = useState({
        p_name: "",
        p_count: "",
        p_price: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setItems((prevItem) => ({
            ...prevItem,
            [id]: value
        }));
    };

    const onButtonClick = () => {
        if (item.p_name && item.p_count && item.p_price) {
            add(item);
            setItems({ p_name: "", p_count: "", p_price: "" }); 
            
        } else {
            alert("모든 필드를 채워주세요!");
        }
    };

    return (
        <div>
            <input
                id="p_name"
                type="text"
                placeholder="상품 이름"
                value={item.p_name}
                onChange={handleChange}
            />
            <input
                id="p_count"
                type="number"
                placeholder="상품 재고"
                value={item.p_count}
                onChange={handleChange}
            />
            <input
                id="p_price"
                type="number"
                placeholder="상품 가격"
                value={item.p_price}
                onChange={handleChange}
            />
            <button onClick={onButtonClick}>등록</button>
        </div>
    );
}

