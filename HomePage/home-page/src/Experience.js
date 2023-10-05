import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'; 
import styles from './style.module.css';

function Experience() {
  const [experienceItems, setExperienceItems] = useState([]);
  const [newPosition, setNewPosition] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [editingItemId, setEditingItemId] = useState(null); // State for the item being edited
  const [infos,setInfos]=useState(true);


  useEffect(() => {
    fetch('http://localhost:5000/experience/getAll')
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then((data) => {
        setExperienceItems(data.data);
      })
      .catch(() => {
        console.error('Error in fetching');
      });
  }, [infos]);

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (newPosition && newDate && newPlace && newDescription) {
      const newExperienceItem = {
        position: newPosition,
        date: newDate,
        place: newPlace,
        description: newDescription,
      };
      await fetch('http://localhost:5000/experience/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperienceItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setExperienceItems([...experienceItems, data]);
          setNewPosition('');
          setNewDate('');
          setNewPlace('');
          setNewDescription('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error adding experience:', error));
    }
  };

  const handleEditExperience = async () => {
    if (editingItemId) {
      const editedExperienceItem = {
        position: newPosition,
        date: newDate,
        place: newPlace,
        description: newDescription,
      };
      await fetch(`http://localhost:5000/experience/update/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedExperienceItem),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedExperienceItems = experienceItems.map((item) =>
            item._id === editingItemId ? data : item
          );
          setExperienceItems(updatedExperienceItems);
          setEditingItemId(null);
          setNewPosition('');
          setNewDate('');
          setNewPlace('');
          setNewDescription('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error editing experience:', error));
    }
  };

  const startEditing = (id) => {
    setEditingItemId(id);
    const itemToEdit = experienceItems.find((item) => item._id === id);
    if (itemToEdit) {
      setNewPosition(itemToEdit.position);
      setNewDate(itemToEdit.date);
      setNewPlace(itemToEdit.place);
      setNewDescription(itemToEdit.description);
    }
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setNewPosition('');
    setNewDate('');
    setNewPlace('');
    setNewDescription('');
  };
  const handleDeleteExperience = async (id) => {
    try {
      await fetch(`http://localhost:5000/experience/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          const updatedExperienceItems = experienceItems.filter(
            (item) => item._id !== id
          );
          setExperienceItems(updatedExperienceItems);
          setInfos(!infos);
        })
        .catch((error) => {
          console.error('Error deleting experience:', error);
        });
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };
  
  return (
    <div className={styles.Experience}>
      <h1>Experiences</h1>
      <ul id={styles['experience-list']}>
        {experienceItems.map((item) => (
          <li key={item._id}>
            {item.position}, {item.date}, {item.place}
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="fa-lg delete"
              onClick={() => handleDeleteExperience(item._id)}
            />
            <FontAwesomeIcon
              icon={faEdit}
              className="fa-lg edit"
              onClick={() => startEditing(item._id)}
            />
          </li>
        ))}
      </ul>
      <h2>{editingItemId ? 'Edit Experience' : 'Add New Experience'}</h2>
      <form id={styles['add-experience-form']} onSubmit={handleAddExperience}>
        <input
          type="text"
          placeholder="Position"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Place"
          value={newPlace}
          onChange={(e) => setNewPlace(e.target.value)}
        />
        {editingItemId ? (
          <>
            <button
              type="button"
              onClick={handleEditExperience}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                width: '80px',
                marginRight: '10px',
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                width: '80px',
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            style={{
              padding: '5px 10px',
              fontSize: '14px',
              width: '80px',
            }}
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
}

export default Experience;
