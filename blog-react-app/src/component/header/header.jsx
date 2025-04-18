import React from "react";
import { Link } from "react-router-dom";


export default function Header(){
    return(
        <>
        <nav className="nav-container">
            <Link to={'/'}>
                <div className="margin-left">
                    <h1 className="nav-title">
                        REACT REDUX SHOPPING CART
                    </h1>
                </div>
            </Link>
            <ul className="nav-ul">
                <Link to={'/'}>
                    <li className="nav-li">Home</li>
                </Link>
                <Link to={'/cart'}>
                    <li className="nav-li">Cart</li>
                </Link>
            </ul>
        </nav>
    </>
    )
}