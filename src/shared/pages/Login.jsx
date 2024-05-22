import backgroundImage from "../../assets/rio-janeiro.jpg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, emailRegex, passwordRegex } from "../../config.js";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [touchedStatus, setTouchedStatus] = useState({
    isEmailTouched: false,
    isPasswordTouched: false,
  });
  const isEmailValid = emailRegex.test(form.email);
  const isPasswordValid = passwordRegex.test(form.password);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid || !isPasswordValid) return;

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      // TODO: show toaster
      console.log(await response.json());
      return;
    }
    // Navigate to another page
    const { user, token } = await response.json();
    localStorage.setItem("token", token);
    userContext.setUser(user);
    console.log(user, token);
    navigate("/dashboard");
  };

  // console.log({form, touchedStatus, isEmailValid, isPasswordValid}, Boolean(!isPasswordValid) && touchedStatus.isPasswordTouched)

  return (
    <div className="h-dvh flex justify-center items-center relative">
      <img
        src={backgroundImage}
        className="absolute w-full object-cover h-full"
        alt="Fondo de Pantalla"
      />
      <div className="bg-black opacity-30 h-full w-full top-0 absolute"></div>
      <div className="w-full rounded-lg overflow-hidden relative outline-none outline-1 outline-offset-2 outline-neutral-50 max-w-[350px] md:max-w-[400px] custom-shadow">
        <div className="top-0 absolute w-full h-full bg-black opacity-20"></div>
        <div className="top-0 absolute w-full h-full backdrop-blur-lg"></div>
        <div className="z-10 relative w-full h-[80%] flex flex-col gap-14 px-5 py-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center font-bold text-neutral-200">
              Login
            </h1>
            <p className="text-neutral-300 font-semibold text-center text-sm max-w-[80%]">
              Ingresa tus credenciales en el formulario de abajo
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-primary font-semibold text-lg">
                Correo
              </label>
              <input
                onBlur={() => {
                  setTouchedStatus({ ...touchedStatus, isEmailTouched: true });
                }}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jhondoe@email.com"
                className="text-neutral-200 border px-2 py-1 outline-button bg-inherit"
                type="text"
              />
              {!isEmailValid && touchedStatus.isEmailTouched && (
                <span className="text-xs text-red-500">Email Invalid</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-primary font-semibold text-lg">
                Password
              </label>
              <input
                onBlur={() => {
                  setTouchedStatus({
                    ...touchedStatus,
                    isPasswordTouched: true,
                  });
                }}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="your password here"
                className="text-neutral-200 border px-2 py-1 outline-button bg-inherit"
                type="password"
              />
              {!isPasswordValid && touchedStatus.isPasswordTouched && (
                <span className="text-xs text-red-500">
                  Password Invalid, must be 8 characters long and have 1
                  Uppercase, 1 Lowercase and 1 Symbol
                </span>
              )}
            </div>
            {/*when click go and try login*/}
            <button
              onClick={handleSubmit}
              className="px-3 py-2 bg-primary text-neutral-200 rounded outline-button"
            >
              Iniciar Sesion
            </button>
            <Link
              to={"/signup"}
              className="text-primary hover:underline text-center text-sm outline-none focus:underline focus:text-blue-500"
            >
              Aun no tienes cuenta? crea una aca
            </Link>
            <Link
              to={"/signup/hotel"}
              className="text-primary hover:underline text-center text-sm outline-none focus:underline focus:text-blue-500"
            >
              Quieres publcar tu hotel aqui? crea una cuenta aqui y sigue los
              pasos
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
