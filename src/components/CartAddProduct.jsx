import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Grid, Panel, Well } from 'react-bootstrap';
import { getProductList } from '../redux/reducers';
import { addCartItem } from '../redux/actionCreators';
import { formatPrice } from './common/numberUtils';

class CartAddProduct extends Component {
  render() {
    const productComponents = this.props.products.map(product => {
      return <Product key={product.id} {...product} />;
    });
    return (
      <Panel header="Add Products to Cart">
        <Grid fluid={true}>
          {productComponents}
        </Grid>
      </Panel>
    );
  }
}

CartAddProduct.propTypes = {
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    products: getProductList(state)
  };
};

export default connect(mapStateToProps)(CartAddProduct);

class Product extends Component {
  render() {
    const { promotionName } = this.props;
    const promotionComponent = promotionName
      ? <div>
          ({promotionName})
        </div>
      : <div>&nbsp;</div>; // Cheap spacer
    return (
      <Col md={3}>
        <Well bsSize="small" className="text-center">
          <h3>
            {this.props.name}
          </h3>
          <div>
            {formatPrice(this.props.price)} per unit
          </div>
          {promotionComponent}
          <div>
            <Button
              bsSize="small"
              onClick={() => {
                this.props.addToCart(this.props.id);
              }}
            >
              Add to cart
            </Button>
          </div>
        </Well>
      </Col>
    );
  }
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: productId => {
      dispatch(addCartItem(productId));
    }
  };
};

export const UnwrappedCartAddProductTest = CartAddProduct;
Product = connect(undefined, mapDispatchToProps)(Product);
