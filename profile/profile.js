"use strict"

window.onload = () => {
    let logoutButton = document.querySelector("#logoutButton");
    let postForm = document.querySelector("#postForm");

    logoutButton.addEventListener("click", logoutUser);
    postForm.addEventListener("submit", handlePostCreation);
}

function logoutUser(event) {
    event.preventDefault();
    logout();
}

// Function to handle post creation form submission
function handlePostCreation(event) {
    event.preventDefault();
    const loginData = getLoginData();
    const username = document.getElementById('postUsername').value;
    const text = document.getElementById('postText').value;

    // Adjust the URL to your actual endpoint
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ username: username, text: text }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    })
    .then(data => {
        console.log('Post created successfully:', data); // Log the response data
        alert('Post created successfully!');
        // Clear form after submission (optional)
        document.getElementById('postUsername').value = '';
        document.getElementById('postText').value = '';
    })
    .catch(error => {
        console.error('Error creating post:', error); // Log the error
        alert('Error creating post');
    });
}