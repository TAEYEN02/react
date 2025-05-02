import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeProvider } from "../context/context"

export const NavBar = () => {

    const theme = useContext(ThemeProvider);

    return (
        <div className={`navbar ${theme ? 'light' : 'dark'}`}>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/posts">Post</Link></li>
                <li><Link to="/setting">Settings</Link></li>
            </ul>
        </div>
    )
}