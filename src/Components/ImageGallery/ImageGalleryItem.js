import propTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({
  largeImageURL,
  webformatURL,
  tags,
  showModalImage,
}) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => {
          showModalImage(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGallery.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  webformatURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  showModalImage: propTypes.func.isRequired,
};

export default ImageGallery;
