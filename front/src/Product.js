import React, {Component} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.getProduct()
  }
  getProduct() {
    axios.get('http://localhost:3000/api/products').then((response) => {
      console.log(response.data);
      let products = (response.data);
      this.setState({products})
    }).catch((error) => {
      console.log(error);
    });
  }

  addToCart() {
    axios.post('http://localhost:3000' +'/api/add-product?id=' + this.state.products[this.props.params.productId].id).then((response)=>{
       console.log(response.data);
      browserHistory.push('/products')
    })
  }

  render() {
    let productsLoaded = false;
    if (this.state.products.length > 0) {
      productsLoaded = true;
    }
    return (
      <div>
        <header>
          {productsLoaded ? this.state.products[this.props.params.productId].name : null}
        </header>
        <button onClick={this.addToCart.bind(this)}>Add to Cart</button>
      </div>
    );
  }
}
