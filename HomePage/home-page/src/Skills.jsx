import React, { useState, useEffect } from 'react';
import './App.css'


function Skills() {
  const [skills, setSkills] = useState([]);
  const [infos, setInfos] = useState('');

  useEffect(() => {
    fetch('https://jihan-shamas2397.onrender.com/skills/getAll')
      .then((response) => response.json())
      .then((data) => setSkills(data.data))
      .catch((error) => console.error('Error fetching skills:', error));
  }, [infos]);

 
  return (
    <div className="Skills" id="Skills">
      <h1 className="atitle">
        My <span className='.span'>Tech Stack</span>
      </h1>
      <div className="image-gallery">
        {skills &&
          skills.map((skill) => (
            <div className="image-item" key={skill._id}>
              <img
                src= {skill.image}
                alt={`Image ${skill.name}`}
              />
              <p>{skill.name}</p>
              
            </div>
          ))}
       
      </div>
      
    </div>
  );
}

export default Skills;