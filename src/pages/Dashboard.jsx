import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card_dashboard";

//import portada from "../assets/Jeonju1.jpg"
//import portada from "../assets/amsterdam1.jpg"
//import portada from "../assets/perugia1.jpg"
import portada from "../assets/venezia1.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <div className="flex-initial w-full min-w-80 sm:w-1/4 h-screen bg-stone-200 flex items-center justify-center">
          bbbbbbbbbb
        </div>
        <div className="flex-1 h-full flex-col items-center justify-center p-4">
          <div className="bg-red-300 w-full h-56 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img src={portada} className="w-full h-full object-cover" alt="" />
            <div className="absolute w-full z-10 flex top-0 gap-10 items-center px-5">
              <div className="flex w-full justify-between gap-5 bg-white p-3 px-7 border-none rounded-full mt-6 opacity-70 z-10 w-full">
                <input type="text" className="outline-none w-full" />
                <FontAwesomeIcon
                  icon={faSearch}
                  size="xl"
                  className="cursor-pointer"
                />
              </div>
              <h1 className="absolute text-white bold ml-7 mr-7 top-28 font-bold text-2xl z-20 flex">
                Encuentra un hotel a dónde sea que vayas.
              </h1>
            </div>
          </div>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
