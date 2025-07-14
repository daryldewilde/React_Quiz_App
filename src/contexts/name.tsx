import { createContext } from "react";
import { contextProps } from "../types/types";

let Context = createContext("")

export default  function NameContext({children}: contextProps) {
    return (
        <Context.Provider value="">
            {children}
        </Context.Provider>
    )
};