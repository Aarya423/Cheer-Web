//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/user.js');
const Blog = require('./models/blog.js');
const Event = require('./models/events.js');
const adminRoutes = require('./routes/admin.js');

const express = require('express');
mongoose.set('debug', true);

const app = express();
app.use(express.static('cheer-website/dist'))


app.use('/api', adminRoutes);
//use dist
//connecting to mongodb
mongoose.connect('mongodb+srv://username and password not added for security reasons@cluster0.iided8b.mongodb.net/');
const mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongodb.once('open', () => {
    console.log('Connected to MongoDB');
    //the commented code below is used to create the db on start up
    //uncomment the code, run connection once then comment the code out
    //fileReader('models/blog.JSON');
    //fileEvents('models/events.JSON');
});

async function fileReader(file){
    try{
        const data = fs.readFileSync(file, 'utf-8');
        let jsonData = JSON.parse(data);
        
        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        for (const blogSchema of jsonData){
            const newUser= new Blog(blogSchema);
            await newUser.save();
        }
    }catch(error){
        console.error(`Error loading JSON file: ${error.message}`);
        return null;
    }
}
async function fileEvents(file){
    try{
        const data = fs.readFileSync(file, 'utf-8');
        let jsonData = JSON.parse(data);
        
        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        for (const eventSchema of jsonData){
            const newEvents= new Event(eventSchema);
            await newEvents.save();
        }
    }catch(error){
        console.error(`Error loading JSON file: ${error.message}`);
        return null;
    }
}

app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });

