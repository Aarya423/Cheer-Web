import React from 'react';
import './ApplicationForm.css'; // Importing the CSS file for styling

const ApplicationForms = () => {
  return (
    <div className="application-forms">
      <h2>Our Application Forms</h2>
      <ul>
        <li>
          <a href="https://docs.google.com/document/d/1GbLAj8M7l4bvNb1Ljiis60jjp2myPwsi30-r5S9IxLU/edit?usp=drive_link" target="_blank" rel="noopener noreferrer">Photo / Video Consent Form</a>
        </li>
        <li>
          <a href="https://docs.google.com/document/d/1gL0ngKTv1L_JatlsQtNxpR8Km7WSkyxMvqJ4axz5ngY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Emergency Contact Form</a>
        </li>
        <li>
          <a href="https://docs.google.com/document/d/1YaYnbaQxPrdH0l1WNjBPEHsOrMVtw75J3lffd_Jt418/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Participant Profile</a>
        </li>
        <li>
          <a href="https://drive.google.com/file/d/1tfAvM3N1_vVPeQNnJPSCZzcPpypDeoye/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Rules & Guidelines</a>
        </li>
        <li>
          <a href="https://docs.google.com/document/d/1HK3m-dMIRXlUC_f0Mvy02WiULBoLTThw9saVUwg-tJY/edit?usp=drive_link" target="_blank" rel="noopener noreferrer">Code of Conduct</a>
        </li>
      </ul>
    </div>
  );
}

export default ApplicationForms;
