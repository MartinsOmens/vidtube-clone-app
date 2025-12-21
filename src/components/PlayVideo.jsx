import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { API_KEY, value_converter, formatSubscribers } from "../data";
import moment from "moment";

const PlayVideo = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [channelStats, setChannelStats] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setVideo(data.items[0]);
        } else {
          setVideo(null);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (id) fetchVideo();
  }, [id]);

  // Fetch channel stats after video is loaded
  useEffect(() => {
    const fetchChannelStats = async (channelId) => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setChannelStats(data.items[0].statistics);
        } else {
          setChannelStats(null);
        }
      } catch (error) {
        console.error("Error fetching channel stats:", error);
        setChannelStats(null);
      }
    };

    if (video?.snippet?.channelId) {
      fetchChannelStats(video.snippet.channelId);
    }
  }, [video]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=5&key=${API_KEY}`
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

    if (id) fetchComments();
  }, [id]);

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
            src={`https://www.youtube.com/embed/${id}`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* VIDEO INFO */}
        <div className="mt-4">
          <h1 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
            {video.snippet.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-3">
            <p className="text-sm text-gray-600">
              {value_converter(video.statistics.viewCount)} views •{" "}
              {moment(video.snippet.publishedAt).fromNow()}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  icon: assets.Like,
                  label: value_converter(video.statistics.likeCount),
                },
                { icon: assets.Dislike, label: "Dislike" },
                { icon: assets.Share, label: "Share" },
                { icon: assets.Save, label: "Save" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 text-sm"
                >
                  <img src={item.icon} className="w-5" alt="" />
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

              <p
                className={`text-sm text-gray-600 mt-1 max-w-xl whitespace-pre-line ${
                  showMore ? "" : "line-clamp-3"
                }`}
              >
                {video.snippet.description}
              </p>

              {video.snippet.description.length > 200 && (
                <button
                  className="text-sm font-semibold text-gray-700 mt-1 hover:underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "More"}
                </button>
              )}
            </div>
          </div>

          <button className="self-start sm:self-auto bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800">
            Subscribe
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* COMMENTS */}
        {loadingComments ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">Comments are turned off.</p>
        ) : (
          comments.map((item) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div key={item.id} className="flex gap-3 mb-6">
               
                <img
                  src={assets.Jack}
                  alt={comment.authorDisplayName}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">
                      {comment.authorDisplayName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {moment(comment.publishedAt).fromNow()}
                    </span>
                  </div>

                  <p
                    className="text-sm text-gray-700 mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
                  />

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>👍 {value_converter(comment.likeCount)}</span>
                    <button className="hover:underline">Reply</button>
                  </div>
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
