import propTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ gallery, showModalImage }) {
  return (
    <ul className={s.ImageGallery}>
      {gallery.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          showModalImage={showModalImage}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  showModalImage: propTypes.func.isRequired,
  gallery: propTypes.arrayOf(
    propTypes.shape({
      largeImageURL: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
