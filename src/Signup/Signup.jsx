// import backgroundImage from "../assets/background-image-red.jpg"
// import backgroundImage from "../assets/hotel.jpg"
import backgroundImage from "../assets/rio-janeiro.jpg"
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div className="h-dvh flex justify-center items-center relative">
            <img src={backgroundImage} className="absolute w-full object-cover h-full" alt="Fondo de Pantalla"/>
            <div className="bg-black opacity-30 h-full w-full top-0 absolute"></div>
            <div className="w-full rounded-lg overflow-hidden relative outline-none outline-1 outline-offset-2 outline-neutral-50 max-w-[350px] md:max-w-[400px] custom-shadow">
                <div className="top-0 absolute w-full h-full bg-black opacity-20"></div>
                <div className="top-0 absolute w-full h-full backdrop-blur-lg"></div>
                <div className="z-10 relative w-full h-[80%] flex flex-col gap-10 px-5 py-10">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl text-center font-bold text-neutral-200">Signup</h1>
                        <p className="text-neutral-300 font-semibold text-center text-sm max-w-[80%]">
                            Ingresa tus credenciales en el formulario de abajo
                        </p>
                    </div>
                    <form className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex w-full flex-col gap-1 shrink grow">
                                <label className="text-primary font-semibold text-lg">Nombre</label>
                                <input
                                    placeholder="j0hN_12#4"
                                    className="text-neutral-200 border px-2 py-1 outline-button bg-inherit"
                                    type="text"/>
                            </div>
                            <div className="flex w-full flex-col gap-1 shrink grow">
                                <label className="text-primary font-semibold text-lg">Apellido</label>
                                <input
                                    placeholder="j0hN_12#4"
                                    className="text-neutral-200 border px-2 py-1 outline-button bg-inherit"
                                    type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-primary font-semibold text-lg">Correo</label>
                            <input
                                placeholder="jhondoe@email.com"
                                className="text-neutral-200 border px-2 py-1 outline-button bg-inherit" type="text"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-primary font-semibold text-lg">Password</label>
                            <input
                                placeholder="j0hN_12#4"
                                className="text-neutral-200 border px-2 py-1 outline-button bg-inherit" type="text"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-primary font-semibold text-lg">Password</label>
                            <input
                                placeholder="j0hN_12#4"
                                className="text-neutral-200 border px-2 py-1 outline-button bg-inherit" type="text"/>
                        </div>
                        <button className="px-3 py-2 bg-primary text-neutral-200 rounded outline-button">Iniciar
                            Sesion
                        </button>
                        <Link to={"/login"}
                           className="text-primary hover:underline text-center text-sm outline-none focus:underline focus:text-blue-500">Ya
                            tienes con una cuenta? Loggeate aca</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup