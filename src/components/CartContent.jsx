import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Table } from 'react-bootstrap';
import { getCartContent } from '../redux/reducers';
import { incrementCartItemQuantity, decrementCartItemQuantity } from '../redux/actionCreators';
import { formatPrice } from './common/numberUtils';

class CartContent extends Component {
  render() {
    const itemComponents = this.props.cartItems.map(cartItem => {
      return (
        <ItemComponent
          key={cartItem.productId}
          {...cartItem}
          incrementQuantity={this.props.incrementQuantity}
          decrementQuantity={this.props.decrementQuantity}
        />
      );
    });
    return (
      <Panel header="Cart Content">
        <Table responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Promotion</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {itemComponents}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4">Total</th>
              <th>
                {formatPrice(this.props.totalPrice)}
              </th>
            </tr>
          </tfoot>
        </Table>
      </Panel>
    );
  }
}

CartContent.propTypes = {
  cartItems: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { totalPrice, cartItems } = getCartContent(state);
  return {
    cartItems: cartItems,
    totalPrice: totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementQuantity: productId => {
      dispatch(incrementCartItemQuantity(productId));
    },
    decrementQuantity: productId => {
      dispatch(decrementCartItemQuantity(productId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContent);

class ItemComponent extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.productName}
        </td>
        <td>
          {formatPrice(this.props.unitPrice)}
        </td>
        <td>
          <Button
            bsSize="xsmall"
            onClick={() => {
              this.props.decrementQuantity(this.props.productId);
            }}
          >
            -
          </Button>
          &nbsp;{this.props.quantity}&nbsp;
          <Button
            bsSize="xsmall"
            onClick={() => {
              this.props.incrementQuantity(this.props.productId);
            }}
          >
            +
          </Button>
        </td>
        <td>
          {this.props.promotionName}
        </td>
        <td>
          {formatPrice(this.props.price)}
        </td>
      </tr>
    );
  }
}
ItemComponent.propTypes = {
  productId: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  promotionName: PropTypes.string,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired
};
