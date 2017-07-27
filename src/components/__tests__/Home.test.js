import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';
import Home, { UnwrappedHomeForTest, LoadingStateForTest } from '../Home';

test('Home renders correctly', () => {
  const component = shallow(<UnwrappedHomeForTest loading={false} errorMessage="" isCompleted={false} />);
  expect(component).toMatchSnapshot();
});

test('Home Load button enabled', () => {
  const component = shallow(<UnwrappedHomeForTest loading={false} errorMessage="" isCompleted={false} />);
  expect(component.find(Button).props().disabled).toBe(false);
});

test('Home Load button disabled because of loading', () => {
  const component = shallow(<UnwrappedHomeForTest loading={true} errorMessage="" isCompleted={false} />);
  expect(component.find(Button).props().disabled).toBe(true);
});

test('Home Load button disabled because of isCompleted', () => {
  const component = shallow(<UnwrappedHomeForTest loading={false} errorMessage="" isCompleted={true} />);
  expect(component.find(Button).props().disabled).toBe(true);
});

test('LoadingState default renders correctly', () => {
  const component = shallow(<LoadingStateForTest loading={false} errorMessage="" isCompleted={false} />);
  expect(component).toMatchSnapshot();
});

test('LoadingState loading with spinner renders correctly', () => {
  const component = shallow(<LoadingStateForTest loading={true} errorMessage="" isCompleted={false} />);
  expect(component).toMatchSnapshot();
});

test('LoadingState loading completed renders correctly', () => {
  const component = shallow(<LoadingStateForTest loading={false} errorMessage="" isCompleted={true} />);
  expect(component).toMatchSnapshot();
});

test('LoadingState loading error renders correctly', () => {
  const component = shallow(<LoadingStateForTest loading={false} errorMessage="Some error" isCompleted={false} />);
  expect(component).toMatchSnapshot();
});
