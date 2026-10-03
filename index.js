// to run this file: 
// cd to this directory, then node app.js

// require cors to prevent cross site scripting errors
var cors = require("cors");

// import  express module
const express = require('express');
const app = express();

// import bodyParser module
const bodyParser = require('body-parser');

// import  Song db model
const Song = require("./models/songs"); 

// import Course db model
const Course = require("./models/courses"); 

// import StudentCourses model
const StudentCourses = require("./models/studentCourses"); 

// import Users model
const Users = require("./models/users"); 

// use cors module
app.use(cors());

// use bodyParser
// from google search results: 
// This parses standard HTML form submissions (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// morgan logging
//const morgan = require('morgan');
//app.use(morgan('dev')); // Logs method, path, status, and response time

// logging
app.use((req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    url: req.url,
    query: req.query,     // Query parameters (?name=test)
    params: req.params,   // Route parameters (/users/:id)
    body: req.body        // POST/PUT payload data
  });
  next();
});

// Render dynamically assigns a port via process.env.PORT, falling back to 3000 locally
// source: google search results example
const PORT = process.env.PORT || 3000;

// install router
const router = express.Router();

// http get call to api/songs

// get all songs in the database, sort alphabetically by name
router.get("/songs",  async (req, res) => {

    try {
        const songs = await Song.find().sort({title: 1});
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json(err);
    }

});

// one song

// search / query

// add a song
router.post("/create", async function(req, res) {

   // Create a song from the submitted form data
   const song = new Song({
      title: req.body.title,
      artist: req.body.artist
   });

   try {
      await song.save();
      res.redirect('https://sdev255-module5-tutorial-frontend.onrender.com/');
      // res.send(200);
   }  
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

// get all courses, sorted by name, alphabetically
router.get("/courses",  async (req, res) => {

    try {
        const courses = await Course.find().sort({ name: 1 });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
});

// add course
router.post("/addCourse", async function(req, res) {

   // Create a course from the submitted form data
   const course = new Course({
      name: req.body.courseName
   });

   try {
      await course.save();
      //res.send(200);
      res.redirect('https://sdev255-module5-tutorial-frontend.onrender.com/');
   }  
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

// student adds a course to their schedule
router.post("/addStudentCourse", async function(req, res) {

   // Create a student-course relational record from the submitted form data
   const addStudentCourse = new StudentCourses({
      studentId: req.body.studentId,
      courseId: req.body.studentCourse
   });

   try {
      await addStudentCourse.save();
      // res.send(200);
      res.redirect('https://sdev255-module5-tutorial-frontend.onrender.com/');
   }  
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

// list of courses in a student's schedule
router.get("/studentCourses", async function(req, res) {

    try {
        const courses = await StudentCourses.find({studentId: '6abfc36225554d5ad7f1b110'});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one course by id
router.get("/courses/:id", async function(req, res) {

    // from google example: 
    // get the id param from the url
    const courseId  = req.params.id;

    //alert(courseId);
    //console.log(courseId);

    try {
        const course = await Course.find({ _id: courseId});
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});


// student deletes a course from their schedule
// deleteStudentCourse

/*
// create Users table
// only needs to be run once to create the database
router.get("/createUserTable",  async (req, res) => {

    try {
        const newUser = await Users.find().sort({ lastName: 1 });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create StudentCourses table
// only needs to be run once to create the table
router.get("/createStudentCourseTable",  async (req, res) => {

    try {
        const d = await StudentCourses.find().sort({ courseId: 1 });
        res.status(200).json(StudentCourses);
    } catch (err) {
        res.status(500).json(err);
    }
});
*/

// set all urls for api to localhost:3000/api, as shown in video for this tutorial
app.use("/api", router);

// http get calls to root
app.get('/', (req, res) => {
    res.json({ message: "Get request made to web root..." });
});

// Important: Listen on 0.0.0.0 for Render deployments
// source: google search results for correct way to deploy express project to render.com
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});