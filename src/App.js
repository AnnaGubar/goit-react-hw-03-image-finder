import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
    // page: 1,
  };

  handleValueSearch = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleValueSearch} />
        <ImageGallery
          searchValue={this.state.searchValue}
          // page={this.state.page}
        />
      </div>
    );
  }
}

export default App;
