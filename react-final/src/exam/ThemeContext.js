import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode)=>!prevMode);
    }

    return(
       <ThemeContext.Provider value={{isDarkMode,toggleTheme}}>
        {children}
       </ThemeContext.Provider>
    )
}

export const ThemeSwitcher =()=>{
    const {isDarkMode,toggleTheme} = useContext(ThemeContext);

    return(
        <button onClick = {toggleTheme}>
            {isDarkMode ? '라이트모드 전환' : '다크모드 전환'}
        </button>
    )
}