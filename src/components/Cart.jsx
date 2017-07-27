import React, { Component } from 'react';
import CartContent from './CartContent';
import CartAddProduct from './CartAddProduct';

class Cart extends Component {
  render() {
    return (
      <div>
        <CartContent />
        <CartAddProduct />
      </div>
    );
  }
}

export default Cart;
