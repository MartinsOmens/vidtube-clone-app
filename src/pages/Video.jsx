import React from "react";
import PlayVideo from "../components/PlayVideo";
import Recommended from "../components/Recommended";


const Video = () => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* MAIN VIDEO */}
        <div className="w-full lg:w-[65%]">
          <PlayVideo />
        </div>

        {/* RECOMMENDED */}
        <div className="w-full lg:w-[35%]">
          <Recommended />
        </div>
      </div>
    </>
  );
};

export default Video;
