import { useContext, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";



export function Login() {
  const {changeLoginStatus} = useContext(GlobalContext);
  const {VITE_MODE, VITE_USERNAME, VITE_PASSWORD} = import.meta.env;
  const initialUsername = VITE_MODE === 'dev' ? VITE_USERNAME : '';
  const initialPassword = VITE_MODE === 'dev' ? VITE_PASSWORD : '';

  const minUsernameLength = 3;
  const maxUsernameLength = 20;
  const minPasswordLength = 12;
  const maxPasswordLength = 100;

  const [username, setUsername] = useState(initialUsername);
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState(initialPassword);
  const [passwordError, setPasswordError] = useState('');
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();

    setIsFormValidated(true);
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
            fetch('http://localhost:5020/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
            .then(res => res.json())
            .then(data => {
              setApiResponse(data);
              if (data.status === 'success') {
                changeLoginStatus(true);
                
                navigate('/dashboard');
              }
            })
            .catch(err => console.log(err)); 
        }  
    }
      
    return (
        <>
            <Header />
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submitForm}>
                  <h1 className="h3 mb-3 fw-normal">Prisijungti</h1>

                  {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.msg}</p> : null}
                  {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.msg}</p> : null}
                  
                  <div className="form-floating">
                    <input value={username} onChange={e => setUsername(e.target.value.trim())} type="text" id="username" placeholder="Chuck"
                    className={'form-control ' + (isFormValidated ? usernameError ? 'is-invalid' : 'is-valid' : '')}/>
                    <label htmlFor="username">Slapyvardis</label>
                    {usernameError && <p className="invalid-feedback">{usernameError}</p>}
                  </div>
                  <div className="form-floating">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder="Password"
                    className={'form-control ' + (isFormValidated ? passwordError ? 'is-invalid' : 'is-valid' : '')} />
                    <label htmlFor="password">Slaptazodis</label>
                    {passwordError && <p className="invalid-feedback">{passwordError}</p>}
                  </div>
                  <button className="btn btn-primary w-100 py-2" type="submit">Prisijungti</button>
                </form>
            </main>
            <Footer />
        </>
    );
}