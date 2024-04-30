import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'
import AboutUs from './AboutUs'
import Carousel from './Carousel'
import Events from './Events'
import Contact from './Contact'
import axios from 'axios'
import PostCarousel from './Post'
import ReviewCarousel from './Review'
import ApplicationForm from './ApplicationForm'
import './HomePage.css'
const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust accordingly
});

function HomePage() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.get('/api/events');
      setEvents(response.data);
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const images = [
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    
    <>
      <Navbar/>
      <div className="landingPage">
        <h1>CHEER</h1>
        <img alt="react logo" src="https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600" />
      </div>
      <div>
        <div className="pictures" id="pictures">
          <Carousel />
        </div>
        <div id="about"><AboutUs /></div>
        <div className="events-container" id="events">
          {events.map((event) => (
            <Events
              className="event"
              title={event.Organization}
              footerText={event.Location + ": " + event.Date + ", " + event.Time}
              paragraph={event.Description}
            />
          ))}
        </div>
        <br />
        <div id="posts">
          <PostCarousel />
        </div>
        <br />
      </div>
      <div id="form">
        <ApplicationForm />
      </div>
      <div id="contact"><Contact /></div>
    </>
  )
}

export default HomePage