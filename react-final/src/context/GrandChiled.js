import { useContext } from "react"
import{MyContesxt} from "./context"

export const GrandChiled = () => {
    const {value,setValue} =useContext(MyContesxt);
    return(
        <>
            {value}
        </>
    )
}