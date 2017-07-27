import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { Button, Panel } from 'react-bootstrap';
import { PROMOTION_PERCENTAGE, PROMOTION_QUANTITY } from '../model/promotion';
import uuidv4 from 'uuid/v4';
import { parseAsFloat, parseAsInt, validatableFieldRenderer } from './common/formUtilities';
import { addPromotion } from '../redux/actionCreators';

class PromotionAddForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    let promotionDetail = getSpecificFieldsComponent(this.props);
    return (
      <Panel>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="name">
              Promotion Name
            </label>
            <Field className="col-sm-10" name="name" component={validatableFieldRenderer} type="text" />
          </div>
          {promotionDetail}
          <div className="form-group">
            <div className="col-sm-offset-1 col-sm-2">
              <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>
                Add Promotion
              </Button>
            </div>
            <div className="col-sm-9">
              <Button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </Button>
            </div>
          </div>
        </form>
      </Panel>
    );
  }
}

PromotionAddForm.propTypes = {
  promotionType: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (newPromotion, _, props) => {
      newPromotion = {
        id: uuidv4(),
        ...newPromotion
      };
      if (newPromotion.percentage) {
        newPromotion.discountRate = newPromotion.percentage /= 100.0;
        delete newPromotion.percentage;
      }
      newPromotion.type = props.promotionType;
      dispatch(addPromotion(newPromotion));
      dispatch(reset(props.form));
    }
  };
};

export const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  switch (props.promotionType) {
    case PROMOTION_PERCENTAGE:
      if (!values.percentage) {
        errors.percentage = 'Required';
      }
      break;
    case PROMOTION_QUANTITY:
      if (!values.forQuantity) {
        errors.forQuantity = 'Required';
      }
      if (!values.pay) {
        errors.pay = 'Required';
      }
      if (values.forQuantity && values.pay && values.pay >= values.forQuantity) {
        errors.pay = errors.forQuantity = 'Value for items to pay must be less than value for items to take.';
      }
      break;
    default:
      throw new Error(`Unexpected promotion type: ${props.promotionType}`);
  }
  return errors;
};

const InternalPromotionQuantityAddForm = connect(undefined, mapDispatchToProps)(
  reduxForm({
    // a unique name for the form
    form: 'addPromotionQuantity',
    validate
  })(PromotionAddForm)
);

export class PromotionQuantityAddForm extends Component {
  render() {
    return <InternalPromotionQuantityAddForm promotionType={PROMOTION_QUANTITY} />;
  }
}

const InternalPromotionPercentageAddForm = connect(undefined, mapDispatchToProps)(
  reduxForm({
    // a unique name for the form
    form: 'addPromotionPercentage',
    validate
  })(PromotionAddForm)
);

export class PromotionPercentageAddForm extends Component {
  render() {
    return <InternalPromotionPercentageAddForm promotionType={PROMOTION_PERCENTAGE} />;
  }
}

const getSpecificFieldsComponent = props => {
  switch (props.promotionType) {
    case PROMOTION_PERCENTAGE:
      return <PromotionPercentageFields key={props.id} {...props} />;
    case PROMOTION_QUANTITY:
      return <PromotionQuantityFields key={props.id} {...props} />;
    default:
      throw new Error(`Unexpected promotion type: ${props.promotionType}`);
  }
};

class PromotionPercentageFields extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="percentage">
            Percentage of discount
          </label>
          <Field
            className="col-sm-10"
            name="percentage"
            component={validatableFieldRenderer}
            type="number"
            parse={parseAsFloat}
          />
        </div>
      </div>
    );
  }
}

PromotionPercentageFields.propTypes = {};

class PromotionQuantityFields extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="forQuantity">
            Number of items to take
          </label>
          <Field
            className="col-sm-10"
            name="forQuantity"
            component={validatableFieldRenderer}
            type="number"
            parse={parseAsInt}
          />
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="pay">
            Number of items to pay
          </label>
          <Field
            className="col-sm-10"
            name="pay"
            component={validatableFieldRenderer}
            type="number"
            parse={parseAsInt}
          />
        </div>
      </div>
    );
  }
}

PromotionQuantityFields.propTypes = {};
