import './Contact.css'
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
//import emailjs from 'emailjs-com'
import emailjs from '@emailjs/browser';




function Contact() {

    const form = React.useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState(''); 
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        
        //print("sendEmail")

        var templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };

          emailjs
          .sendForm('service_1y6l62o', 'template_how6s16', form.current, {
            publicKey: 'e3HrOXBh35PDR-EDP',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              alert("Message sent!");
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };


  return (
    <div className="contact-body">
        <Container className="contact-container">
            <div className="contact-info">
                <Row className="mb-5 mt-3">
                    <Col lg='8'>
                        <h1 className='display-4 mb-4'>
                            Contact Us
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col lg='5' className='mb-5'>
                        <h3 className='color_sec py-4'>Get in touch</h3>
                        <address>
                            <strong>Email: ongoinglivinglearning@gmail.com</strong>
                            <p><strong>Phone : Coming Soon</strong></p>
                            <p><strong>Address : 8685 Rockglen Rd., Arkona, ON, N0M 1B0</strong></p>
                            <br />
                            <p><strong>Operating Hours:</strong></p>
                            <ul>
                                <li>CHEER Group: Mon-Fri 8:00 AM - 4:00 PM (Wed starts at 10:00 AM)</li>
                                <li>CHEER Connections: Fri Summer Nights 5:00 PM - 9:00 PM</li>
                                <li>CHEER Works: Wed-Fri 10:00 AM - 8:00 PM, Sat-Sun 8:00 AM - 8:00 PM</li>
                            </ul>
                        </address>
                        <br />
                        <p>
                        We warmly invite you to reach out to us, whether you're interested in joining our programs, seeking support, or exploring collaboration opportunities. 
                        Our dedicated team is here to answer any questions and share how you can become part of our inclusive community.
                        </p>
                    </Col>
                </Row>
            </div>
            <div className="contact-input">
                <Row>
                    <Col lg='7' className="d-flex align-items-center">
                        <form className='contact_form w-100' onSubmit={sendEmail} ref={form}>
                            <Row>
                                <Col lg='6' className="form-group">
                                    <input 
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value = {name}
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Col>
                                <Col lg='6' className="form-group">
                                    <input 
                                        className="form-control rounded-0"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value = {email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                                <Col lg='6' className="form-group">
                                    <input 
                                        className="form-control rounded-0" id="subject"
                                        name="subject"
                                        placeholder="Subject"
                                        value = {subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        rows="2"
                                    />
                                </Col>
                            </Row>
                            {/* <textarea 
                                    className="form-control rounded-0" id="subject"
                                    name="subject"
                                    placeholder="Subject"
                                    rows="2"
                            ></textarea> */}
                            <textarea 
                                    className="form-control rounded-0" id="message"
                                    name="message"
                                    placeholder="Message"
                                    value = {message}
                                    rows="5"
                                    onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <br />
                            <Row>
                                <Col lg='12' className="form-group">
                                    <button className="btn ac_btn" type="submit" value="Send">Send</button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
  )
}

export default Contact