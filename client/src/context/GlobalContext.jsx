import { createContext, useEffect, useState } from "react";


export const initialContext = {
    isLogedIn: false,
    role: 'public',
    changeLoginStatus: () => {},
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLogedIn, setIsLogedIn] = useState(initialContext.isLogedIn);
    const [role, setRole] = useState(initialContext.role)
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
        <GlobalContext.Provider value={{ isLogedIn, changeLoginStatus, role }}>
            {props.children}
        </GlobalContext.Provider>
    );
}