import { createContext, useEffect, useState } from "react";


export const initialContext = {
    isLogedIn: false,
    changeLoginStatus: () => {},
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLogedIn, setIsLogedIn] = useState(initialContext.isLogedIn);

    useEffect(() => {
        fetch('http://localhost:5020/api/login',{
            method: 'GET',
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setIsLogedIn(data.isLogedIn))
        .catch(e => console.error(e));
    }, []);

    function changeLoginStatus(newStatus = false) {
        setIsLogedIn(newStatus);
    }

    return (
        <GlobalContext.Provider value={{ isLogedIn, changeLoginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    );
}