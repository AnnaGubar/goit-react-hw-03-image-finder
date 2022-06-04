import React, { Component } from 'react';
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
};

class ImageGallery extends Component {
  state = {
    gallery: null,
    page: 1,
    total: 0,

    showModal: false,
    clickedImage: '',

    error: null,
    status: Status.IDLE,
  };

  endindScroll = React.createRef(); // свойство для скрола вниз страницы

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);

    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ gallery: null, page: 1, status: Status.PENDING });

      console.log(
        'поменялось searchValue',
        this.props.searchValue,
        this.state.page,
        this.state.gallery,
      );

      imagesApi
        .fetchImages(this.props.searchValue, this.state.page)
        .then(results => {
          const { hits, total } = results;

          this.setState({
            gallery: hits,
            total,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevState.page !== this.state.page) {
      console.log(
        'поменялось page',
        this.props.searchValue,
        this.state.page,
        this.state.gallery,
      );
      this.setState({ status: Status.PENDING });

      imagesApi
        .fetchImages(this.props.searchValue, this.state.page)
        .then(results => {
          const { hits, total } = results;

          this.setState({
            gallery: [...prevState.gallery, ...hits],
            total,
            status: Status.RESOLVED,
          });

          this.scrollToBottom(); // скрол вниз страницы
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    // console.log('this.state', this.state);
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
    // console.log('incrementPage', this.state);
  };

  scrollToBottom = () => {
    this.endindScroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { clickedImage, status } = this.state;

    if (status === 'idle') {
      return <div className={s.title}>Пока еще ничего не искали</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>rejected</div>;
    }

    if (status === 'resolved') {
      const { gallery, total } = this.state;
      return (
        <div>
          <ul className={s.ImageGallery}>
            {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
                showModalImage={this.showModalImage}
              />
            ))}
          </ul>
          {total > 12 && (
            <Button title="Load more" onClick={this.incrementPage} />
          )}

          {this.state.showModal && (
            <Modal onClose={this.toggleModal} source={clickedImage}>
              <img src={clickedImage} alt="large" />
            </Modal>
          )}

          <div ref={this.endindScroll} />
        </div>
      );
    }
  }
}

export default ImageGallery;
