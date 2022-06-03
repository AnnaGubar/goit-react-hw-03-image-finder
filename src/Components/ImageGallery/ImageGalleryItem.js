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

export default ImageGallery;
