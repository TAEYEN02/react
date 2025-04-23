import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemePeovider = ({ children }) => {

    const [color, setColor] = useState({ color: "Dark", Background: true, Fontcolor: true })

    return (
        <div
            style={{
                backgroundColor: color.Background ? '#333' : '#fff',
                color: color.Fontcolor ? '#fff' : '#000',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ThemeContext.Provider value={{ color, setColor }}>
                {children}
            </ThemeContext.Provider>
        </div>

    )
}
export const ThemeSwitch = () => {
    const { color, setColor } = useContext(ThemeContext);
    return (
        <>
            <h2>{color.color} Mode </h2>
            <button onClick={() => {
                setColor(
                    {
                        color: color.color === "white" ? "Dark" : "white",
                        Background: !color.Background,
                        Fontcolor: !color.Fontcolor
                    }
                )
            }}>전환하기</button>
        </>

    )

}
