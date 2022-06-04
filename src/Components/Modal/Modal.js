import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  // создаем слушатель события keydown (закрытие по Escape)
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // удаляем слушатель события keydown
  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');
      this.props.onClose(); // родительский метод toggleModal
    }
  };

  // обработка клика по backdrop
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      // console.log('Кликнули в бекдроп');
      this.props.onClose(); // родительский метод toggleModal
    }
  };

  render() {
    const { source, children } = this.props;

    return createPortal(
      <div className={s.backdrop} onClick={this.handleBackdropClick}>
        <div className={s.content} source={source}>
          {children}
        </div>
      </div>,
      modalRoot,
    );
  }
}
