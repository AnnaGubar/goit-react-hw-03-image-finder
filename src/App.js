import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

class App extends Component {
  state = {
    images: [],
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}

export default App;
