import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './App';
import Cart from './Cart';
import ProductsPage from './ProductsPage'
import './index.css';




ReactDOM.render((
  <Router history={hashHistory}>
      <Route path='/' component={App}/>
      <Route path="products" component={ProductsPage}/>
      <Route path="cart" component={Cart}/>
      {/* <Route path="*" component={NoMatch}/> */}
  </Router>
), document.getElementById('root'));
