// script.js
document.addEventListener('DOMContentLoaded', () => {
    const postWriter = document.getElementById('post-writer')
    const postContent = document.getElementById('post-content');
    const submitPost = document.getElementById('submit-post');
    const postsContainer = document.getElementById('posts');

    // Load existing posts from localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <strong>${post.writer} : </strong>
                <p>${post.content}</p>
                <div class="timestamp">${new Date(post.timestamp).toLocaleString()}</div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Add a new post
    submitPost.addEventListener('click', () => {
        const content = postContent.value.trim();
        const writer = postWriter.value.trim();
        if (content) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const newPost = {
                content,
                timestamp: Date.now(),
                writer
            };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            postContent.value = '';
            loadPosts();
        } else {
            alert('Please enter some content.');
        }
    });

    // Initial load
    loadPosts();
});