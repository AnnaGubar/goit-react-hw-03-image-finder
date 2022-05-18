import s from './ImageGallery.module.css';

const ImageGallery = ({ webformatURL }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img src={webformatURL} alt="..." className={s.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGallery;
