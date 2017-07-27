import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';
import Cart, { UnwrappedCartAddProductTest } from '../CartAddProduct';

test('Cart add product renders correctly', () => {
  const products = [
    {
      id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
      name: 'Apple',
      price: 0.25
    },
    {
      id: 'a9dd5019-194f-4cd0-a661-5e9485676879',
      name: 'Papaya',
      price: 0.5,
      promotionName: '3 x 2'
    }
  ];
  const component = shallow(<UnwrappedCartAddProductTest products={products} />);
  expect(component).toMatchSnapshot();
});
