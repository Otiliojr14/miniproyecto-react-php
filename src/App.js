import { useState } from "react";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  const sessionData = localStorage.getItem("sesion");

  const [conectado, setConectado] = useState(sessionData ? true : false);

  const iniciarSesion = (estado) => {
    setConectado(estado);
    if (estado) {
      localStorage.setItem("sesion", 1);
    }
  };

  return conectado ? <Main /> : <Login acceder={iniciarSesion} />;
}

export default App;
