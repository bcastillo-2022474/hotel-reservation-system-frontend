import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./Login/Login.jsx";
import Signup from "./Signup/Signup.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/*redirect path / to login */}
            <Route path="/" element={<Login/>}/>,
            <Route path="/login" element={<Login/>}/>,
            <Route path="/signup" element={<Signup/>}/>
        </>
    )
)

function App() {
    return <>
        <RouterProvider router={router}/>
    </>
}

export default App
