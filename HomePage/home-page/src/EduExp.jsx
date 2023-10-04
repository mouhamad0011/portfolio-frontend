import React, { useState, useEffect } from 'react';
import './App.css';


const EduExp = ({ data, section }) => {
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [showExperience, setShowExperience] = useState(false);

  const educationIcon = process.env.PUBLIC_URL + './asset/education-svgrepo-com.svg';
  const experienceIcon = process.env.PUBLIC_URL + './asset/work-case-svgrepo-com.svg';

  const toggleExperience = () => {
    setShowExperience(!showExperience);
  };

  useEffect(() => {
    fetchData();
    fetchExperienceData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/education/getAll')
      .then((response) => response.json())
      .then((data) => setEducationData(data.data))
      .catch((error) => console.log(error));
  };

  const fetchExperienceData = () => {
    fetch('http://localhost:5000/experience/getAll')
      .then((response) => response.json())
      .then((data) => setExperienceData(data.data))
      .catch((error) => console.log(error));
  };

 

  return (
    <div id="experience">
      <div className="buttons__education-experience" id="education">
        <button
          className={`btn_education ${!showExperience ? 'active' : ''}`}
          onClick={() => toggleExperience()}
        >
          Education
        </button>
        <button
          className={`btn_experience ${showExperience ? 'active' : ''}`}
          onClick={() => toggleExperience()}
        >
          Experience
        </button>
      </div>

      <div data={showExperience ? experienceData : educationData} section={showExperience ? 'experience' : 'education'}>
        <div className={`wrapper ${section === 'experience' ? 'hidden' : ''}`} id="educationSection">
          <div className="center-line">
            <a href="#" className="scroll-icon">
              <i className="fas fa-caret-up"></i>
            </a>
          </div>
          <img src={showExperience? experienceIcon: educationIcon} alt="Education Icon" className="edu_icon" />
          {showExperience ? (
            experienceData.map((item, index) => (
              <div className={`row ${index % 2 === 0 ? 'row-1' : 'row-2'}`} key={index}>
                <section>
                <i class="icon"></i>
                  <div className="details">
                    <span className="title_education">{item.degree || item.position}</span>
                    <span className="date_education">{item.date}</span>
                    <span className="place_education">{item.place}</span>
                    <p className="description_experience">{item.description}</p>
                  </div>
                </section>
              </div>
            ))
          ) : (
            educationData.map((item, index) => (
              <div className={`row ${index % 2 === 0 ? 'row-1' : 'row-2'}`} key={index}>
                <section>
                     <i class="icon"></i>
                  <div className="details">
                    <span className="title_education">{item.degree || item.position}</span>
                    <span className="date_education">{item.date}</span>
                    <span className="place_education">{item.place}</span>
                    <p className="description_experience">{item.description}</p>
                  </div>
                </section>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EduExp;
