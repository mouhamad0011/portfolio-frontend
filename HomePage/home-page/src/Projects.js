import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import styles from "./style.module.css";

function Projects() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [infos, setInfos] = useState(true);
  const [image,setImage]=useState('');
  const [projects, setProjects] = useState([]);
  const fileInput = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/projects/getAll')
      .then((response) => response.json())
      .then((data) => setProjects(data.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, [infos]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
        formData
      );
      const imageUrl = response.data.data.url;
      setImage(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
      try {
        const response2 = await fetch(`http://localhost:5000/projects/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:projectName,
            image: imageUrl,
            description: projectDescription,
            link:projectLink
          }),
        });
      
        if (!response2.ok) {
          throw new Error(`errorrr`);
        }
        const responseData = await response2.json();
        console.log(responseData);
        setInfos(!infos);
      } catch (error) {
        console.error(error);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleDeleteProject = (projectId) => {
    fetch(`http://localhost:5000/projects/delete/${projectId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedProjects = projects.filter((project) => project._id !== data._id);
        setProjects(updatedProjects);
        setInfos(!infos);
      })
      .catch((error) => console.error('Error deleting project:', error));
  };

  return (
    <div className={styles.Projects}>
      <h1>Projects</h1>
      <ul id={styles["projects-list"]}>
        {projects && projects.map((project) => (
          <li key={project._id}>
            <div>
              <h3>{project.name}<a href={project.link}>{project.link}</a></h3>
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
          </li>
        ))}
      </ul>
  
      <h2>Add New Project</h2>
      <form id={styles["add-project-form"]} onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Name"
          id={styles["project-name"]}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        /><br/>
        <input
          type="file"
          name="image"
          id={styles["project-image"]}
          onChange={handleFileChange}
          ref={fileInput}
        /><br/>
        <textarea
          name="description"
          id={styles["project-description"]}
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        ></textarea><br/>
        <input
          type="text"
          placeholder="Project Link"
          id={styles["project-link"]}
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        /><br/>
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
