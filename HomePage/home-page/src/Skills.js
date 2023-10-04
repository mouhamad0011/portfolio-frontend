import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import plus from './plus.jpg';
import styles from './style.module.css';
function Skills() {
  const [skills, setSkills] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillImage, setNewSkillImage] = useState('');
  const [infos, setInfos] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/skills/getAll')
      .then((response) => response.json())
      .then((data) => setSkills(data.data))
      .catch((error) => console.error('Error fetching skills:', error));
  }, [infos]);

  const handleDeleteSkill = (skillId) => {
    fetch(`http://localhost:5000/skills/delete/${skillId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSkills = skills.filter((skill) => skill._id !== data._id);
        setSkills(updatedSkills);
        setInfos(!infos);
      })
      .catch((error) => console.error('Error deleting skill:', error));
  };

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setNewSkillName('');
    setNewSkillImage(null);
  };

  const handleSkillImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewSkillImage(imageFile);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', newSkillImage);

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
        formData
      );
      const imageUrl = response.data.data.url;
      setNewSkillImage(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
      try {
        const response2 = await fetch(`http://localhost:5000/skills/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: imageUrl,
            name:newSkillName
          }),
        });
      
        if (!response2.ok) {
          throw new Error(`errorrr`);
        }
        const responseData = await response2.json();
        console.log(responseData);
        handlePopupClose();
        setInfos(!infos);
      } catch (error) {
        console.error(error);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className={styles.Skills}>
      <h1 className={styles.title}>
        My <span>Tech Stack</span>
      </h1>
      <div className={styles["image-gallery"]}>
        {skills && skills.map((skill) => (
          <div className={styles["image-item"]} key={skill._id}>
            <img src={skill.image} alt={`Image ${skill.name}`} />
            <p>{skill.name}</p>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="fa-lg delete"
              style={{ color: 'white' }}
              onClick={() => handleDeleteSkill(skill._id)}
            />
          </div>
        ))}
        <div className={styles["image-item"]}>
          <img src={plus} alt="" onClick={handlePopupOpen} />
          <p>Add more</p>
        </div>
      </div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles["popup-content"]}>
            <span className={styles["close-popup"]} onClick={handlePopupClose}>
              &times;
            </span>
            <h2>Add a New Skill</h2>
            <form onSubmit={handleAddSkill}>
              <input
                type="file"
                id={styles["image-upload"]}
                accept="image/*"
                onChange={handleSkillImageChange}
                required
              />
              <input
                type="text"
                id={styles["skill-name"]}
                placeholder="Skill Name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                required
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default Skills;
