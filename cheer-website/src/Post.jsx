import { useState, useEffect } from "react";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Post.css';
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust accordingly
});

export default function PostCarousel(){
  const [posts, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.get('/api/blog');
      setEvents(response.data);
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <Carousel className="carousel-container" autoplay infiniteLoop interval={500} centerMode>
        {
          posts.map((post) => (
            <div className="test2">
                 <h2>{post.title}</h2>
                 <p>{post.content}</p>
                 <p>{post.createdBy}</p>
            </div>
          ))
        }
      </Carousel>
    </div>
  );
}