import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from './Components/Searchbar';
// import ImageGallery from './Components/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
    images: [],
  };

  handleValueSearch = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleValueSearch} />
        {/* <ImageGallery searchValue={this.state.searchValue} /> */}
      </div>
    );
  }
}

export default App;
