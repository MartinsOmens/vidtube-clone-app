import React from "react";
import { assets } from "../assets/assets";

const Feed = () => {
  const thumbnails = [
    assets.Thumbnail1, assets.Thumbnail2, assets.Thumbnail3, assets.Thumbnail4,
    assets.Thumbnail5, assets.Thumbnail6, assets.Thumbnail7, assets.Thumbnail8,
    assets.Thumbnail1, assets.Thumbnail2, assets.Thumbnail3, assets.Thumbnail4,
    assets.Thumbnail5, assets.Thumbnail6, assets.Thumbnail7, assets.Thumbnail8,
    assets.Thumbnail1, assets.Thumbnail2, assets.Thumbnail3, assets.Thumbnail4,
    assets.Thumbnail5, assets.Thumbnail6, assets.Thumbnail7, assets.Thumbnail8,
    assets.Thumbnail1, assets.Thumbnail2, assets.Thumbnail3, assets.Thumbnail4,
    assets.Thumbnail5, assets.Thumbnail6, assets.Thumbnail7, assets.Thumbnail8,
    
  ];

  return (
    <div className="p-4 min-h-screen transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {thumbnails.map((thumb, index) => (
          <div key={index} className="bg-white rounded shadow-md overflow-hidden">
            <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full rounded" />
            <div className="p-2">
              <h2 className="text-sm font-semibold">
                Best Channel for learning code that helps you become a web developer
              </h2>
              <h3 className="text-xs text-gray-500">Greater Stack</h3>
              <p className="text-xs text-gray-500">15k Views &bull; 2 days ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
