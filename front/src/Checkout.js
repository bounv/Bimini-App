import React, { Component } from 'react';
import axios from 'axios';
import './Checkout.css';
import { Link } from 'react-router';

export default class Checkout extends Component {
  render() {
    return(
      <div className="checkout-container">
        <div className="cart-header">
          <div className='center'>
            <h1 className="bimini-name-cart"><Link to={'/'}>Bimini</Link></h1>
            <h3 className="cart-name">Checkout</h3>
          </div>
        </div>
        <div className="middle-section">
            <div className="center-inputs">
              <input className='checkout-inputs' style={{maxWidth: '5.75rem'}} type='number' maxlength='5' placeholder='Enter ZipCode' />
              <button className='checkout-inputs'>Enter</button>
            </div>
        </div>
      </div>
    )
  }
}
