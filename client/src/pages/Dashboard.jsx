import { useContext } from "react";
import { Footer } from "../components/footer/Footer.jsx";
import { Header } from "../components/header/Header.jsx";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { Link } from "react-router-dom";


export function Dashboards() {
  const {isLogedIn} = useContext(GlobalContext);
  

  return (
    <>
      <Header/>
      {
      isLogedIn && 
      <main>
        <section className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <h1>Dashboard</h1>
                <Link to='/locations/new' className="btn btn-primary">+ Nauja lokacija</Link>
              </div>
              <p>Sita puslapi mato tik prisijunge vartotojai</p>
            </div>
          </div>
        </section>
      </main>
      }
      {
      !isLogedIn && 
      <main>
        <section className="container">
          <div className="row">
            <div className="col-12">
              <h1>401</h1>
              <p>Neturite autorizacijos</p>
            </div>
          </div>
        </section>
      </main>
      }
      <Footer/>
    </>
  );
}

