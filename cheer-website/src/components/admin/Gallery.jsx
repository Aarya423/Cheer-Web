import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust this to your actual API base URL
});

function Gallery() {
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await api.get('/api/image');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const addImage = async (url) => {
    try {
      await api.post(`/api/addimage/${url}`);
      fetchImages(); // Refresh the gallery
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const removeImage = async (url) => {
    try {
      await api.delete(`/api/image/${url}`);
      fetchImages(); // Refresh the gallery
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addImage(newImageUrl);
    setNewImageUrl(''); // Reset the input field
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Enter image URL"
          required
        />
        <button type="submit">Add Image</button>
      </form>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.URL} alt={`Gallery item ${index}`} style={{ width: "100px", height: "100px" }} />
            <button onClick={() => removeImage(image.URL)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
