const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.static('cheer-website/dist'))
const port = process.env.PORT || 8080

mongoose.connect('mongodb+srv://admin:123@cluster0.hl6nivu.mongodb.net/');
const mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongodb.once('open', () => {
    console.log('Connected to MongoDB');
    //the commented code below is used to create the db on start up
    //uncomment the code, run connection once then comment the code out
    //fileReader('models/blog.JSON');
    //fileEvents('models/events.JSON');
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
