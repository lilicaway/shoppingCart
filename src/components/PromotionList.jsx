import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { getPromotionList } from '../redux/reducers';
import { PROMOTION_PERCENTAGE, PROMOTION_QUANTITY } from '../model/promotion';
import { formatPercentage } from './common/numberUtils';

class PromotionList extends Component {
  render() {
    const promotions = this.props.promotions.map(promotion => <Promotion key={promotion.id} {...promotion} />);
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {promotions}
        </tbody>
      </Table>
    );
  }
}

PromotionList.propTypes = {};

const mapStateToProps = state => {
  return {
    promotions: getPromotionList(state)
  };
};

export default connect(mapStateToProps)(PromotionList);

class Promotion extends Component {
  render() {
    const { name, type } = this.props;
    const descriptionComponent = getDescriptionComponent(this.props);

    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          {type}
        </td>
        <td>
          {descriptionComponent}
        </td>
      </tr>
    );
  }
}

Promotion.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  discountRate: PropTypes.number,
  forQuantity: PropTypes.number,
  pay: PropTypes.number
};

const getDescriptionComponent = props => {
  switch (props.type) {
    case PROMOTION_PERCENTAGE:
      return <PercentageDescription key={props.id} {...props} />;
    case PROMOTION_QUANTITY:
      return <QuantityDescription key={props.id} {...props} />;
    default:
      throw new Error(`Unexpected promotion type: ${props.type}`);
  }
};

class PercentageDescription extends Component {
  render() {
    const { discountRate } = this.props;
    return (
      <div>
        {formatPercentage(discountRate)} discount from the full price
      </div>
    );
  }
}

PercentageDescription.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  discountRate: PropTypes.number.isRequired
};

class QuantityDescription extends Component {
  render() {
    const { forQuantity, pay } = this.props;
    return (
      <div>
        Take {forQuantity} items for this product, pay {pay}
      </div>
    );
  }
}

QuantityDescription.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  forQuantity: PropTypes.number.isRequired,
  pay: PropTypes.number.isRequired
};
