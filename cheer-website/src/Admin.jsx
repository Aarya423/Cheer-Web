import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventsPage from './components/Admin/EventsPage';
import UserManagement from './components/Admin/UserManagement';
import Gallery from './components/admin/Gallery';
import BlogPage from './components/admin/BlogPage';
import Newsletter from './components/admin/Newsletter';

function Admin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
       <h1>
          <Link to="Admin/events"><button1 style={{ margin: '20px', marginRight:'15px' }}>Events</button1></Link>
          <Link to="Admin/blogs"><button1 style={{ margin: '20px', marginRight:'15px' }}>Blogs</button1></Link>
          <Link to="Admin/users"><button1 style={{ margin: '20px', marginRight:'15px' }}>User Management</button1></Link>
          <Link to="Admin/gallery"><button1 style={{ margin: '20px', marginRight:'15px' }}>Gallery</button1></Link>
          <Link to="Admin/newsletter"><button1 style={{ margin: '20px', marginRight:'15px' }}>Newsletter</button1></Link>
        </h1>

      </div>
      <Routes>
        <Route path="Admin/events" element={<EventsPage />} />
        <Route path="Admin/blogs" element={<BlogPage />} />
        <Route path="Admin/users" element={<UserManagement />} />
        <Route path="Admin/gallery" element={<Gallery />} />
        <Route path="Admin/newsletter" element={<Newsletter />} />
      </Routes>
    </div>
  );
}

export default Admin;
