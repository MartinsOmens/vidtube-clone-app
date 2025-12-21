import React, { useState } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export default function Home({ sidebar }) {

  const [category, setCategory] = useState("0");
  return (
    <div className="flex pt-20">
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div
        className={`flex-1 transition-all duration-300`}
        style={{ marginLeft: sidebar ? "5rem" : "15rem" }}
      >
        <Feed category={category} setCategory={setCategory} />
      </div>
    </div>
  );
}
