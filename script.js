const apiUrl = 'http://localhost:3000/api/posts';

// Function to fetch and display posts
async function fetchPosts() {
    const response = await fetch(apiUrl); // Make a GET request to fetch posts
    const posts = await response.json(); // Parse the response as JSON

    const postList = document.getElementById('post-list'); // Get the post list element
    postList.innerHTML = ''; // Clear any existing posts

    // Iterate through the posts and create list items
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `${post.title}: ${post.content} (ID: ${post.id})`; // Display title, content, and ID
        postList.appendChild(listItem); // Add the list item to the post list
    });
}

// Function to add a new post
document.getElementById('add-post-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('post-title').value; // Get title from input
    const content = document.getElementById('post-content').value; // Get content from textarea

    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ title, content }), // Convert the data to JSON format
        });

        if (response.ok) {
            document.getElementById('post-title').value = ''; // Clear title input
            document.getElementById('post-content').value = ''; // Clear content input
            fetchPosts(); // Refresh the post list
        } else {
            console.error('Failed to add post:', response.statusText); // Log if the post could not be added
        }
    } catch (error) {
        console.error('Error adding post:', error); // Log any errors
    }
});

// Initial fetch to display posts
fetchPosts(); // Call the function to load posts when the page loads
