import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Dashboard from "./pages/Dashboard.jsx"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/*redirect path / to login */}
            <Route path="/" element={<Login/>}/>,
            <Route path="/login" element={<Login/>}/>,
            <Route path="/signup" element={<Signup/>}/>,
            <Route path="/dashboard" element={<Dashboard/>}/>
        </>
    )
)

function App() {
    return <>
        <RouterProvider router={router}/>
    </>
}

export default App
