const uploadForm = document.getElementById('uploadForm');
const feed = document.getElementById('feed');

// Evento para o envio do formulário
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const image = document.getElementById('image').files[0];
  if (!name || !image) return alert("Preencha todos os campos!");

  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', image);

  try {
    const response = await fetch('http://127.0.0.1:5500/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      loadFeed(); // Atualizar o feed após o post
    } else {
      alert('Erro ao postar a imagem!');
    }
  } catch (error) {
    console.error(error);
    alert('Erro ao conectar com o servidor.');
  }
});

// Função para carregar o feed
async function loadFeed() {
  try {
    const response = await fetch('http://127.0.0.1:5500/feed');
    const posts = await response.json();

    // Inverter a ordem dos posts
    const reversedPosts = posts.reverse();

    // Renderizar os posts
    feed.innerHTML = reversedPosts.map(post => `
      <div class="post">
        <p><strong>${post.name}</strong></p>
        <img src="${post.image_url}" alt="Post Image" width="100%">
      </div>
    `).join('');
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar o feed.');
  }
}

// Carregar o feed inicialmente
loadFeed();
