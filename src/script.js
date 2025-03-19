import { fetchImages } from './modules/api.js';
import { displayImages } from './modules/gallery.js';
import { initializeEventListeners } from './modules/events.js';

export async function init() {
    const images = await fetchImages(1);
    displayImages(images);
    initializeEventListeners();
}

init();

let page = 1;
const limit = 4;
let loadedImageIds = [];

document.addEventListener('DOMContentLoaded', () => {
    loadImages();

    document.getElementById('load-more').addEventListener('click', loadImages);
    document.getElementById('clear-gallery').addEventListener('click', clearGallery);
    document.getElementById('remove-last').addEventListener('click', removeLastImage);
    document.getElementById('reverse-gallery').addEventListener('click', reverseGallery);
});

function loadImages() {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                if (!loadedImageIds.includes(image.id)) {
                    const img = document.createElement('img');
                    img.src = `https://picsum.photos/id/${image.id}/200/200`;
                    document.getElementById('gallery').appendChild(img);
                    loadedImageIds.push(image.id);
                }
            });
            page++;
        })
        .catch(error => console.error('Помилка:', error));
}

function clearGallery() {
    document.getElementById('gallery').innerHTML = '';
    loadedImageIds = [];
    page = 1;
}

function removeLastImage() {
    const gallery = document.getElementById('gallery');
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        loadedImageIds.pop();
    }
}

function reverseGallery() {
    const gallery = document.getElementById('gallery');
    const images = Array.from(gallery.children);
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
    loadedImageIds.reverse();
}
