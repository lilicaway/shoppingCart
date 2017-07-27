import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import { Grid, NavItem, Navbar, Nav, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Admin from './Admin';
import Cart from './Cart';
import Home from './Home';

const FourOhFour = () => <h1>404</h1>;

const Root = ({ store }) =>
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Shopping Cart App</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer exact to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <NavItem eventKey={2}>Cart</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin">
                  <NavItem eventKey={3}>Admin</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Shopping Cart App</h1>
          </Grid>
        </Jumbotron>
        <Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" component={Admin} />

            <Route path="/cart" component={Cart} />
            <Route component={FourOhFour} />
          </Switch>
        </Grid>
      </div>
    </BrowserRouter>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
