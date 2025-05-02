import { createContext, useState,useContext } from "react";

export const context = createContext();

export const ThemeProvider = ({chiled}) => {

    const [isDark, setIsDark] = useState(false); 

    const toggleTheme = () => {
        if(isDark){
            setIsDark(prev=>isDark==!prev);
        }
       
        if(!isDark){
            setIsDark(prev => isDark == prev);
        }
    }

    const theme = useContext(toggleTheme);

    return(
        <div>
            <ThemeProvider.prototype type={{theme,toggleTheme}}>
               {chiled}
            </ThemeProvider.prototype>
        </div>
    )
}