import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Grid, Panel, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadData } from '../redux/actionCreators';
import { isLoadingData, getLoadingDataErrorMessage, isCompletedData } from '../redux/reducers';

class Home extends Component {
  render() {
    const { loading, isCompleted } = this.props;
    return (
      <div>
        <Panel header="Initial Data">
          <p>tl/dr: You can load the initial data and start playing with the app.</p>
          <Grid fluid={true}>
            <Col md={2}>
              <Button bsStyle="primary" onClick={this.props.loadData} disabled={loading || isCompleted}>
                Load initial data
              </Button>
            </Col>
            <Col md={10}>
              <LoadingState {...this.props} />
            </Col>
          </Grid>
        </Panel>
        <Panel header="Features and limitations">
          <h2>Features</h2>
          <p>
            The app has 2 modules. An <Link to="/admin">Admin</Link> module, where you can see and manage the list of{' '}
            <Link to="/admin/promotions">Promotions</Link> and the list of <Link to="/admin/products">Products</Link>,
            and a <Link to="/cart">Cart</Link> module, where you can add and remove the available Products from the
            shopping cart.
          </p>
          <p>
            In the <Link to="/admin/promotions">Promotions</Link> manager you can add promotions from two different
            types. The <Link to="/admin/promotions/add/percentage">Percentage Promotion</Link> section lets you
            configure a Promotion with a name and a discount percentage. The{' '}
            <Link to="/admin/promotions/add/quantity">Quantity Promotion</Link> section lets you add Promotions of the
            kind "take 2, but pay 1", where how many you take and how many you pay is configurable.
          </p>
          <p>
            In the <Link to="/admin/products">Products</Link> manager you can add Products with an name, a unit price
            and, optionally, one of the available Promotions.
          </p>
          <p>
            In the <Link to="/cart">Cart</Link> module you can select produts from the available ones. They will be
            added to the cart and their promotions, if any, will be applied automatically. The cart will show all
            products added, their unit price, the quantity, the name of the promotion (if the product has one) and the
            total price per item. At the bottom it will show the total price for the cart.
          </p>
          <p>
            When the page is loaded for the first time, there are no <Link to="/admin/promotions">Promotions</Link> nor{' '}
            <Link to="/admin/products">Products</Link> available. So it is not possible to use the{' '}
            <Link to="/cart">Cart</Link>. You can go to the <Link to="/admin">Admin</Link> module and add them manually,
            or you can click on the "Load initial data" button at the top of this page. That button will asynchronously
            add a list of Promotions and Products.
          </p>
          <h2>Limitations</h2>
          Since this is mostly a demo app, there are many limitations.
          <ul>
            <li>
              <strong>Numbers:</strong> all numeric operations are done with standard Javascript numbers, which are
              floating point and error prone. A library to format the results with 2 digits is being used, but it could
              be that, depending on the numbers, there could be small inconsistencies.
            </li>
            <li>
              <strong>Remove/Edit Products and Promotions:</strong> it is not possible to edit nor remove neither
              Products nor Promotions. However, items from the Cart can be removed by using the decrement button until
              it reaches zero.
            </li>
            <li>
              <strong>Persistency:</strong> there is no data persistency at all. If you close or reload the page, all
              data is lost. The asynchronous loading of data shows an example of using asynchronouse actions in redux.
            </li>
            <li>
              <strong>Validations:</strong> there are some validations on the forms used to add Promotions and Products,
              but they are not full proof (you could add negative numbers, for example). And there is absolutely no
              validation of the data entererd in the action creators (so if the data comming from the backend as initial
              data is corrupted, it will just result in unexpected results). And in most of the places where data is
              shown, it is assumed to be valid.
            </li>
            <li>
              <strong>Admin permission:</strong> the <Link to="/admin">Admin</Link> module doesn't have any kind of
              permission validation whatsoever. It is just there to demo how to add Promotions and Products.
            </li>
            <li>
              <strong>Styling:</strong>{' '}
              <a href="http://getbootstrap.com/css" target="_blank" rel="noopener noreferrer">
                Bootstrap
              </a>{' '}
              and{' '}
              <a href="https://react-bootstrap.github.io/components.html" target="_blank" rel="noopener noreferrer">
                react-bootstrap
              </a>{' '}
              are the only things being used for styling the app. No custom .css file was written, so the application
              doesn't look perfect everywhere.
            </li>
            <li>
              <strong>Tests:</strong> there are examples of different types of tests, but not everything is being
              tested.
            </li>
          </ul>
        </Panel>
      </div>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: isLoadingData(state),
    errorMessage: getLoadingDataErrorMessage(state),
    isCompleted: isCompletedData(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: () => {
      dispatch(loadData());
    }
  };
};

export const UnwrappedHomeForTest = Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);

class LoadingState extends Component {
  render() {
    const { loading, isCompleted, errorMessage } = this.props;
    if (loading) {
      return <i className="fa fa-spinner fa-spin" style={{ fontSize: 24 + 'px' }} />;
    } else if (errorMessage) {
      return (
        <Alert bsStyle="danger">
          <strong>Error!</strong> {errorMessage}.
        </Alert>
      );
    } else if (isCompleted) {
      return <Alert bsStyle="success">Promotions and Products default data loaded successfully.</Alert>;
    }
    return <div />;
  }
}

LoadingState.propTypes = {
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired
};

export const LoadingStateForTest = LoadingState;
