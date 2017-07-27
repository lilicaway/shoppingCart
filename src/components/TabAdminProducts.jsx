import React, { Component } from 'react';
import ProductList from './ProductList';
import ProductAddForm from './ProductAddForm';

class TabAdminProducts extends Component {
  render() {
    return (
      <div>
        <div>
          <ProductList />
        </div>
        <div>
          <ProductAddForm />
        </div>
      </div>
    );
  }
}

export default TabAdminProducts;
