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
      id:'',
    }
  }

  componentDidMount() {
    this.getCart()
    total = 0;
  }

  getCart() {
    axios.get('http://localhost:3000/api' + '/get-cart')
      .then((responseCart)=> {
      axios.get('http://localhost:3000/api' + '/products')
        .then((responseProducts)=> {
          var cartItems =responseProducts.data.filter((v)=>{
            return responseCart.data[''+v.id+''] > 0;
        });
          var cartItemQuantity = cartItems.map((v)=>{
            var newItem = v;
          newItem.quantity = responseCart.data[''+v.id+''];
          return newItem;
        });
        this.setState({
          cart: cartItemQuantity
        })
      })
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  onRemoveClick(id, e){
    e.preventDefault();
    console.log(id);
    axios.post('http://localhost:3000'+ '/api/remove-product?id=' + id)
      .then((response)=>{
        // console.log(cart.id);
        this.getCart();
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
                // console.log(total);
                let id = product.id
                return (
                <li className="product-item-cart" key={product.id}>{product.name}: ${product.price}
                  <button onClick={this.onRemoveClick.bind(this, id)}>Delete</button>
                </li>
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
