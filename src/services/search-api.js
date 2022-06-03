const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25849699-edc9a69ae2fd4562ebcb7ccdf';

async function fetchImages(searchValue) {
  const response = await fetch(
    `${BASE_URL}?q=${searchValue}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`Нет совпадений с "${searchValue}"`));
}

const api = {
  fetchImages,
};

export default api;
