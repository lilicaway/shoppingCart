import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { getProductList } from '../redux/reducers';
import { formatPrice } from './common/numberUtils';

class ProductList extends Component {
  render() {
    const products = this.props.products.map(product => <Product key={product.id} {...product} />);
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit price</th>
            <th>Promotion </th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </Table>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const products = getProductList(state);
  return {
    products
  };
};

export default connect(mapStateToProps)(ProductList);

class Product extends Component {
  render() {
    const { name, price, promotionName } = this.props;
    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          {formatPrice(price)}
        </td>
        <td>
          {promotionName}
        </td>
      </tr>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  promotionName: PropTypes.string
};
