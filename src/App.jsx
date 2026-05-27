import { useEffect, useState } from "react";

import "./index.css";

import LandingPage from "./components/hero/landing.jsx";
import Education from "./components/edu/education.jsx";
import Experience from "./components/exp/experience.jsx";
import Blog from "./components/blogs/blog.jsx";

function App() {
  return (
    <>
      <LandingPage />
      <Education />
      <Experience />
      <Blog />
    </>
  );
}

export default App;