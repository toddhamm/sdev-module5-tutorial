const express = require('express');
const app = express();

// Render dynamically assigns a port via process.env.PORT, falling back to 3000 locally
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: "Hello from Express on Render!" });
});

// Important: Listen on 0.0.0.0 for Render deployments
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});