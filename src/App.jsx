import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PrivateClientRoute from "./route-guards/PrivateClientRoute.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       {/*redirect path / to login */}
//       <Route path="/" element={<Login/>}/>,
//       <Route path="/login" element={<Login/>}/>,
//       <Route path="/signup" element={<Signup/>}/>,
//       <Route path="/dashboard" element={<PrivateClientRoute/>}>
//         <Route element={<Dashboard />} />
//       </Route>
//       <Route path="/admin" element={<AdminDashboard/>}/>
//     </>,
//   ),
// )

const router = createBrowserRouter([
  {
    path: "/",
    // should be login if not logged, and dashboard if logged
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <PrivateClientRoute />,
    children: [
      {
        element: <Dashboard />,
        path: "",
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
