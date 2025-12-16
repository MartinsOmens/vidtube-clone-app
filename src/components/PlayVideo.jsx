import React from "react";
import { assets } from "../assets/assets";

const PlayVideo = () => {
  return (
    <div className="w-full pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* VIDEO PLAYER */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
          <video
            src={assets.Video}
            controls
            className="w-full h-full object-cover"
          />
        </div>

        {/* VIDEO INFO */}
        <div className="mt-4">
          <h1 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
            Best YouTube Channel to Learn Web Development
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-3">
            <p className="text-sm text-gray-600">
              1,525 views • 2 days ago
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { icon: assets.Like, label: "125" },
                { icon: assets.Dislike, label: "2" },
                { icon: assets.Share, label: "Share" },
                { icon: assets.Save, label: "Save" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 text-sm"
                >
                  <img src={item.icon} className="w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* CHANNEL INFO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <img
              src={assets.Jack}
              alt="Channel"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">GreatStack</h2>
              <p className="text-sm text-gray-500">1M subscribers</p>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Channel that makes learning easy. Subscribe for more web
                development tutorials.
              </p>
            </div>
          </div>

          <button className="self-start sm:self-auto bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800">
            Subscribe
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* COMMENTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">130 Comments</h2>

          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="flex gap-3 mb-6">
              <img
                src={assets.User_Profile}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">
                    Jack Wilshere
                  </h3>
                  <span className="text-xs text-gray-500">
                    1 day ago
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt quod quos optio quidem ea quaerat dicta.
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-sm">
                    <img src={assets.Like} className="w-4" />
                    <span>244</span>
                  </button>
                  <button>
                    <img src={assets.Dislike} className="w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PlayVideo;
