import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";


export function Register() {
  const minUsernameLength = 3;
  const maxUsernameLength = 20;
  const minPasswordLength = 12;
  const maxPasswordLength = 100;

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function submitForm(e) {
    e.preventDefault();

    setUsernameError('');
    
    if (username.length < minUsernameLength) {
      setUsernameError(`Slapyvardis per trumpas, turi buti min ${minUsernameLength} simboliu.`);
      
    } 
       
    if (username.length > maxUsernameLength) {
      setUsernameError(`Slapyvardis per ilgas, turi buti max ${maxUsernameLength} simboliu.`);
    }

    setPasswordError('');

    if (password.length < minPasswordLength){
      setPasswordError(`Slaptazodis per trumpas, turi buti min ${minPasswordLength} simboliu.`);
    }
    
    if (password.length > maxPasswordLength){
       setPasswordError(`Slaptazodis per ilgas, turi buti max ${maxPasswordLength} simboliu.`);
    }
    
    if (!usernameError && !passwordError) {
            fetch('http://localhost:5020/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
        }  
    }
    
  

    return (
        <>
            <Header />
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submitForm}>
                  <h1 className="h3 mb-3 fw-normal">Registracija</h1>

                  <div className="form-floating">
                    <input value={username} onChange={e => setUsername(e.target.value.trim())} type="text" className="form-control" id="username" placeholder="name@example.com"/>
                    <label htmlFor="username">Slapyvardis</label>
                    {usernameError && <p className="alert alert-danger">{usernameError}</p>}
                  </div>
                  <div className="form-floating">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="text" className="form-control" id="password" placeholder="Password"/>
                    <label htmlFor="password">Slaptazodis</label>
                    {passwordError && <p className="alert alert-danger">{passwordError}</p>}
                  </div>
                  <button className="btn btn-primary w-100 py-2" type="submit">Registruotis</button>
                </form>
            </main>
            <Footer />
        </>
    );
}