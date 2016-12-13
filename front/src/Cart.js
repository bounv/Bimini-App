import React, { Component } from 'react';
import './Cart.css';
import cart from './CartPage.jpg'

class Cart extends Component {
  render() {
    return (
      <div className="cart-page-container">
        <div className="cart-header">
          <span className="bimini-name-cart">Bimini</span>
          <p className="cart-name">Cart</p>
        </div>
        <div className="mid-section-cart">
          <img className="cart-image" src={cart} alt='image' />
            <div className="opaque-box-cart">
              <ul className="product-cart">
                <li className="product-item-cart">item1</li>
                <li className="product-item-cart">item2</li>
                <li className="product-item-cart">item3</li>
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
