const User = require('../models/user.js');
const Blog = require('../models/blog.js');
const Image = require('../models/image.js');
const Event = require('../models/events.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const adminRoutes = express.Router();
adminRoutes.use(bodyParser.json());
adminRoutes.use(cors({origin: 'https://cheer-deployment-p7mr6z7ola-pd.a.run.app'}));
  const port = 8080;

//Add Event Post
adminRoutes.post('/Addevents', async (req, res) => {
    const { Organization, Date, Time, Location, Description } = req.body;
    const newEvents = new Event({ Organization: Organization, Date: Date, Time: Time, Location: Location, Description: Description });
    try {
        await newEvents.save();
        res.status(201).json({ message: 'Event Added' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }adminRoutes.use(express.json());

});


adminRoutes.get('/events/ids', async (req, res) => {
    Event.find({}, '_id Organization Description').then(docs => {
        // Assuming you want to send back the IDs, Organization, and Description
        const events = docs.map(doc => ({
            id: doc._id,
            Organization: doc.Organization,
            Description: doc.Description
        }));
        res.status(200).json(events);
    }).catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

//Modify Event
adminRoutes.put('/events/:id', async (req, res) => {
    const id = req.params.id;
    const { Organization, Date, Time, Location, Description } = req.body;
    try {
        await Event.updateOne({ _id: id }, { $set: { Organization: Organization, Date: Date, Time: Time, Location: Location, Description: Description } });
        res.status(200).json({ message: 'Event Updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Delete An Event
adminRoutes.delete('/DeleteEvents/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Event.deleteOne({ _id: id });
        res.status(200).json({ message: 'Event Removed' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get All Events
adminRoutes.get('/events', async (req, res) => {
    try {
        const Events = await Event.find({});
        console.log(Events);
        res.status(200).json(Events);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//displaying image gallery
adminRoutes.get('/image', async (req, res) => {
    try {
        const images = await Image.find({});
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//add image to gallery
adminRoutes.post('/addimage/:url', async (req, res) => {
    const URL = req.params.url;
    const newImage = new Image({ URL: URL });
    try {
        await newImage.save();
        res.status(201).json({ message: 'Image Added' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//remove image from gallery
adminRoutes.delete('/image/:url', async (req, res) => {
    const URL = req.params.url;
    try {
        await Image.deleteOne({ URL: URL });
        res.status(200).json({ message: 'Image Removed' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get all blogs
adminRoutes.get('/blog', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//add blog
adminRoutes.post('/addblog', async (req, res) => {
    const { Title, Content, createdBy } = req.body; // Use Title, Content, createdBy to match the frontend
    const newBlog = new Blog({ title: Title, content: Content, createdBy: createdBy });
    try {
        await newBlog.save();
        res.status(201).json({ message: 'Blog Added' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//remove blog
adminRoutes.delete('/DeleteBlog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Blog.deleteOne({ _id: id });
        res.status(200).json({ message: 'Blog Removed' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//modify blog
adminRoutes.put('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content, createdBy } = req.body; // Use Title, Content, createdBy to match the frontend
    try {
        const currentTime = Date.now();
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: id },
            { $set: { title: title, content: content, createdBy: createdBy, createdAt: currentTime } },
            { new: true } // To return the updated document
        );
        res.status(200).json({ message: 'Blog Updated', updatedBlog });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
adminRoutes.get('/userRole/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          // Determining the user's role
          let role = 'None';
          if (user.isEmployee) {
              role = 'Employer';
          } else if (user.isCaregiver) {
              role = 'Caregiver';
          } else if (user.isResident) {
              role = 'Resident';
          }
          res.status(200).json({ role: role }); // Respond with the determined role
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//check if user has admin status
adminRoutes.get('/userAdmin/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(200).json({ admin: user.isAdmin }); // Use the 'admin' field
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//change user status
adminRoutes.put('/userStatus/:email/:status', async (req, res) => {
    const email = req.params.email;
    const status = req.params.status;
    let update;

    switch (status) {
        case 'disabled':
            update = { $set: { disabled: true, isAdmin: false} };
            break;
        case 'admin':
            update = { $set: { isAdmin: true ,isSignedUp: false} };
            break;
        case 'signup':
            update = { $set: { isSignedUp: true } };
            break;
        case 'un-signup':
            update = { $set: { isSignedUp: false } };
            break;
        default:
            return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        await User.updateOne({ email: email }, update);
        res.status(201).json({ message: 'User Status Updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//add user
adminRoutes.post('/adduser', async (req, res) => {
    const { email, password, isAdmin, disabled, isSignedUp } = req.body;
    const newUser = new User({ email: email, password: password, isAdmin: isAdmin, disabled: disabled, isSignedUp: isSignedUp});
    try {
        await newUser.save();
        res.status(201).json({ message: 'User Added' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//check if user is signed up
adminRoutes.get('/userSignedUp', async (req, res) => {
    try {
        const users = await User.find({ isSignedUp: true }).select('email');
        const emails = users.map(user => user.email);
        console.log(emails);
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aaryapatel423@gmail.com', // your email
      pass: 'tatu xede shsb aofk' // your app password
    }
});
  
adminRoutes.post('/sendEmail', async (req, res) => {
    try {
      // Fetch emails from /userSignedUp endpoint
      const response = await axios.get('http://localhost:8080/api/userSignedUp');
      const emails = response.data;
      console.log(emails);
      // Define email options
      let mailOptions = {
        from: 'aaryapatel423@gmail.com', // sender address
        bcc: emails, // list of receivers
        subject: req.body.subject, // Subject line from request data
        text: req.body.text, // Text body from request data
      };
      console.log(mailOptions);
      // Send email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Email sent' });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch emails or send email' });
    }
});

//check if user is deactivated
adminRoutes.get('/userDeactivated/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email: email });
        res.status(200).json({ deactivated: user.disabled });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get all users that are not admin users
adminRoutes.get('/users', async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//remove user
adminRoutes.delete('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        await User.deleteOne({ email: email });
        res.status(200).json({ message: 'User Removed' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = adminRoutes;
