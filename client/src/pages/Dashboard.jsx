import { useContext } from "react";
import { Footer } from "../components/footer/Footer.jsx";
import { Header } from "../components/header/Header.jsx";
import { GlobalContext } from "../context/GlobalContext.jsx";


export function Dashboards() {
  const {isLogedIn} = useContext(GlobalContext);
  

  return (
    <>
      <Header/>
      {
      isLogedIn && 
      <main>
        <h1>Dashboard</h1>
        <p>Sita puslapi mato tik prisijunge vartotojai</p>
      </main>
      }
      {
      !isLogedIn && 
      <main>
        <h1>401</h1>
        <p>Neturite autorizacijos</p>
      </main>
      }
      <Footer/>
    </>
  );
}

