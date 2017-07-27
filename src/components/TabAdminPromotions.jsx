import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PromotionList from './PromotionList';
import { PromotionPercentageAddForm, PromotionQuantityAddForm } from './PromotionAddForm';

class TabAdminPromotions extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <PromotionList />
          </div>
          <div>
            <Nav bsStyle="pills">
              <LinkContainer to="/admin/promotions/add/percentage">
                <NavItem eventKey={1}>New Percentage Promotion</NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/promotions/add/quantity">
                <NavItem eventKey={2}>New Quantity Promotion</NavItem>
              </LinkContainer>
            </Nav>
          </div>
        </div>
        <Switch>
          <Route path="/admin/promotions/add/percentage">
            <div>
              <PromotionPercentageAddForm />
            </div>
          </Route>
          <Route path="/admin/promotions/add/quantity">
            <div>
              <PromotionQuantityAddForm />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default TabAdminPromotions;
