import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <div className={s.content}>
        <BallTriangle
          height="100"
          width="100"
          color="blue"
          ariaLabel="loading"
        />
      </div>
    </div>
  );
};

export default Loader;
