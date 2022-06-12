// import axios from 'axios';
// let page = 1;

// function fetchImages(searchValue) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const KEY = '25849699-edc9a69ae2fd4562ebcb7ccdf';
//   const perPage = 12;

//   let url = `${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

//   let options = {
//     method: 'GET',
//     headers: {
//       Authorization: KEY,
//     },
//   };

//   axios.get(url, options).then(response => {
//     console.log(response);
//     return response;
//   });
// }

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25849699-edc9a69ae2fd4562ebcb7ccdf';
const perPage = 12;

async function fetchImages(searchValue, page) {
  const response = await fetch(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`Нет совпадений с "${searchValue}"`));
}

const searchApi = {
  fetchImages,
};

export default searchApi;
