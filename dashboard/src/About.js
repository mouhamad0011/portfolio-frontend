import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function About() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [aboutData, setAboutData] = useState({});
  const [infos,setInfos]=useState(true);
  useEffect(() => {
    fetch('http://localhost:5000/about/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then((data) => {
        setAboutData(data.data[0]);
        setProfilePhoto(data.data[0].image);
        setAboutDescription(data.data[0].description);
      })
      .catch((error) => {
        console.error('Error in fetching:', error);
      });
  }, [infos]);

  const fileInput = useRef(null);

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleDescriptionChange = (e) => {
    setAboutDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!profilePhoto) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', profilePhoto);

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
        formData
      );
      const imageUrl = response.data.data.url;
      setProfilePhoto(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
      try {
        const response2 = await fetch(`http://localhost:5000/about/update/${aboutData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: imageUrl,
            description: aboutDescription,
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
      console.error('Error uploading image:', error);
    }
  };

  const saveDescription = async () => {
    try {
      const response = await fetch(`http://localhost:5000/about/update/${aboutData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: profilePhoto,
          description: aboutDescription,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAboutData(responseData.data[0]);
        setIsEditing(false);
        console.log('Updated description');
      } else {
        console.error('Error updating description');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      toggleEdit();
      saveDescription();
    }
  };

  return (
    <div className="About">
      <h2>About</h2>
      <div className="imgcontainer">
        <img
          src={profilePhoto}
          className="picture"
          id="profile-photo"
          alt="Profile"
        />
        <FontAwesomeIcon
          icon={faPlus}
          className="fa-solid fa-plus"
          id="upload-icon"
          onClick={() => fileInput.current.click()}
        />
        <form action=''>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInput}
        />
        <button onClick={handleUpload}>Upload Image</button>
        </form>
      </div>
      <div className="description">
        {isEditing ? (
          <div>
            <textarea
              id="about-description"
              value={aboutDescription}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={saveDescription}>Save</button>
          </div>
        ) : (
          <div>
            <p id="about-description">
              {aboutData?.description || aboutDescription}
              <FontAwesomeIcon
                icon={faSquarePen}
                className="fa-sharp fa-solid fa-square-pen"
                id="pencil"
                onClick={toggleEdit}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
