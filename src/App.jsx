import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Video from "./pages/Video";

function App() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div>
      <Navbar sidebar = {sidebar} setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element = {<Video/>}/>
      </Routes>
    </div>
  );
}

export default App;
