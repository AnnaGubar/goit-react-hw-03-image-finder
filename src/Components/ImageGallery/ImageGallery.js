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
    // page: 1,

    showModal: false,
    clickedImage: '',

    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      imagesApi
        .fetchImages(nextName)
        .then(results => {
          this.setState({
            status: Status.RESOLVED,
            gallery: results,
          });
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
      const { gallery } = this.state;
      console.log('gallery.total', gallery.total);

      return (
        <div>
          <ul className={s.ImageGallery}>
            {gallery.hits.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
                showModalImage={this.showModalImage}
              />
            ))}
          </ul>

          {gallery.total > 12 && <Button title="Load more" />}

          {this.state.showModal && (
            <Modal onClose={this.toggleModal} source={clickedImage}>
              <img src={clickedImage} alt="large" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
