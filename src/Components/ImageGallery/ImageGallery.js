import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import imagesApi from '../../services/search-api';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    searchValue: '',
    showModal: false,
    clickedImage: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;

    if (prevName !== nextName) {
      imagesApi
        .fetchImages(nextName)
        .then(searchValue => {
          this.setState({ searchValue });
          console.log(searchValue.hits);
        })
        .catch(error => this.setState({ error }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  showModalImage = clickedImage => {
    this.toggleModal();
    this.setState({ clickedImage: clickedImage });

    console.log(clickedImage);
    console.log(this.state.clickedImage);

    // console.log(this.state.clickedImage.largeImageURL);
  };

  render() {
    const { hits } = this.state.searchValue;

    if (this.state.searchValue === '') {
      return <div></div>;
    }

    if (this.state.searchValue !== '') {
      return (
        <ul className={s.ImageGallery}>
          {hits.map(({ id, largeImageURL, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              largeImageURL={largeImageURL}
              webformatURL={webformatURL}
              tags={tags}
              showModalImage={this.showModalImage}
            />
          ))}

          {this.state.showModal && (
            <Modal onClose={this.toggleModal} source={this.state.clickedImage}>
              <img src={this.state.clickedImage} alt="large" />
            </Modal>
          )}
        </ul>
      );
    }
  }
}

export default ImageGallery;
