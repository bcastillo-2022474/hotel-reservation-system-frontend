import Navbar from "../components/Navbar";
import Card from "../components/CardHotelRoomd.jsx";
import Sidebar from "../components/Sidebar.jsx";
import background from "../assets/venezia1.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        <div className="flex-1 h-full flex-col items-center justify-center p-4">
          <div className="bg-red-300 w-full h-56 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src={background}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute w-full z-10 flex top-0 gap-10 items-center px-5">
              <div className="flex w-full justify-between gap-5 bg-white p-3 px-7 border-none rounded-full mt-6 opacity-[65%] z-10 w-full">
                <input type="text" className="outline-none w-full" />
                <FontAwesomeIcon
                  icon={faSearch}
                  size="xl"
                  className="cursor-pointer text-neutral-400 hover:text-neutral-600"
                />
              </div>
              <h1 className="absolute text-white bold ml-2 mr-7 top-28 font-bold text-2xl z-20 flex">
                Encuentra un hotel a dónde sea que vayas.
              </h1>
            </div>
          </div>
          <Link to={"/admin"}>LINK TO ADMIN</Link>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
