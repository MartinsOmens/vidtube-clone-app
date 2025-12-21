import React from "react";
import { assets } from "../assets/assets";

const videos = [
  assets.Thumbnail1,
  assets.Thumbnail2,
  assets.Thumbnail3,
  assets.Thumbnail4,
  assets.Thumbnail5,
  assets.Thumbnail6,
  assets.Thumbnail1,
  assets.Thumbnail2,
  assets.Thumbnail3,
  assets.Thumbnail4,
  assets.Thumbnail5,
  assets.Thumbnail6,
];

const Recommended = () => {
  return (
    <aside
      className="
        w-full
        lg:w-full
        pt-6 md:pt-20 mb-5
        px-2 sm:px-4
        md:sticky
        h-fit
      "
    >
      <div className="flex flex-col gap-4">
        {videos.map((thumb, index) => (
          <div
            key={index}
            className="flex gap-3 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative shrink-0">
              <img
                src={thumb}
                alt="video"
                className="
                  w-32 h-20
                  sm:w-40 sm:h-24
                  object-cover
                  rounded-lg
                "
              />
            </div>

            {/* Video Info */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-black">
                Best Channel for learning code that helps you become a web developer
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Greater Stack
              </p>

              <p className="text-xs text-gray-500">
                15k views • 2 days ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Recommended;
