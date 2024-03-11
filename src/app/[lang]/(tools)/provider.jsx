
import { createContext } from "react";

export const tools_context = createContext("");

export default function ToolsProvier({children,name}){
    return(
        <tools_context.Provider value={name}>
            {children}
        </tools_context.Provider>
    );
}


