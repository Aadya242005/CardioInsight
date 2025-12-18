import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Results from "./components/Results";
import Visuals from "./components/Visuals";
import Analysis from "./components/Analysis";
import Consultation from "./components/Consultation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Results />
      <Visuals />
      <Analysis />
      <Consultation />
      <Footer />
    </div>
  );
};

export default App;
