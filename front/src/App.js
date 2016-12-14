import React, { Component } from 'react';
import {Link} from 'react-router';
import jpg from './HeaderNav.jpg';
import './App.css';
import pic from './LandingPage2.jpg';
import axios from 'axios';

class App extends Component {
  componentDidMount (){
    axios.get('http://localhost:3000/api/hello').then((response)=> {
      console.log(response.data);
    })
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={jpg} className="Nav-photo" alt="image" />
          <ul className="nav-titles">
            <li className="bimini-name">Bimini</li>
            <li className="list-title"><Link to={"/products"}>Products</Link></li>
            <li className="list-title"><Link to={"/cart"}>Cart</Link></li>
          </ul>
        </div>
        <h2 className="slogan-main">Water from the heavens</h2>
        <div className="mid-section">
          <img src={pic} className="land-photo" alt="image" />
          <div className="opaque-box">
            <span className="landing-page-desc">Bimini is your premiere source for artisinal waters imbued with all the finest minerals on earth. Browse our premium selection of products to find the perfect water for your needs and price range.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
