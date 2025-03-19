export const imagesPerRow = 4;

export async function fetchImages(page = 4) {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${imagesPerRow}`);
    alert("Steal?")
    return await response.json();
}

// Look, compare but not steal