import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';
import { userApi } from '../../../store/Api';

function Profile() {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [edited, setEdited] = useState(0);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios.get(`${userApi}profile`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.user);
        setOpen(response.data.user.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [edited]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setPreview(url);
      setOpen(true)
    }
  };

  const submitUpdates = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    axios.post(`${userApi}editProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((response) => {
        setImage(response.data.image);
        setEdited(1);
        setOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Profile</h1>

        {open ? (
          <div className="card-avatar">
            <img style={{ width: "10rem" }} src={`${userApi}profileImages/${userData.image}`} alt="profile Image" />
          </div>
        ) : (
          <img style={{ width: "10rem", paddingBottom: "1rem" }} src={preview} alt="profile Image" />
        )}

        <div className="form-group">
          <label>First Name :<span className='span-profile'>{userData ? userData.firstname : ""}</span></label>
        </div>
        <div className="form-group">
          <label>Last Name :<span className='span-profile'>{userData ? userData.lastname : ""}</span></label>
        </div>
        <div className="form-group">
          <label>Email :<span className='span-profile'>{userData ? userData.email : ""}</span></label>
        </div>
        <div className="form-group">
          <label>Phone :<span className='span-profile'>{userData ? userData.phone : ""}</span></label>
        </div>
        <div className='btn-div'>
          <label>Change Photo :</label>
          <input className='file' encType="multipart/form-data" onChange={handleImage} type="file" />
        </div>
        <button className="btn btn-primary mt-3" onClick={submitUpdates}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default Profile;
