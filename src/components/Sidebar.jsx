import React from "react";
import { assets } from "../assets/assets";

const menuItems = [
  { icon: assets.Home, label: "Home" },
  { icon: assets.Game_icon, label: "Gaming" },
  { icon: assets.Automobiles, label: "Automobiles" },
  { icon: assets.Sports, label: "Sports" },
  { icon: assets.Entertainment, label: "Entertainment" },
  { icon: assets.Tech, label: "Technology" },
  { icon: assets.Music, label: "Music" },
  { icon: assets.Blogs, label: "Blogs" },
  { icon: assets.News, label: "News" },
];

const subscriptions = [
  { icon: assets.Jack, label: "Great City" },
  { icon: assets.Simon, label: "Mr. Beast" },
  { icon: assets.Tom, label: "Justin Bieber" },
  { icon: assets.Megan, label: "Tanus Kint" },
  { icon: assets.Cameron, label: "Nasty Kim" },
];

const Sidebar = ({ sidebar }) => {
  return (
    <aside
      className={`
        hidden md:flex flex-col
        fixed top-20 left-0
        h-[calc(100vh-2rem)]
        bg-white px-3 py-6
        transition-all duration-300
        ${sidebar ? "w-20" : "w-60"}
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
      `}
    >
      {/* Main Menu */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={item.icon} alt={item.label} className="w-5" />
            {!sidebar && <p className="text-sm font-medium">{item.label}</p>}
          </div>
        ))}
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Subscriptions */}
      {!sidebar && (
        <p className="text-xs font-semibold mb-2 px-3 text-gray-600 uppercase">
          Subscriptions
        </p>
      )}
      <div className="flex flex-col gap-1">
        {subscriptions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition"
          >
            <img src={item.icon} alt={item.label} className="w-10 rounded-full" />
            {!sidebar && <p className="text-sm truncate">{item.label}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
