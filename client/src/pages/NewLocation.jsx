import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { SecretContent } from "../components/secret-content/SecretContent";
import { NewLocationForm } from "../components/forms/NewLocationForm";

export function NewLocation() {
    const { isLogedIn, role } = useContext(GlobalContext);

    return (
        <>
            <Header />
            {isLogedIn && role === 'admin' && <NewLocationForm />}
            {(!isLogedIn || role !== 'admin') && <SecretContent dedicatedRole="admin" />}
            <Footer />
        </>
    );
  }