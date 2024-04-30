import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsPage.css';
// Axios instance with baseURL
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [eventIDs, setEventIDs] = useState([]); // State to hold fetched event IDs
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedDeleteId, setSelectedDeleteId] = useState(''); 
  const [newEvent, setNewEvent] = useState({
    Organization: '',
    Date: '',
    Time: '',
    Location: '',
    Description: '',
  });
  const [newUpdate, setUpdate] = useState({
    Organization: '',
    Date: '',
    Time: '',
    Location: '',
    Description: '',
  });

  useEffect(() => {
    fetchEvents();
    fetchIds();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchIds = async () => {
    try {
      const response = await api.get('/api/events/ids');
      setEventIDs(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    try {
      // Using the Axios instance for the POST request
      const response = await api.post('/api/Addevents', newEvent);
      console.log(response.data);
      setNewEvent({ Organization: '', Date: '', Time: '', Location: '', Description: '' }); // Reset form
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const UpdateEvents = async (e) => {
    e.preventDefault();
    console.log(selectedEventId);
    if (!selectedEventId) {
      console.error('No event selected for update.');
      return;
    }
    try {
      const response = await api.put(`/api/events/${selectedEventId}`, newUpdate);
      console.log((`/api/events/${selectedEventId}`, newUpdate));
      console.log(response.data);
      
      setUpdate({ Organization: '', Date: '', Time: '', Location: '', Description: '' }); // Reset update form
      fetchEvents(); // Re-fetch events to update the list
      setSelectedEventId(''); // Reset the selected event ID
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const DeleteEvents = async (e) => {
    e.preventDefault();
    console.log(selectedDeleteId);
    if (!selectedDeleteId) {
      console.error('No event selected for Deletion.');
      return;
    }
    try {
      const response = await api.delete(`/api/DeleteEvents/${selectedDeleteId}`, newUpdate);
      console.log((`/api/DeleteEvents/${selectedDeleteId}`, newUpdate));
      console.log(response.data);
    
      fetchEvents(); // Re-fetch events to update the list
      setSelectedDeleteId(''); // Reset the selected event ID
    } catch (error) {
      console.error('Error Deleting event:', error);
    }
  };

  const handleInputChange = (e) => {
   
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedEventId(e.target.value);
  };
  const handleDeleteChange = (e) => {
    setSelectedDeleteId(e.target.value);
  };


  return (
    <div>
      <h1>Events</h1>
      <form onSubmit={addEvent}>
        <input
          name="Organization"
          value={newEvent.Organization}
          onChange={handleInputChange}
          placeholder="Organization"
          required
        />
        <input
          name="Date"
          type="date"
          value={newEvent.Date}
          onChange={handleInputChange}
          required
        />
        <input
          name="Time"
          type="time"
          value={newEvent.Time}
          onChange={handleInputChange}
          required
        />
        <input
          name="Location"
          value={newEvent.Location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <textarea
          name="Description"
          value={newEvent.Description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <button type="submit">Add Event</button>
      </form>
      <div>
        <div> 
          <h2>Delete an Event</h2>
      <form onSubmit={DeleteEvents}>
          {/* Dropdown to select the event to update */}
          <select value={selectedDeleteId} onChange={handleDeleteChange} required>
            <option value="">Select an Event</option>
            {eventIDs.map((event) => (
              <option key={event.id} value={event.id}>
              {event.Organization ? `${event.Organization} (${event.id})` : `ID: ${event.id}`}
              </option>
            ))}
             </select>
             <button type="submit">Delete Event</button>
             </form>
             </div>
      <h2>Update an Event</h2>
      <form onSubmit={UpdateEvents}>
          {/* Dropdown to select the event to update */}
          <select value={selectedEventId} onChange={handleSelectChange} required>
            <option value="">Select an Event</option>
            {eventIDs.map((event) => (
              <option key={event.id} value={event.id}>
              {event.Organization ? `${event.Organization} (${event.id})` : `ID: ${event.id}`}
              </option>
            ))}
             </select>
        <input
          name="Organization"
          value={newUpdate.Organization}
          onChange={handleUpdateChange}
          placeholder="Organization"
          required
        />
        <input
          name="Date"
          type="date"
          value={newUpdate.Date}
          onChange={handleUpdateChange}
          required
        />
        <input
          name="Time"
          type="time"
          value={newUpdate.Time}
          onChange={handleUpdateChange}
          required
        />
        <input
          name="Location"
          value={newUpdate.Location}
          onChange={handleUpdateChange}
          placeholder="Location"
          required
        />
        <textarea
          name="Description"
          value={newUpdate.Description}
          onChange={handleUpdateChange}
          placeholder="Description"
          required
        />
        <button type="submit">Update Event</button>
</form>
      </div>
      <div>
        <h2>List of Events</h2>
        {Array.isArray(events) &&events.map((event, index) => (
          <div key={index} className="event-listing">
            <h3>{event.Organization}</h3>
            <p>Date: {event.Date}</p>
            <p>Time: {event.Time}</p>
            <p>Location: {event.Location}</p>
            <p>Description: {event.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
