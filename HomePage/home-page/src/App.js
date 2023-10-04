import React from 'react';
import './App.css';
import About from './About.jsx';
import EduExp from './EduExp.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
function App() {
  return (
    <div style={{background:'linear-gradient(-45deg, #222831 , #222831a9)'}}>
    <About/>
    <EduExp/>
    <Skills/>
    <Projects/>
    <Contact/>
    </div>
  );
}

export default App;
