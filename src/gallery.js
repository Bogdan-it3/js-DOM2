import { fetchImages } from './api.js';

const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
const clearGalleryButton = document.getElementById('clearGallery');
const removeLastButton = document.getElementById('removeLast');
const reverseGalleryButton = document.getElementById('reverseGallery');

let loadedImages = [];

async function loadImages(count) {
    const images = await fetchImages(count);
    images.forEach(image => {
        if (!loadedImages.includes(image.id)) {
            const img = document.createElement('img');
            img.src = `https://picsum.photos/id/${image.id}/200/200`;
            gallery.appendChild(img);
            loadedImages.push(image.id);
        }
    });
}

function clearGallery() {
    gallery.innerHTML = '';
    loadedImages = [];
}

function removeLastImage() {
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        loadedImages.pop();
    }
}

function reverseGallery() {
    const images = Array.from(gallery.children);
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
}

document.addEventListener('DOMContentLoaded', () => {
    loadImages(4);
});

loadMoreButton.addEventListener('click', () => loadImages(4));
clearGalleryButton.addEventListener('click', clearGallery);
removeLastButton.addEventListener('click', removeLastImage);
reverseGalleryButton.addEventListener('click', reverseGallery);