import React, { Component } from 'react';
import propTypes from 'prop-types';
import s from './ImageGallery.module.css';
import imagesApi from '../../services/search-api';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import Loader from '../Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  NOTFOUND: 'not found',
};

class ImageGallery extends Component {
  state = {
    gallery: null,
    page: 1,
    total: 0,
    hitsLength: 0,

    showModal: false,
    clickedImage: '',

    error: null,
    status: Status.IDLE,
  };

  endindScroll = React.createRef(); // свойство для скрола вниз страницы

  static propTypes = {
    searchValue: propTypes.string.isRequired,

    // largeImageURL: propTypes.string.isRequired,
    // webformatURL: propTypes.string.isRequired,
    // tags: propTypes.string.isRequired,
    // id: propTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.searchValue) {
      alert('Введите значение для поиска');
    }

    // if (
    //   prevProps.searchValue !== this.props.searchValue ||
    //   prevState.page !== this.state.page
    // ) {
    //   this.setState({ status: Status.PENDING });

    //   imagesApi
    //     .fetchImages(this.props.searchValue, this.state.page)
    //     .then(results => {
    //       const { hits, total } = results;

    //       // console.log('⭐ ~ ImageGallery ~ results', results);
    //       // console.log(this.state.page, hits);
    //       // console.log(this.state.gallery);

    //       if (!total) {
    //         return this.setState({ status: Status.NOTFOUND });
    //       }

    //       if (
    //         this.state.gallery === null ||
    //         prevProps.searchValue !== this.props.searchValue
    //       ) {
    //         // console.log(this.state.gallery, this.state.page);
    //         console.log('1', this.state.page);
    //         this.setState({
    //           gallery: [...hits],
    //           page: 1,
    //           total,
    //           hitsLength: hits.length,
    //           status: Status.RESOLVED,
    //         });
    //       } else {
    //         // console.log(this.state.gallery, this.state.page);
    //         console.log('2', this.state.page);
    //         this.setState(({ gallery }) => ({
    //           gallery: [...gallery, ...hits],
    //           hitsLength: hits.length,
    //           status: Status.RESOLVED,
    //         }));
    //       }

    //       this.scrollToBottom();
    //     })
    //     .catch(error => this.setState({ error, status: Status.REJECTED }));

    //   // console.log(this.state);
    // }

    //*---------------------------------------------------------------------

    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ gallery: null, page: 1, status: Status.PENDING });
      console.log(this.state);

      imagesApi
        .fetchImages(this.props.searchValue, this.state.page)
        .then(results => {
          const { hits, total } = results;

          if (!total) {
            return this.setState({ status: Status.NOTFOUND });
          }

          this.setState({
            gallery: [...hits],
            total,
            hitsLength: hits.length,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevState.page !== this.state.page) {
      this.setState({ status: Status.PENDING });

      imagesApi
        .fetchImages(this.props.searchValue, this.state.page)
        .then(results => {
          const { hits } = results;

          this.setState(({ gallery }) => ({
            gallery: [...gallery, ...hits],
            hitsLength: hits.length,
            status: Status.RESOLVED,
          }));

          this.scrollToBottom(); // скрол вниз страницы
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  showModalImage = clickedImage => {
    this.toggleModal();
    this.setState({ clickedImage });
  };

  incrementPage = e => {
    e.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  scrollToBottom = () => {
    this.endindScroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { clickedImage, status } = this.state;

    if (status === 'idle') {
      return <div className={s.title}>Пока еще ничего не искали</div>;
    }

    if (status === 'not found') {
      return <div className={s.title}>Поиск не дал результатов</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div className={s.title}>Произошла ошибка</div>;
    }

    if (status === 'resolved') {
      const { gallery, hitsLength } = this.state;
      const { endindScroll, showModalImage, incrementPage, toggleModal } = this;
      return (
        <div>
          <ul className={s.ImageGallery}>
            {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
                showModalImage={showModalImage}
              />
            ))}
          </ul>

          <div ref={endindScroll} />

          {hitsLength === 12 && (
            <Button title="Load more" onClick={incrementPage} />
          )}

          {this.state.showModal && (
            <Modal onClose={toggleModal} source={clickedImage}>
              <img src={clickedImage} alt="large" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
