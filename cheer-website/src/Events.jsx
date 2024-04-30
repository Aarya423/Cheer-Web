import React from 'react';
import './Events.css';

const Events = ({ imageSrc, title, buttonText, footerText, paragraph }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{title}</h3>
        <p>{paragraph}</p>
      </div>
      <div className="card-footer">
        <p>{footerText}</p>
      </div>
    </div>
  );
};

export default Events;