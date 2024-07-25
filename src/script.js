import axios from 'axios';

const apiKey = "44245145-3992e974edb390e4edf38875e";
const baseURL = "https://pixabay.com/api/";
const imagesBox = document.querySelector(".images");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const createElements = (images) => {
    imagesBox.innerHTML = "";
    images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imagesBox.appendChild(imgElement);
    });
}

const getImages = async (keyword) => {
    try {
        const url = `${baseURL}?key=${apiKey}&q=${encodeURIComponent(keyword)}&image_type=photo&page=1&per_page=10`;
        const response = await axios.get(url);
        createElements(response.data.hits);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
        getImages(keyword);
    }
});
