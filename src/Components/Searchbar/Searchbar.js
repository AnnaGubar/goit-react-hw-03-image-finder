import React, { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSearchValue = e => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.SearchFormBtn}>
            <span className={s.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            value={this.state.searchValue}
            onChange={this.handleSearchValue}
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
