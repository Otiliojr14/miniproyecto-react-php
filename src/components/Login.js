import React, { useRef, useState } from "react";
import classes from "./Login.module.css";
const URL_LOGIN = "http://localhost/ws-login/login.php";

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await resp.json();
  return json;
};

function Login(props) {
  const [error, setError] = useState(null);
  const [espera, setEspera] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();
  const formLogin = useRef();

  const userHandler = async (e) => {
    setEspera(true);

    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (email.trim().lenght === 0 || password.trim().lenght === 0) {
      return;
    }

    const data = {
      usuario: email,
      clave: password,
    };
    const responseJSON = await enviarData(URL_LOGIN, data);
    setError(responseJSON.error);

    props.acceder(responseJSON.conectado);

    setEspera(false);
  };

  return (
    <div className={classes.login}>
      <form onSubmit={userHandler} ref={formLogin}>
        <div className="card">
          <div className="card-header text-center">
            <h1>Iniciar</h1>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="bassic-addon1">
                  ✉️
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                aria-label="Correo"
                aria-describedby="bassic-addon1"
                ref={emailInput}
              />
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="bassic-addon2">
                  🔒
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Clave"
                aria-label="Clave"
                aria-describedby="bassic-addon2"
                ref={passwordInput}
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              disabled={espera}
              className="btn btn-info btn-lg btn-block"
              type="submit"
            >
              Acceder
            </button>
            <div className="card-footer">
              <span>¿Olvidó su contraseña?</span>
              <a href="#"></a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
