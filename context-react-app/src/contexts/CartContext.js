import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    //장바구니
    const [items, setItems] = useState([]);

    //추가하기
    //js에서 객체에 없는 프로퍼티를 쓰면 객체에 추가가 된다.
    const addItem = (product) => {
        setItems((preveItems) => {
            //이미 추가가 된 상태라면 개수만 +1
            const exist = preveItems.find(item => item.id === product.id);
            if (exist) {
                return preveItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...preveItems, { ...product, quantity: 1 }]
        })
    }
    //삭제하기
    const removeItem = (id) => {
        //배열에서 일치하지 않는 아이디만 필터링
        setItems((preveItems) => preveItems.filter(item => item.id !== id))
    }

    //수정하기
    const updateQuantity = (id, quantity) => {
        setItems(preveItems =>
            //배열에서 매개변수로 넘어온 id랑 일치하는 요소를 찾아서
            //매개변수로 넘어온 quantity와 1을 비교해서 더 큰 수를 반환
            preveItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
    }
    //장바구니 비우기
    const ClearCart = () => {setItems([])}

    


    return (
        <CartContext.Provider value={{items, setItems,addItem,removeItem,updateQuantity,ClearCart }}>
            {children}
        </CartContext.Provider>
    )
}
