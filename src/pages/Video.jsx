import React from "react";
import PlayVideo from "../components/PlayVideo";
import Recommended from "../components/Recommended";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl  px-2 pt-20">
      <div className="flex-1">
        <PlayVideo videoId={videoId} />
      </div>
      <Recommended videoId={videoId} categoryId={categoryId} />
    </div>
  );
};

export default Video;


