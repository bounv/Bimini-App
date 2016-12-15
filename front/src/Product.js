import React, {Component} from 'react';
import axios from 'axios';

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
      </div>
    );
  }
}
