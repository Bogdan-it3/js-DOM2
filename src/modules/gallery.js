
import { imagesPerRow } from './api.js';

const gallery = document.getElementById('gallery');

export function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        gallery.appendChild(imgElement);
    });
    updateImageSizes();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function removeLastImage() {
    const images = gallery.getElementsByTagName('img');
    if (images.length > 0) {
        gallery.removeChild(images[images.length - 1]);
        updateImageSizes();
    }
}

export function reverseGallery() {
    const images = Array.from(gallery.getElementsByTagName('img'));
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
    updateImageSizes();
}

export function shuffleGallery() {
    const images = Array.from(gallery.getElementsByTagName('img'));
    gallery.innerHTML = '';
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    images.forEach(img => gallery.appendChild(img));
    updateImageSizes();
}

export function updateImageSizes() {
    const containerWidth = gallery.clientWidth;
    const minGap = 3;
    const maxGap = 15;
    const gap = Math.min(Math.max(containerWidth * 0.03, minGap), maxGap);
    const totalGapWidth = gap * (imagesPerRow - 1);
    const imageWidth = (containerWidth - totalGapWidth) / imagesPerRow;

    const imgElements = gallery.getElementsByTagName('img');
    for (let img of imgElements) {
        img.style.width = `${imageWidth}px`;
        img.style.height = 'auto';
    }

    gallery.style.gap = `${gap}px`;
}
