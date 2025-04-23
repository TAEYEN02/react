import { CartContext} from "../contexts/CartContext"
import { useContext } from "react"
import { Link } from "react-router-dom";

export const CartPage = () => {

    const {items,removeItem,updateQuantity, ClearCart } =useContext(CartContext);

    return(
       
        <div style={{marginTop:40}}>
            <Link to='/products' >더 담으러 가기</Link>
            <h1>장바구니</h1>
            {items.length===0 ? (<p>장바구니가 비어있습니다</p>) : (
                    <div>
                        <ul>
                            {items.map(item =>(
                                <li key={item.id} style={{marginBottom:10}}>
                                    {item.name} | {item.price}원 {' '}
                                    <input 
                                        type="number" 
                                        min={1} 
                                        value={item.quantity}
                                        onChange={(e) => {updateQuantity(item.id,Number(e.target.value))}}
                                        style={{width :50, margin:'0 10px'}}
                                    />
                                    <button onClick={()=>removeItem(item.id)}>삭제</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={()=>ClearCart()}>장바구니 비우기</button>
                    </div>
            )}
        </div>
    )
}