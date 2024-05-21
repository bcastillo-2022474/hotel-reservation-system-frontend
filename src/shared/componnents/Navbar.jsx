import logo from "../../assets/logo1.png";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

import "../../index.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  console.log({ user });
  const initials = [user.name.at(0), user.lastname.at(0)]
    .map((letter) => letter.toUpperCase())
    .join("");

  return (
    <div className="w-full flex justify-center border sticky z-50 top-0 bg-white">
      <nav className="w-full lg:max-w-[90%] flex justify-between">
        <div className="flex justify-between gap-3 px-5 w-full">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              className="lg:hidden hover:text-neutral-300 text-neutral-500 text-4xl cursor-pointer"
              icon={faBars}
            />
            <Link to="/">
              <img
                className="h-12  object-contain overflow-y-hidden"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to={"/profile"}
              className="rounded-full p-[20px] relative bg-black flex justify-center items-center text-white"
            >
              <span className="absolute text-xl font-bold">{initials}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
