import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLink, setNewLink] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [infos, setInfos] = useState(true);
  const [image, setImage] = useState('');
  const fileInput = useRef(null);

  useEffect(() => {
    fetch('https://jihan-shamas2397.onrender.com/projects/getAll')
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.data);
      })
      .catch(() => {
        console.error('Error in fetching');
      });
  }, [infos]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(
        'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const imageUrl = (await response.json()).data.url;

      const newProject = {
        name: newName,
        image: imageUrl,
        description: newDescription,
        link: newLink,
      };

      await fetch('https://jihan-shamas2397.onrender.com/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects([...projects, data]);
          setNewName('');
          setNewDescription('');
          setNewLink('');
          setImage('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error adding project:', error));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEditProject = async () => {
    if (editingProjectId) {
      let editedImageURL = projects.find(
        (project) => project._id === editingProjectId
      ).image;

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        try {
          const response = await fetch(
            'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
            {
              method: 'POST',
              body: formData,
            }
          );

          if (response.ok) {
            editedImageURL = (await response.json()).data.url;
            console.log(editedImageURL);
          } else {
            throw new Error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

      const editedProject = {
        name: newName,
        description: newDescription,
        link: newLink,
        image: editedImageURL
      };

      await fetch(`https://jihan-shamas2397.onrender.com/projects/update/${editingProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProject),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedProjects = projects.map((project) =>
            project._id === editingProjectId ? data : project
          );
          setProjects(updatedProjects);
          setEditingProjectId(null);
          setNewName('');
          setNewDescription('');
          setNewLink('');
          setImage('');
          setInfos(!infos);
        })
        .catch((error) => console.error('Error editing project:', error));
    }
  };

  const startEditing = (id) => {
    setEditingProjectId(id);
    const projectToEdit = projects.find((project) => project._id === id);
    if (projectToEdit) {
      setNewName(projectToEdit.name);
      setNewDescription(projectToEdit.description);
      setNewLink(projectToEdit.link);
    }
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
    setNewName('');
    setNewDescription('');
    setNewLink('');
    setImage('');
  };

  const handleDeleteProject = async (id) => {
    try {
      await fetch(`https://jihan-shamas2397.onrender.com/projects/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          const updatedProjects = projects.filter((project) => project._id !== id);
          setProjects(updatedProjects);
          setInfos(!infos);
        })
        .catch((error) => {
          console.error('Error deleting project:', error);
        });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className={styles.Projects}>
      <h1>Projects</h1>
      <ul id={styles['projects-list']}>
        {projects.map((project) => (
          <li key={project._id}>
            {editingProjectId === project._id ? (
              <>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                />
                <br />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  ref={fileInput}
                />
                <br />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
                <br />
                <button
                  type="button"
                  onClick={handleEditProject}
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
              <>
                <div>
                  <h3>
                    {project.name}
                    <a href={project.link}>{project.link}</a>
                  </h3>
                  <p>{project.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    width: '80px',
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(project._id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    width: '80px',
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
      <form id={styles['add-project-form']} onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Project Link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <br />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          ref={fileInput}
        />
        <br />
        <textarea
          name="description"
          placeholder="Project Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        ></textarea>
        <br />
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
      </form>
    </div>
  );
}

export default Projects;
