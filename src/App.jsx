import './App.css'
import React from "react";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";




function Home() {
  return (
    <>
    <Header/>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer/>
    </>
  );
}

export default Home;