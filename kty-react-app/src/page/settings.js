import { useContext, useState } from "react"
import { ThemeProvider } from "../context/context"

export const Settings = () => {

    const theme = useContext(ThemeProvider);
    const [isDark , setIsDark] = useState(false);

    const onChange = () => {
        if(theme===isDark){
            setIsDark(prev => !prev);
        } 
       
    }

    return(
        <div>
            <h3>Settings</h3>
            <button onClick={onChange}>{theme ? 'dark Mode':'light Mode'}</button>
        </div>
    )
}