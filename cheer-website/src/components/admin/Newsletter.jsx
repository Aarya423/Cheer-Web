import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust this to your actual API base URL
});

function Newsletter() {
  const [emailSent, setEmailSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const sendEmail = async () => {
    try {
      const response = await api.post('/api/sendEmail', { subject, text });
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Text"
      />
      <button onClick={sendEmail}>Send Email</button>
      {emailSent && <p>Email sent!</p>}
    </div>
  );
}

export default Newsletter;