
import { Link } from "react-router-dom";
import Navbar from "../../shared/components/Navbar.jsx";
import RoomsContainer from "./RoomsContainer.jsx";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen h-1 flex flex-col">
      <Navbar />
      <div className="p-10 bg-stone-200 flex-1">
        <div className=" flex w-full">
          <Link
            to={'/room/form/'}
            className="bg-black rounded-lg text-white font-bold p-3 m-3"
          >
            Add Room
          </Link>
          <Link
            to={'/service/form/'}
            className="bg-black rounded-lg text-white font-bold p-3 m-3"
          >
            Add Service
          </Link>

        </div>
        <RoomsContainer />  
      </div>
    </div>
  );
}
