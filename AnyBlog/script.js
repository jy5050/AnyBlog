const form = document.getElementById('postForm');
const contentEl = document.getElementById('postContent');
const postsContainer = document.getElementById('posts');

function loadPosts() {
  const all = JSON.parse(localStorage.getItem('posts') || '[]');
  return all.sort((a, b) => b.timestamp - a.timestamp);
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  postsContainer.innerHTML = '';
  loadPosts().forEach(post => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <div class="time">${new Date(post.timestamp).toLocaleString()}</div>
      <div class="text">${post.text}</div>
    `;
    postsContainer.appendChild(el);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = contentEl.value.trim();
  if (!text) return;
  const posts = loadPosts();
  posts.push({ text, timestamp: Date.now() });
  savePosts(posts);
  contentEl.value = '';
  renderPosts();
});

// initial render
renderPosts();
