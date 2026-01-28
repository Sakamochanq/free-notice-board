const API_URL = '/api/posts';

// Load posts when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupForm();
});

// Setup form submission
function setupForm() {
    const form = document.getElementById('postForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await createPost();
    });
}

// Load and display posts
async function loadPosts() {
    const container = document.getElementById('postsContainer');
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to load posts');
        }
        
        const posts = await response.json();
        
        if (posts.length === 0) {
            container.innerHTML = '<p class="no-posts">No posts yet. Be the first to post!</p>';
            return;
        }
        
        container.innerHTML = posts.map(post => createPostHTML(post)).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = '<p class="no-posts">Error loading posts. Please try again later.</p>';
    }
}

// Create HTML for a single post
function createPostHTML(post) {
    const date = new Date(post.timestamp);
    const formattedDate = date.toLocaleString();
    
    return `
        <div class="post-card">
            <div class="post-header">
                <span class="post-name">${escapeHTML(post.name)}</span>
                <span class="post-timestamp">${formattedDate}</span>
            </div>
            <div class="post-description">${escapeHTML(post.description)}</div>
        </div>
    `;
}

// Create a new post
async function createPost() {
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    
    if (!description) {
        showMessage('Please enter a description', 'error');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name || 'Unknown', 
                description 
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        
        // Clear form
        nameInput.value = '';
        descriptionInput.value = '';
        
        // Reload posts
        await loadPosts();
        
        // Show success message
        showMessage('Post created successfully!', 'success');
    } catch (error) {
        console.error('Error creating post:', error);
        showMessage('Error creating post. Please try again.', 'error');
    }
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Show temporary message
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    const bgColor = type === 'error' ? '#e74c3c' : '#27ae60';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}
