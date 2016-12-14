import React, { Component } from 'react';
import {Link} from 'react-router';
import './Cart.css';
import cart from './CartPage.jpg';
import axios from 'axios';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state={
      cart:[]
    }
  }

  componentDidMount() {
    this.getCart()
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
                return (
                <li className="product-item-cart" key={product.id}>{product.name}: ${product.price}</li>
              )
              })}
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
