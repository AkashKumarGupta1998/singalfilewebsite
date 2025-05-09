// Blog JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load blog posts from JSON file
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => displayBlogPosts(posts))
        .catch(error => console.error('Error loading blog posts:', error));

    // Blog post modal functionality
    const modal = document.getElementById('post-modal');
    const newPostBtn = document.getElementById('new-post-btn');
    const closeModal = document.querySelector('.close-modal');
    const postForm = document.getElementById('post-form');

    if (newPostBtn) {
        newPostBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());
            
            // Create new post object
            const newPost = {
                id: Date.now().toString(),
                title,
                content,
                excerpt: content.substring(0, 150) + '...',
                tags,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                author: 'Your Name'
            };
            
            // Here you would typically save the post to a database or JSON file
            console.log('New post created:', newPost);
            
            // For demo purposes, we'll add it to the page directly
            addBlogPostToPage(newPost);
            
            // Reset form and close modal
            postForm.reset();
            modal.style.display = 'none';
            
            alert('Post created successfully!');
        });
    }
});

function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById('blog-posts');
    
    if (!blogPostsContainer) return;
    
    blogPostsContainer.innerHTML = '';
    
    posts.forEach(post => {
        addBlogPostToPage(post);
    });
}

function addBlogPostToPage(post) {
    const blogPostsContainer = document.getElementById('blog-posts');
    
    const postElement = document.createElement('div');
    postElement.className = 'blog-post';
    postElement.dataset.id = post.id;
    
    postElement.innerHTML = `
        <div class="blog-image"></div>
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
                <span>${post.date}</span>
                <span>${post.tags.map(tag => `#${tag}`).join(' ')}</span>
            </div>
            <a href="#" class="blog-read-more" data-id="${post.id}">Read More</a>
        </div>
    `;
    
    blogPostsContainer.appendChild(postElement);
    
    // Add click event for "Read More"
    postElement.querySelector('.blog-read-more').addEventListener('click', function(e) {
        e.preventDefault();
        viewFullPost(post);
    });
}

function viewFullPost(post) {
    // Create a modal to display the full post
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'post-view-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span>Posted on ${post.date} by ${post.author}</span>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="post-content">
                ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        }
    });
}
