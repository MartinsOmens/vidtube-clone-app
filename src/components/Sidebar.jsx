import React from "react";
import { assets } from "../assets/assets";

const menuItems = [
  { id: 0, icon: assets.Home, label: "Home" }, // All videos
  { id: 20, icon: assets.Game_icon, label: "Gaming" },
  { id: 2, icon: assets.Automobiles, label: "Automobiles" },
  { id: 17, icon: assets.Sports, label: "Sports" },
  { id: 24, icon: assets.Entertainment, label: "Entertainment" },
  { id: 28, icon: assets.Tech, label: "Technology" },
  { id: 10, icon: assets.Music, label: "Music" },
  { id: 22, icon: assets.Blogs, label: "Blogs" },
  { id: 25, icon: assets.News, label: "News" },
];

const subscriptions = [
  { icon: assets.Jack, label: "Great City" },
  { icon: assets.Simon, label: "Mr. Beast" },
  { icon: assets.Tom, label: "Justin Bieber" },
  { icon: assets.Megan, label: "Tanus Kint" },
  { icon: assets.Cameron, label: "Nasty Kim" },
];

const Sidebar = ({ sidebar, category, setCategory }) => {
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
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setCategory(item.id)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <div
              className={`
              pb-1 
              ${category === item.id ? "border-b-2 border-red-600": "border-b-2 border-transparent"}
              `}
            >
              <img src={item.icon} alt={item.label} className="w-5" />
            </div>
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
            <img
              src={item.icon}
              alt={item.label}
              className="w-10 rounded-full"
            />
            {!sidebar && <p className="text-sm truncate">{item.label}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
