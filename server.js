const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'posts.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Initialize posts file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to read posts
function readPosts() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

// Helper function to write posts
function writePosts(posts) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing posts:', error);
        return false;
    }
}

// GET all posts
app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// POST a new post
app.post('/api/posts', (req, res) => {
    const { name, description } = req.body;

    if (!description || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required' });
    }

    const posts = readPosts();
    const newPost = {
        id: Date.now(),
        name: name && name.trim() !== '' ? name : 'Unknown',
        description: description.trim(),
        timestamp: new Date().toISOString()
    };

    posts.unshift(newPost); // Add to beginning of array
    
    if (writePosts(posts)) {
        res.status(201).json(newPost);
    } else {
        res.status(500).json({ error: 'Failed to save post' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
