import { createContext, useEffect, useState } from "react";


export const initialContext = {
    isLogedIn: false,
    role: 'public',
    username: '',
    changeLoginStatus: () => {},
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLogedIn, setIsLogedIn] = useState(initialContext.isLogedIn);
    const [role, setRole] = useState(initialContext.role)
    const [username, setUsername] = useState(initialContext.username)
   
    useEffect(() => {
        fetch('http://localhost:5020/api/login',{
            method: 'GET',
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setIsLogedIn(data.isLogedIn);
            setRole(data.role);
            setUsername(data.username);
    })
        .catch(e => console.error(e));
    }, []);

    function changeLoginStatus(newStatus = initialContext.isLogedIn) {
        setIsLogedIn(newStatus);
    }

    function changeRole (newRole = initialContext.role) {
        setRole(newRole);
    }

    function changeUsername (newUsername = initialContext.username) {
        setUsername(newUsername)
    }
    const values = {
        isLogedIn, 
        changeLoginStatus, 
        role, 
        changeRole,
        username,
        changeUsername,
    };

    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    );
}