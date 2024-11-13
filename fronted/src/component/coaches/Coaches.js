import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Coaches = () => {
  const [profiles, setProfiles] = useState([
    {
      name: 'John Doe',
      age: 25,
      bio: 'Professional athlete with 5 years of experience in athletics.',
      image: 'https://media.istockphoto.com/id/1125038961/photo/young-man-running-outdoors-in-morning.jpg?s=1024x1024&w=is&k=20&c=n93U-5CVLB-0d4jnOcNXqcTo0Msd4O6iPqi0FJKVncU=',
    },
    {
      name: 'Jane Smith',
      age: 30,
      bio: 'Experienced coach specializing in track and field.',
      image: 'https://media.istockphoto.com/id/1176094106/photo/superb-male-athlete-showing-motivation-and-conditioning.jpg?s=1024x1024&w=is&k=20&c=Ra4AO2SlWU2IzRezMA1vrH-JkgBgLcu4wm7ug6IYet8=',
    },
    {
      name: 'John Wohn',
      age: 25,
      bio: 'Professional athlete with 5 years of experience in athletics.',
      image: 'https://images.unsplash.com/photo-1726013878575-7602eb03998b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXRoZWxldGUlMjBtYW58ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'Alice',
      age: 20,
      bio: 'Professional athlete with 5 years of experience in athletics.',
      image: 'https://media.istockphoto.com/id/615883260/photo/difficult-doesnt-mean-impossible.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wl9-JMMd5yE7iJs6867lF2XLGaycehFXn2TOckWR8LY=',
    },
    {
      name: 'Peter',
      age: 40,
      bio: 'Professional athlete with 5 years of experience in athletics.',
      image: 'https://media.istockphoto.com/id/500284633/photo/portrait-of-male-athlete-in-gym-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=epJjxXNSpCaTCHUBvDdQMlHD7pVY18eat7siSsQdP4I=',
    },
  ]);

  const navigate = useNavigate();

  const handleAddProfile = (newProfile) => {
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]); 
    navigate('/athlete'); 
  };

  return (
    <div className="profile-container">
      <h1>Manage Athlete/Coach Profiles</h1>
      <button onClick={() => navigate('/add-profile')} className="add-profile-button">
        Add Your Profile
      </button>
      <div className="profile-cards">
        {profiles.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Coaches;
