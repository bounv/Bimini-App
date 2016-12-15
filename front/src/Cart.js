import React, { Component } from 'react';
import {Link} from 'react-router';
import './Cart.css';
import cart from './CartPage.jpg';
import axios from 'axios';
let total = 0;


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state={
      cart: [],
    }
  }

  componentDidMount() {
    this.getCart()
    total = 0;
  }

  getCart() {
    axios.get('http://localhost:3000/api/products').then((response)=> {
      console.log(response.data);
      let cart=(response.data);
      this.setState({
        cart
      })
    })
    .catch((error)=> {
      console.log(error);
    });
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
              {this.state.cart.map((product, index) => {
                total = total + product.price;
                console.log(total);
                return (
                <li className="product-item-cart" key={product.id}>{product.name}: ${product.price}</li>
              )
              })}
              <hr style={{width: '100%'}}/>
              <li className='product-item-cart' style={{textAlign: 'center'}}><span>Total:</span> <span>${total}</span></li>
              </ul>
          </div>
        </div>
        <div className="button-class">
          <button className="button-cart">Checkout</button>
        </div>
        <footr>
          <p className="phone-number">555.555.5555</p>
        </footr>
      </div>
    )
  }
}
export default Cart;
