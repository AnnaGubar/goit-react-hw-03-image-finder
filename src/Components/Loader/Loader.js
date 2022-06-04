import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <BallTriangle height="100" width="100" color="blue" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
