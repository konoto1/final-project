import { createContext, useState } from "react";


export const initialContext = {
    isLogedIn: false,
    changeLoginStatus: () => {},
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLogedIn, setIsLogedIn] = useState(initialContext.isLogedIn);

    function changeLoginStatus(newStatus = false) {
        setIsLogedIn(newStatus);
    }

    return (
        <GlobalContext.Provider value={{ isLogedIn, changeLoginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    );
}