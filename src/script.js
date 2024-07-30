document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#search-form');
    const gallery = document.querySelector('.gallery');
    const loadMoreButton = document.querySelector('#load-more');
    const API_KEY = '44245145-3992e974edb390e4edf38875e'; 
  
    const settings = {
      page: 1,
      per_page: 10,
      query: ''
    };
  
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        settings.query = form.query.value;
        if (settings.query === '') return;
        settings.page = 1;
        clearGallery();
        await fetchImages();
      });
    } else {
      console.error('Форма пошуку не знайдена.');
    }
  
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', async () => {
        await fetchImages();
      });
    } else {
      console.error('Кнопка "Load more" не знайдена.');
    }
  
    async function fetchImages() {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(settings.query)}&image_type=photo&orientation=horizontal&page=${settings.page}&per_page=${settings.per_page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderImages(data.hits);
        settings.page += 1;
        if (data.hits.length < settings.per_page) {
          loadMoreButton.style.display = 'none';
        } else {
          loadMoreButton.style.display = 'block';
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  
    function renderImages(images) {
      if (gallery) {
        const imageCards = images.map(image => createImageCard(image)).join('');
        gallery.insertAdjacentHTML('beforeend', imageCards);
      } else {
        console.error('Галерея не знайдена.');
      }
    }
  
    function createImageCard(image) {
      return `
        <li class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i> ${image.likes}
            </p>
            <p class="stats-item">
              <i class="material-icons">visibility</i> ${image.views}
            </p>
            <p class="stats-item">
              <i class="material-icons">comment</i> ${image.comments}
            </p>
            <p class="stats-item">
              <i class="material-icons">cloud_download</i> ${image.downloads}
            </p>
          </div>
        </li>
      `;
    }
  
    function clearGallery() {
      if (gallery) {
        gallery.innerHTML = '';
      }
    }
  });
  