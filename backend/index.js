// Import necessary modules
const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;


app.use(cors()); // Allow all origins

// Use CORS middleware to enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

let posts = []; // In-memory array to hold posts

// 1. Create a Post (Add)
app.post('/api/posts', (req, res) => {
    const post = {
        id: Date.now(), // Unique ID based on timestamp
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.status(201).send(post); // Respond with created post
});

// 2. Read Posts (Get all posts)
app.get('/api/posts', (req, res) => {
    res.send(posts); // Respond with all posts
});

// 3. Update a Post
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Extract ID from URL
    const post = posts.find(p => p.id === postId); // Find post by ID

    if (!post) {
        return res.status(404).send('Post not found'); // Handle post not found
    }

    // Update post details
    post.title = req.body.title;
    post.content = req.body.content;
    res.send(post); // Respond with updated post
});

// 4. Delete a Post
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Extract ID from URL
    posts = posts.filter(p => p.id !== postId); // Remove post by ID
    res.status(204).send(); // Respond with 204 No Content
});

app.use(cors({
    origin: 'https://charttanong.github.io'
}));


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
