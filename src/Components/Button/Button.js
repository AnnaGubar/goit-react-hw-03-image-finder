import s from './Button.module.css';

const Button = ({ title }) => {
  return (
    <button className={s.loadBtn} type="submit">
      {title}
    </button>
  );
};

export default Button;
