import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProfileForm.css';

const AddProfileForm = ({ onAddProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    imageFile: null, 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const profileWithImage = { ...formData, image: reader.result };
      onAddProfile(profileWithImage); 
    };

    if (formData.imageFile) {
      reader.readAsDataURL(formData.imageFile);
    } else {
      onAddProfile(formData); 
    }

    navigate('/athelete'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Your Profile</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <label>Bio:</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        required
      />
      <label>Image:</label>
      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Add Profile</button>
    </form>
  );
};

export default AddProfileForm;
