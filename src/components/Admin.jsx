import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import TabAdminProducts from './TabAdminProducts.jsx';
import TabAdminPromotions from './TabAdminPromotions.jsx';

class Admin extends Component {
  render() {
    return (
      <div>
        <Nav bsStyle="tabs">
          <LinkContainer to="/admin/products">
            <NavItem eventKey="1">Products Manager</NavItem>
          </LinkContainer>
          <LinkContainer to="/admin/promotions">
            <NavItem eventKey="2">Promotions Manager</NavItem>
          </LinkContainer>
        </Nav>
        <Switch>
          <Route path="/admin/products" component={TabAdminProducts} />
          <Route path="/admin/promotions" component={TabAdminPromotions} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
