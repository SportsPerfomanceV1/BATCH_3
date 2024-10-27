import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onDelete }) => {
  return (
    <div className="profile-card">
      <img src={profile.image} alt={profile.name} className="profile-image" />
      <h3>{profile.name}</h3>
      <p>Age: {profile.age}</p>
      <p>{profile.bio}</p>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProfileCard;
