import React, { useState } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export default function Home({ sidebar }) {
  const [category, setCategory] = useState("0");

  return (
    <div className="pt-20">
      {/* Sidebar */}
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300
          ml-0
          ${sidebar ? "md:ml-20 lg:pl-6" : "md:ml-60 lg:pl-6"}
        `}
      >
        <Feed category={category} />
      </main>
    </div>
  );
}
