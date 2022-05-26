import React, { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { searchValue } = event.currentTarget.children;
    this.props.onSubmit(searchValue.value);

    searchValue.value = '';
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormBtn}>
            <span className={s.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            name="searchValue"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
