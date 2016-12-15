import React, { Component } from 'react';
import axios from 'axios';
import './Checkout.css';
import { Link } from 'react-router';
require('round10').polyfill();

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {zip: 0, total: 0, tax: 0, zipSubmitted: false}
  }

  onZipChange(e) {
    console.log(e.target.value)
    this.setState({zip: e.target.value})
  }

  calculateTax(e) {
    e.preventDefault();
    console.log('asdasd')
    axios.get('http://localhost:3000' + '/api/tax?zipCode=' + this.state.zip).then((response) => {
      this.setState({total: response.data.total, tax: response.data.totalRate, zipSubmitted: true})
    })
  }

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
              <form onSubmit={this.calculateTax.bind(this)}>
                <input onChange={this.onZipChange.bind(this)} className='checkout-inputs' style={{maxWidth: '5.75rem'}} type='number' placeholder='Enter ZipCode' />
                <button className='checkout-inputs'>Enter</button>
              </form>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className='totals opaque-box' style={{marginTop: '2rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', display: this.state.zipSubmitted ? 'flex' : 'none'}}>
                <h2 style={{color: 'white', fontFamily: 'Rosario', marginBottom: 0, textDecoration: 'underline'}}>Receipt</h2>
                <p style={{color: 'white', fontFamily: 'Rosario'}}>subtotal: {this.state.total}</p>
                <p style={{color: 'white', fontFamily: 'Rosario'}}>tax: {this.state.tax}</p>
                <p style={{color: 'white', fontFamily: 'Rosario'}}>total: {Math.round10(this.state.total + (this.state.total * (this.state.tax/100)), -2)}</p>
                <h2 style={{color: 'white', fontFamily: 'Rosario'}}>Thank you!</h2>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
