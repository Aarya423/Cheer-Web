import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavbarGuest from './NavbarGuest'
import AboutUs from './AboutUs'
import Carousel from './Carousel'
//import Events from './Events' NOT THERE
import Contact from './Contact'
//import PostCarousel from './Post' NOT THERE
import ReviewCarousel from './Review'
import './HomePageGuest.css' 

function HomePageGuest() {
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
        <NavbarGuest/>
        <div className="landingPageGuest">
            <h1>CHEER</h1>
            <img alt="react logo" src="https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
        <div>
            <div className="pictures" id="pictures">
            <Carousel />
            </div>
            <div id="about"><AboutUs /></div>
            <div className="events-container" id="events">
            </div>
            <div className="reviews-container" id="reviews">
            <div id="contact" classname="contact"><Contact /></div>
            </div>
        </div>
        </>
    );
}

export default HomePageGuest;