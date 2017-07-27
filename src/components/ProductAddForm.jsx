import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { Button, Panel } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import { getPromotionList } from '../redux/reducers';
import { addProduct } from '../redux/actionCreators';
import { parseAsFloat, validatableFieldRenderer } from './common/formUtilities';

class ProductAddForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const promotions = [
      <option key="NoPromotion" value="NoPromotion">
        No Promotion
      </option>
    ].concat(
      this.props.promotions.map(promotion =>
        <option key={promotion.id} value={promotion.id}>
          {promotion.name}
        </option>
      )
    );
    return (
      <Panel header="Add a new product">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="name">
              Product Name
            </label>
            <Field className="col-sm-10" name="name" component={validatableFieldRenderer} type="text" />
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="price">
              Unit price
            </label>
            <Field
              className="col-sm-10"
              name="price"
              component={validatableFieldRenderer}
              type="number"
              parse={parseAsFloat}
            />
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="promotionId">
              Promotion
            </label>
            <Field className="col-sm-10" name="promotionId" component="select">
              {promotions}
            </Field>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-1 col-sm-2">
              <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>
                Add Product
              </Button>
            </div>
            <div className=" col-sm-9">
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

const mapStateToProps = state => {
  return {
    promotions: getPromotionList(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: newProduct => {
      newProduct = {
        id: uuidv4(),
        ...newProduct
      };
      if (newProduct.promotionId === 'NoPromotion') {
        delete newProduct.promotionId;
      }
      dispatch(addProduct(newProduct));
      dispatch(reset('addProduct'));
    }
  };
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  return errors;
};

ProductAddForm = reduxForm({
  // a unique name for the form
  form: 'addProduct',
  validate
})(ProductAddForm);

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm);
