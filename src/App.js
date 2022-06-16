import React, { Component } from 'react';
import s from './App.module.css';

import searchApi from './services/search-api';
import Loader from './Components/Loader';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  NOTFOUND: 'not found',
};

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    showModal: false,
    clickedImage: null,
    status: Status.IDLE,
    gallery: [],
    hitsLength: null,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    const prevSearchValue = prevState.searchValue;
    const prevPage = prevState.page;

    if (prevSearchValue !== searchValue) {
      this.setState({ gallery: [], status: Status.PENDING });
      this.handleRequest(prevSearchValue, prevPage);
    }

    if (prevSearchValue === searchValue && prevPage !== page) {
      this.setState({ status: Status.PENDING });
      this.handleRequest(prevSearchValue, prevPage);
    }
  }

  handleRequest = (prevSearchValue, prevPage) => {
    // this.setState({ status: Status.PENDING });

    searchApi
      .fetchImages(this.state.searchValue, this.state.page)
      .then(({ total, hits }) => {
        if (!total) {
          this.setState({
            gallery: [],
            page: 1,
            hitsLength: 0,
            status: Status.NOTFOUND,
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

        // this.setState({ hitsLength: data.length, status: Status.RESOLVED });

        if (prevSearchValue !== this.state.searchQuery) {
          this.setState({
            gallery: data,
            hitsLength: data.length,
            status: Status.RESOLVED,
          });
        }

        if (
          prevSearchValue === this.state.searchValue &&
          prevPage !== this.state.page
        ) {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...data],
            hitsLength: data.length,
            status: Status.RESOLVED,
          }));
        }
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
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
    // console.log('gallery', this.state.page, this.state.gallery);

    const { clickedImage, status, gallery, hitsLength, showModal } = this.state;
    const { handleValueSearch, showModalImage, incrementPage, toggleModal } =
      this;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleValueSearch} />

        {status === 'idle' && (
          <div className={s.title}>Пока еще ничего не искали</div>
        )}


        {status === 'not found' && (
          <div className={s.title}>Поиск не дал результатов</div>
          )}

        {status === 'resolved' && (
          <ImageGallery gallery={gallery} showModalImage={showModalImage} />
          )}

        {status === 'rejected' && (
          <div className={s.title}>Произошла ошибка</div>
          )}

          {status === 'pending' && <Loader />}

        {hitsLength === 12 && status === 'resolved' && (
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
