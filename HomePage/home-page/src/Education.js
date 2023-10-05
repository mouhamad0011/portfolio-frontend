import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [newDegree, setNewDegree] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [editingItemId, setEditingItemId] = useState(null); // State for the item being edited
  const [infos, setInfos] = useState(true);

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

  const handleEditEducation = async () => {
    if (editingItemId) {
      const editedEducationItem = {
        degree: newDegree,
        date: newDate,
        place: newPlace,
      };
      await fetch(`http://localhost:5000/education/update/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEducationItem),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedEducationItems = educationItems.map((item) =>
            item._id === editingItemId ? data : item
          );
          setEducationItems(updatedEducationItems);
          setEditingItemId(null);
          setNewDegree('');
          setNewDate('');
          setNewPlace('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error editing education:', error));
    }
  };

  const startEditing = (id) => {
    setEditingItemId(id);
    const itemToEdit = educationItems.find((item) => item._id === id);
    if (itemToEdit) {
      setNewDegree(itemToEdit.degree);
      setNewDate(itemToEdit.date);
      setNewPlace(itemToEdit.place);
    }
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setNewDegree('');
    setNewDate('');
    setNewPlace('');
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
          setInfos(!infos);
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
        {educationItems.map((item) => (
          <li key={item._id}>
            {item.degree}, {item.date}, {item.place}&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="fa-solid fa-trash-can fa-lg delete"
              onClick={() => handleDeleteEducation(item._id)}
            />
            <FontAwesomeIcon
              icon={faEdit}
              className="fa-lg edit"
              onClick={() => startEditing(item._id)}
            />
          </li>
        ))}
      </ul>
      <h2>{editingItemId ? 'Edit Education' : 'Add New Education'}</h2>
      <form id={styles['add-education-form']} onSubmit={handleAddEducation}>
        <input
          type="text"
          placeholder="Degree"
          value={newDegree}
          onChange={(e) => setNewDegree(e.target.value)}
        />
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
              onClick={handleEditEducation}
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

export default Education;
