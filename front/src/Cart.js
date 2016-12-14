import React, { Component } from 'react';
import {Link} from 'react-router';
import './Cart.css';
import cart from './CartPage.jpg';
import axios from 'axios';


class Cart extends Component {
  componentDidMount (){
    axios.get('http://localhost:3000/api/products').then((response)=> {
      console.log(response.data);
    })
  }

  render() {
    return (
      <div className="cart-page-container">
        <div className="cart-header">
          <div className='center'>
            <h1 className="bimini-name-cart"><Link to={'/'}>Bimini</Link></h1>
            <h3 className="cart-name">Cart</h3>
          </div>
        </div>
        <div className="mid-section-cart">
          <img className="cart-image" src={cart} alt='image' />
            <div className="opaque-box-cart">
              <ul className="product-cart">
                <li className="product-item-cart">item1</li>
                <li className="total-cart">total</li>
              </ul>
          </div>
        </div>
        <div className="button-class">
          <button className="button-cart">Checkout</button>
        </div>
        <footer>
          <p className="phone-number">555.555.5555</p>
        </footer>
      </div>
    )
  }
}
export default Cart;
