import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { NotFound } from "./pages/NotFound.jsx";
import { LocationListing } from "./pages/LocationListing.jsx";
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboards } from './pages/Dashboard.jsx';
import { GlobalContextWrapper } from './context/GlobalContext';
import { NewLocation } from './pages/NewLocation.jsx'



export function App() {

  
  return(
    <GlobalContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/locations' element={<LocationListing />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/locations/new' element={<NewLocation />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/dashboard' element={<Dashboards />}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextWrapper>
  );
}

