import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { NotFound } from "./pages/NotFound.jsx";
import { LocationListing } from "./pages/LocationListing.jsx";


export function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/locations' element={<LocationListing />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

