import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ title, onClick }) => {
  return (
    <button className={s.loadBtn} type="submit" onClick={onClick}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
