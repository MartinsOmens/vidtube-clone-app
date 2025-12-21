import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../data";
import moment from "moment/moment";

const Feed = ({ category }) => {
  const [data, setData] = React.useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  React.useEffect(() => {
    fetchVideos();
  }, [category]);

  return (
    <div className="p-4 min-h-screen transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="cursor-pointer rounded-lg overflow-hidden hover:bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full rounded"
            />

            <div className="p-2">
              <h2 className="text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </h2>

              <h3 className="text-xs text-gray-500">
                {video.snippet.channelTitle}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {value_converter((video.statistics.viewCount))} views • {moment(video.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
