import React, {Component} from 'react';
import { Link } from 'react-router';

export default class MyComponent extends Component {
  render() {
    return (
      <div>
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
        </header>
        <content style={{
          backgroundColor: '#369af8',
          display: 'block',
          height: '100vh', fontFamily: 'Rosario', textAlign: 'center'
        }}><h3 style={{marginTop: '5rem'}}>Page not found</h3></content>
      </div>
    );
  }
}
