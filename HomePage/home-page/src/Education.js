import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [newDegree, setNewDegree] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [infos,setInfos]=useState(true);
  useEffect(() => {
    fetch('http://localhost:5000/education/getAll')
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then((data) => {
        setEducationItems(data.data);
      })
      .catch(() => {
        console.error('Error in fetching');
      });
  }, [infos]);

  const handleAddEducation = async (e) => {
    e.preventDefault();
    if (newDegree && newDate && newPlace) {
      const newEducationItem = {
        degree: newDegree,
        date: newDate,
        place: newPlace,
      };
     await fetch('http://localhost:5000/education/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEducationItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setEducationItems([...educationItems, data]);
          setNewDegree('');
          setNewDate('');
          setNewPlace('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error adding education:', error));
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      await fetch(`http://localhost:5000/education/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          const updatedEducationItems = educationItems.filter(
            (item) => item._id !== id
          );
          setEducationItems(updatedEducationItems);
        })
        .catch((error) => {
          console.error('Error deleting education:', error);
        });
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };
  

  return (
    <div className={styles.Education}>
    <h1>Educations</h1>
    <ul id={styles['education-list']}>
      {educationItems && educationItems.map((item) => (
        <li key={item._id}>
          {item.degree}, {item.date}, {item.place}&nbsp;&nbsp;
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="fa-solid fa-trash-can fa-lg delete"
            onClick={() => handleDeleteEducation(item._id)}
          />
        </li>
      ))}
    </ul>
    <h2>Add New Education</h2>
    <form id={styles['add-education-form']} onSubmit={handleAddEducation}>
      <input
        type="text"
        placeholder="Degree"
        value={newDegree}
        onChange={(e) => setNewDegree(e.target.value)}
      /><br/>
      <input
        type="text"
        placeholder="Date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      /><br/>
      <input
        type="text"
        placeholder="Place"
        value={newPlace}
        onChange={(e) => setNewPlace(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  </div>
  );
}

export default Education;
