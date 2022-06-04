import s from './Button.module.css';

const Button = ({ title, onClick }) => {
  return (
    <button className={s.loadBtn} type="submit" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
