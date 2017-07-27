import reducers from '../../../reducers';

test('ADD_PRODUCT', () => {
  let state;
  state = reducers(
    {
      shopping: {
        products: {},
        promotions: {},
        cart: {}
      },
      form: {},
      dataLoader: { loading: true, errorMessage: '', isCompleted: false }
    },
    { type: 'ADD_PRODUCT', payload: { id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', name: 'Apple', price: 0.25 } }
  );
  expect(state).toEqual({
    shopping: {
      products: {
        '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': {
          id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
          name: 'Apple',
          price: 0.25
        }
      },
      promotions: {},
      cart: {}
    },
    form: {},
    dataLoader: { loading: true, errorMessage: '', isCompleted: false }
  });
});
