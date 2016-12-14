import React, { Component } from 'react';
import jpg from './HeaderNav2.jpg';
import './App.css';
import pic from './LandingPage2.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="App-header">
          <img src={jpg} className="Nav-photo" alt="image" />
          <p className="bimini-name">Bimini</p>
          <ul className="nav-titles">
            <li className="list-title">Products</li>
            <li className="list-title">Cart</li>
          </ul>
          </div>
          <div className="mid-header">
            <h2 className="slogan-main">Water from the heavens</h2>
            <div className="image-container">
            <img src={pic} className="land-photo" alt="image" />
              <div className="opaque-box">
              <span className="landing-page-desc">Bimini is your premier source for artisinal waters imbued with all the finest minerals on earth. Browse our premium selection of products to find the perfect water for your needs and price range.</span>
              </div>
            </div>
          </div>
          <p className="App-intro">
          </p>
      </div>
    );
  }
}

export default App;
