
import React, { useEffect, useState } from "react";
import { API_KEY, value_converter, formatSubscribers } from "../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [channelStats, setChannelStats] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  // 🔹 Fetch video details
  useEffect(() => {
    if (!videoId || videoId.length !== 11) return;

    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
        );
        const data = await res.json();
        setVideo(data.items?.[0] || null);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setVideo(null);
      }
    };

    fetchVideo();
  }, [videoId]);

  // 🔹 Fetch channel stats
  useEffect(() => {
    if (!video?.snippet?.channelId) return;

    const fetchChannelStats = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${video.snippet.channelId}&key=${API_KEY}`
        );
        const data = await res.json();
        setChannelStats(data.items?.[0]?.statistics || null);
      } catch (error) {
        console.error("Error fetching channel stats:", error);
        setChannelStats(null);
      }
    };

    fetchChannelStats();
  }, [video]);

  // 🔹 Fetch comments
  useEffect(() => {
    if (!videoId || videoId.length !== 11) return;

    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${API_KEY}`
        );
        const data = await res.json();
        setComments(data.items || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [videoId]);

  if (!video) {
    return (
      <div className="w-full pt-24 px-4 text-center text-gray-500">
        Loading video...
      </div>
    );
  }

  return (
    <div className="w-full pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* VIDEO PLAYER */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* VIDEO INFO */}
        <div className="mt-4">
          <h1 className="text-base sm:text-lg md:text-xl font-bold">
            {video.snippet.title}
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            {value_converter(video.statistics.viewCount)} views •{" "}
            {moment(video.snippet.publishedAt).fromNow()}
          </p>
        </div>

        {/* CHANNEL */}
        <div className="flex items-start gap-3 mt-4">
          <img
            src={video.snippet.thumbnails.default.url}
            alt="Channel"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold">{video.snippet.channelTitle}</h2>

            {channelStats ? (
              <p className="text-sm text-gray-500">
                {formatSubscribers(channelStats.subscriberCount)} subscribers
              </p>
            ) : (
              <p className="text-sm text-gray-400">Subscribers hidden</p>
            )}
          </div>
        </div>

        {/* COMMENTS */}
        <hr className="my-4" />

        {loadingComments ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : (
          comments.map((item) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div key={item.id} className="flex gap-3 mb-6">
                <img
                  src={comment.authorProfileImageUrl}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-sm">
                    {comment.authorDisplayName}
                  </p>
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: comment.textDisplay,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
