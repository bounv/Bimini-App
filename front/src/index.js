import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App';
import Cart from './Cart';
import ProductsPage from './ProductsPage'
import Product from './Product'
import './index.css';




ReactDOM.render((
  <Router history={browserHistory}>
      <Route path='/' component={App}/>
      <Route path="products" component={ProductsPage}/>
      <Route path="cart" component={Cart}/>
      <Route path="products/:productId" component={Product}/>
      {/* <Route path="*" component={NoMatch}/> */}
  </Router>
), document.getElementById('root'));
