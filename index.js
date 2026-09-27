const express = require('express');
const app = express();

// Render dynamically assigns a port via process.env.PORT, falling back to 3000 locally
const PORT = process.env.PORT || 3000;

// install router
const router = express.Router();

// http get call to api/songs
// send data (2 songs as json)
router.get("/songs", function(req, res){
    const song1 = {
        title: "Cemetary Gates",
        artist: "Pantera",
        populartity: 10,
        genre: ["Metal", "90s"]
    };
    const song2 = {
        title: "Thunderkiss '65",
        artist: "White Zombie",
        populartity: 10,
        genre: ["Metal", "90s"]
    };

    res.json([song1, song2]);
});

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