export async function fetchImages(count) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 100)}&limit=${count}`);
        return await response.json();
    } catch (error) {
        console.error('Помилка завантаження зображень:', error);
        return [];
    }
}