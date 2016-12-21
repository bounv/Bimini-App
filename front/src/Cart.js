import React, {Component} from 'react';
import {Link} from 'react-router';
import './Cart.css';
import cart from './CartPage.jpg';
import axios from 'axios';
import api from './Api';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      idNumber: '',
      total: 0
    }
  }

  componentDidMount() {
    this.getCart()
  }

  getCart() {
    axios.get(api() + '/api/get-cart').then((responseCart) => {
      axios.get(api() + '/api/products').then((responseProducts) => {
        var cartItems = responseProducts.data.filter((v) => {
          return responseCart.data['' + v.id + ''] > 0;
        });
        var cartItemQuantity = cartItems.map((v) => {
          var newItem = v;
          newItem.quantity = responseCart.data['' + v.id + ''];
          return newItem;
        });
        this.setState({cart: cartItemQuantity})
        this.getTotal()
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  getTotal() {
    let totals = this.state.cart.map((product) => {
      return product.price * product.quantity
    })
    let total = totals.reduce((a, v) => {
      return a + v;
    }, 0)
    this.setState({total})
  }

  onRemoveClick(idNumber, e) {
    e.preventDefault();
    console.log(idNumber);
    axios.post(api() +
      '/api/remove-product?id=' + idNumber).then((response) => {
      // console.log(cart.id);
      this.getCart();
    }).catch((error) => {
      console.log(error);
    });
  }

  onQuantityChange(idNumber, e) {
    e.preventDefault()
    axios.post(api() +
      '/api/change-quantity?id=' + idNumber + '&newQuantity=' + e.target.value).then(() => {
      this.getCart();
    })
  }

  render() {
    return (
      <div className="cart-page-container">
        <div className="cart-header">
          <div className='center'>
            <h1 className="bimini-name-cart">
              <Link to={'/'}>Bimini</Link>
            </h1>
            <h3 className="cart-name">Cart</h3>
          </div>
        </div>
        <div className="mid-section-cart">
          <img className="cart-image" src={cart} alt='image'/>
          <div className="opaque-box-cart">
            <ul className="product-cart">
              {this.state.cart.map((product, index) => {
                // console.log(total);
                let idNumber = product.id
                return (
                  <li className="product-item-cart" key={product.id}>
                    <controls>
                      <i className="fa fa-times" aria-hidden="true" style={{
                        color: 'red',
                        marginRight: '.5rem'
                      }} onClick={this.onRemoveClick.bind(this, idNumber)}></i>
                      <input onChange={this.onQuantityChange.bind(this, idNumber)} style={{
                        maxWidth: '2.75rem'
                      }} type='number' min='1' placeholder={'qty: ' + product.quantity}/>
                    </controls>
                    {product.name}: ${product.price}
                  </li>
                )
              })}
              <hr style={{
                width: '100%'
              }}/>
              <li className='product-item-cart' style={{
                textAlign: 'center'
              }}>
                <span>Total:</span>
                <span>${this.state.total}</span>
              </li>
            </ul>
              <Link to='/checkout'>
                <button className="button-cart">Checkout</button>
              </Link>
          </div>
        </div>
        <footr>
          <p className="phone-number">555.555.5555</p>
        </footr>
      </div>
    )
  }
}
export default Cart;
