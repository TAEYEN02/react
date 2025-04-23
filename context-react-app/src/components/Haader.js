import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
export const Header = () => {
    const {items} = useContext(CartContext)

    //총 개수
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
    //총 가격
    const totalPrice = items.reduce((sum, item) =>sum + item.quantity*item.price, 0)

    return (
        <div>
            <Link to="/products">Products </Link> 
            <Link to="/cart">
              |  Cart - 총 개수 : {totalCount}개  |  총 가격 : {totalPrice}원
            </Link>
            
        </div>
    )

}