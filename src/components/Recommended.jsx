import React, { useEffect, useState } from "react";
import { API_KEY, formatSubscribers } from "../data";
import { Link } from "react-router-dom";

const Recommended = ({ videoId, categoryId = "0" }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AbortController cancels the request if the component unmounts
    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        setLoading(true);
        // We use categoryId to make recommendations more relevant to the current video
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;
        
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        // Filter out the current video from the list
        const filteredVideos = (data.items || []).filter(item => item.id !== videoId);
        setVideos(filteredVideos);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching recommended videos:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    return () => controller.abort(); // Cleanup
  }, [videoId, categoryId]);

  if (loading) {
    return <p className="p-4 text-gray-500 animate-pulse">Loading recommendations...</p>;
  }

  return (
    <aside className="w-full lg:max-w-100 md:pt-20 sm:pt-5 px-2">
      <h1 className="text-2xl font-semibold leading-tight line-clamp-2 group-hover:text-gray-600 pb-5 sm:block md:hidden">Recommended</h1>
      <div className="flex flex-col gap-3">
        {videos.map((item) => (
          <Link
            key={item.id}
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="flex gap-3 cursor-pointer group"
          >
            {/* Thumbnail Wrapper */}
            <div className="relative shrink-0">
              <img
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
                className="w-40 h-24 object-cover rounded-xl bg-gray-100"
              />
            </div>

            {/* Video Meta Info */}
            <div className="flex flex-col overflow-hidden">
              <h3 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-blue-600">
                {item.snippet.title}
              </h3>
              <p className="text-[12px] text-gray-600 mt-1 font-medium">
                {item.snippet.channelTitle}
              </p>
              <p className="text-[12px] text-gray-500">
                {formatSubscribers(item.statistics.viewCount)} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Recommended;