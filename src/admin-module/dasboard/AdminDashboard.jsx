import Navbar from "../../shared/components/Navbar.jsx";
import RoomsContainer from "./RoomsContainer.jsx";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen h-1 flex flex-col">
      <Navbar />
      <div className="p-10 bg-stone-200 flex-1">
        <RoomsContainer />
      </div>
    </div>
  );
}
