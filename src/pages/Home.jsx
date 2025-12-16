import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export default function Home({ sidebar }) {
  return (
    <div className="flex pt-20">
      {/* Sidebar */}
      <Sidebar sidebar={sidebar} />
  {/* Feed */}
      <div
        className={`flex-1 transition-all duration-300`}
        style={{ marginLeft: sidebar ? "5rem" : "15rem" }}
      >
        <Feed />
      </div>

    </div>
  );
}
