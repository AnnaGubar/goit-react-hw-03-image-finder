import React, { Component } from 'react';
import s from './App.module.css';

import searchApi from './services/search-api';
import Loader from './Components/Loader';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
    gallery: [],
    page: 1,
    totalHits: null,

    isLoading: false,

    showModal: false,
    clickedImage: null,

    isNotFound: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    const prevSearchValue = prevState.searchValue;
    const prevPage = prevState.page;

    if (prevSearchValue !== searchValue) {
      this.setState({ gallery: [], isLoading: true, isNotFound: false });
      this.handleRequest(prevSearchValue, prevPage);
    }

    if (prevSearchValue === searchValue && prevPage !== page) {
      this.setState({ isLoading: true, isNotFound: false });
      this.handleRequest(prevSearchValue, prevPage);
    }
  }

  handleRequest = (prevSearchValue, prevPage) => {
    const { searchValue, page } = this.state;

    searchApi
      .fetchImages(searchValue, page)
      .then(({ total, hits }) => {
        if (!total) {
          this.setState({
            gallery: [],
            page: 1,
            isNotFound: true,
          });
          return;
        }

        let data = hits.map(dataValue => {
          return {
            id: dataValue.id,
            tags: dataValue.tags,
            webformatURL: dataValue.webformatURL,
            largeImageURL: dataValue.largeImageURL,
          };
        });

        if (prevSearchValue !== searchValue) {
          this.setState({
            gallery: data,
            totalHits: total,
          });
        }

        if (prevSearchValue === searchValue && prevPage !== page) {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...data],
          }));
        }
      })
      .catch(console.log)
      .finally(() => this.setState({ isLoading: false}));
  };

  handleValueSearch = searchValue => {
    if (!searchValue) {
      alert('Пожалуйста введите значение для поиска');
      return;
    }

    this.setState({ searchValue, page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  showModalImage = clickedImage => {
    this.toggleModal();
    this.setState({ clickedImage });
  };

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    console.log('gallery', this.state);

    const {
      clickedImage,
      gallery,
      showModal,
      isLoading,
      totalHits,
      isNotFound,
    } = this.state;
    const { handleValueSearch, showModalImage, incrementPage, toggleModal } =
      this;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleValueSearch} />

        {!isLoading && gallery.length === 0 && !isNotFound && (
          <div className={s.title}>Пока еще ничего не искали</div>
        )}

        {isNotFound && <div className={s.title}>Поиск не дал результатов</div>}

        {gallery && (
          <ImageGallery gallery={gallery} showModalImage={showModalImage} />
        )}

        {isLoading && <Loader />}

        {gallery.length > 11 && gallery.length !== totalHits && !isLoading && (
          <Button title="Load more" onClick={incrementPage} />
        )}

        {showModal && (
          <Modal onClose={toggleModal} source={clickedImage}>
            <img src={clickedImage} alt="large" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
