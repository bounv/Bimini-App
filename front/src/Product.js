import React, {Component} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';

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
    let productNotFound = false;
    if (this.state.products.length > 0) {
      productsLoaded = true;
    }
    if (this.props.params.productId > 2 || this.props.params.productId < 0) {
      productNotFound = true;
    }
    return (
      <div style={{
        display:'flex',
        flexDirection:'column',
      }}>
        <header style={{
          height: '7rem',
          backgroundColor: '#007BCD',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Link to={'/'}>
            <h1 style={{
              margin: 0
            }}>Bimini</h1>
          </Link>
          <h3 style={{
            margin: '0 0 0 .5rem'
          }}>{productsLoaded
              ? this.state.products[this.props.params.productId].name
              : null}</h3>
          <Link to={'/cart'}>
            <i className="fa fa-shopping-cart" aria-hidden="true" style={{
              position: 'absolute',
              right: '5%',
              top: '2%',
              margin: 0
            }}></i>
          </Link>
        </header>
        <content style={{
          backgroundColor: '#369af8',
          display: 'block',
          height: '90vh'
        }}>
        <div className="main-section" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
            <div className='notFound' style={{marginTop: '5rem', textAlign: 'center', display: productNotFound ? 'block' : 'none'}}>
              <h3 style={{display: productNotFound ? 'inline' : 'none'}}>Product not found</h3>
            </div>
            <img style={{width:'5rem', marginTop:'2rem' }} src={productsLoaded ? this.state.products[this.props.params.productId].imageName : null} />
            <description style={{marginTop:'2rem', width: '15rem', color:'white', fontFamily:'Rosario'}}>{productsLoaded
                ? this.state.products[this.props.params.productId].description
                : null}
            </description>
            <button style={{cursor: 'pointer', marginTop:'2rem', border: '2px solid white', backgroundColor:'white', borderRadius:'5px', display: productsLoaded ? 'inline-block' : 'none'}} onClick={this.addToCart.bind(this)}>Add to Cart</button>
          </div>
        </content>
      </div>
    );
  }
}
