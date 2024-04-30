import { useState } from "react";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Review.css';

export default function PostCarousel(){
  const images = [
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    },
    {
        name: "Name",
        post: "TEST",
        date: "2021-10-10"
    }
  ];
  return (
    <div>
      <h1>Reviews</h1>
      <Carousel className="carousel-container" autoplay infiniteLoop interval={500} centerMode>
        {
          images.map((image, index) => 
            <div key={index} className="test">
                <h1>{image.name}</h1>
                <p>{image.post}</p>
                <p>{image.date}</p>
            </div>)
        }
      </Carousel>
    </div>
  );
}