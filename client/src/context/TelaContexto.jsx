import { createContext, useContext, useEffect, useState } from "react";

const TelaContexto = createContext();

export function TelaProvider({ children }) {
    const [desktop, setDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setDesktop(window.innerWidth >= 1024);
        setTimeout(handleResize, 0);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <TelaContexto.Provider value={{desktop}}>
            {children}
        </TelaContexto.Provider>
    );
}

export function useTela() {
    return useContext(TelaContexto);
}