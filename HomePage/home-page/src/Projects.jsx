import './App2.css';

import React, { useEffect, useState } from 'react';


const Projects = ({ name, image, description, link }) => {

  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetchProjectsData()
  }, []);

  const fetchProjectsData = () => {
    fetch('https://jihan-shamas2397.onrender.com/projects/getAll') 
      .then((response) => response.json())
      .then((data) => setProjectsData(data.data))
      .catch((error) => console.log(error));
  };


  return (
    <div className="containerproject" id="projects">
      <h3 className='TITLE' style={{ fontSize: 35, color: "aliceblue", textAlign: "center" }}>
        Latest <span style={{ color: "#68E0CF" }}>Works</span>
      </h3>
      {projectsData.map((item, index) => (
          <div key={index}>
      <div className="project1">
        <div className="projectimg">
          <img src={item.image} className="sizeimg" alt={item.name} />
        </div>
        <div className="content1">
          <div className="project">
            <a href={item.link} style={{ color: "#68E0CF" }}>
              {item.name}
            </a>
          </div>
          <div className="project-description">
            {item.description}
          </div>

          

        </div>
      </div> 
          </div>
        ))}
    </div>
  );
};

export default Projects;