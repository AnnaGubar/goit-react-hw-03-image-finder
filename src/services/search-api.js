const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25849699-edc9a69ae2fd4562ebcb7ccdf';
const perPage = 12;
let page = 1;

async function fetchImages(searchValue) {
  // async function fetchImages(searchValue, page = 1) {
  const response = await fetch(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
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
