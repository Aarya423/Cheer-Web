import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios instance with baseURL
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        Title: '',
        Content: '',
        createdBy: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/api/blog');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const addBlog = async (e) => {
        e.preventDefault(); // Prevents the form from refreshing the page
        try {
            // Using the Axios instance for the POST request
            const response = await api.post('/api/addblog', newBlog);
            console.log(response.data);
            setNewBlog({ Title: '', Content: '', createdBy: '' }); // Reset form
            fetchBlogs(); // Refresh the blogs list
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await api.delete(`/api/DeleteBlog/${id}`);
            fetchBlogs(); // Refresh the blogs list
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const updateBlog = async (blog) => {
        try {
            await api.put(`/api/blog/${blog._id}`, blog); // Send the updated blog object to the backend
            fetchBlogs(); // Refresh the blogs list
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Blogs</h1>
            <form onSubmit={addBlog}>
                <div>
                    <label htmlFor="Title">Title: </label>
                    <input
                        id="Title"
                        name="Title"
                        value={newBlog.Title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Content">Content: </label>
                    <input
                        id="Content"
                        name="Content"
                        value={newBlog.Content}
                        onChange={handleInputChange}
                        placeholder="Content"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="createdBy">Created By: </label>
                    <input
                        id="createdBy"
                        name="createdBy"
                        value={newBlog.createdBy}
                        onChange={handleInputChange}
                        placeholder="Created By"
                        required
                    />
                </div>
                <button type="submit">Add Blog</button>
            </form>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog._id}>
                        {/* Editable Title */}
                        <div>
                            <label htmlFor={`title_${blog._id}`}>Title: </label>
                            <input
                                id={`title_${blog._id}`}
                                type="text"
                                value={blog.title}
                                onChange={(e) => setBlogs(prevBlogs => prevBlogs.map(prevBlog => {
                                    if (prevBlog._id === blog._id) {
                                        return {...prevBlog, title: e.target.value};
                                    }
                                    return prevBlog;
                                }))}
                            />
                        </div>
                        {/* Editable Content */}
                        <div>
                            <label htmlFor={`content_${blog._id}`}>Content: </label>
                            <input
                                id={`content_${blog._id}`}
                                type="text"
                                value={blog.content}
                                onChange={(e) => setBlogs(prevBlogs => prevBlogs.map(prevBlog => {
                                    if (prevBlog._id === blog._id) {
                                        return {...prevBlog, content: e.target.value};
                                    }
                                    return prevBlog;
                                }))}
                            />
                        </div>
                        {/* Date */}
                        <p><label>Created At: </label>{blog.createdAt}</p>
                        {/* CreatedBy */}
                        <p><label>Created By: </label>{blog.createdBy}</p>
                        <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                        <button onClick={() => updateBlog(blog)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogPage;


