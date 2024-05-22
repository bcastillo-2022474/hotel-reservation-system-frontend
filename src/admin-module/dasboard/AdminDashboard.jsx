import { Link } from "react-router-dom";
import Navbar from "../../shared/componnents/Navbar.jsx";
import RoomsContainer from "./RoomsContainer.jsx";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen h-1 flex flex-col">
      <Navbar />
      <div className="p-10 bg-stone-200 flex-1">
        <div className=" flex bg-green-200 w-full">
          <Link
            to={'/room/form/'}
            className="bg-black rounded-lg text-white font-bold p-3 m-3"
          >
            Big chungus
          </Link>
          <Link
            to={'/service/form/'}
            className="bg-black rounded-lg text-white font-bold p-3 m-3"
          >
            Big chungus
          </Link>

        </div>
        <RoomsContainer />
      </div>
    </div>
  );
}
