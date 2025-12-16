import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({sidebar, setSidebar}) => {
  return (
    <div className="w-full bg-white shadow-md px-8 py-3 fixed top-0 z-50">
      <div className="flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <img src={assets.Menu} alt="Menu" className="w-5" onClick={() => setSidebar(!sidebar)} />
          <img src={assets.Logo} alt="Logo" className="w-20 md:w-24" />
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center">
          
          {/* Desktop Search */}
          <div className="relative hidden md:block w-full max-w-lg">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent px-10 py-2 rounded-full shadow-md border border-gray-300 focus:outline-none"
            />
            <img
              src={assets.Search}
              alt="Search"
              className="w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <img
              src={assets.Search}
              alt="Search"
              className="w-6 cursor-pointer"
            />
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <img src={assets.Upload} alt="Upload" className="w-6 md:w-8" />
          <img src={assets.More} alt="More" className="w-6 md:w-8" />
          <img src={assets.Notification} alt="Notification" className="w-6 md:w-8" />
          <img
            src={assets.Jack}
            alt="Profile"
            className="w-7 md:w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
