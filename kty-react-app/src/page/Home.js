import { ThemeProvider } from "../context/context"
import { useContext } from "react";


export const Home = () => {
    const theme = useContext(ThemeProvider);

    return(
        <div>
            <h3>Welcome to My React Dashboard</h3>
            <p>This Theme {theme ? 'light' : 'dark'}</p>
        </div>
        
    )
}