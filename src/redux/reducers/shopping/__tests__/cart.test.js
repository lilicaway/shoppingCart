import reducers from '../../../reducers';

test('addproductToCart', () => {
  let state;
  state = reducers(
    {
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
      dataLoader: { loading: false, errorMessage: '', isCompleted: true }
    },
    { type: 'ADD_CART_ITEM', payload: { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c' } }
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
      cart: {
        '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', quantity: 1 }
      }
    },
    form: {},
    dataLoader: { loading: false, errorMessage: '', isCompleted: true }
  });
});

test('incrementCartItemQuanity', () => {
  let state;
  state = reducers(
    {
      shopping: {
        products: {
          '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': {
            id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
            name: 'Apple',
            price: 0.25
          }
        },
        promotions: {},
        cart: {
          '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', quantity: 1 }
        }
      },
      form: {},
      dataLoader: { loading: false, errorMessage: '', isCompleted: true }
    },
    { type: 'INCREMENT_CART_ITEM_QUANTITY', payload: { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c' } }
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
      cart: {
        '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', quantity: 2 }
      }
    },
    form: {},
    dataLoader: { loading: false, errorMessage: '', isCompleted: true }
  });
});

test('decrementItemQuantity', () => {
  let state;
  state = reducers(
    {
      shopping: {
        products: {
          '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': {
            id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
            name: 'Apple',
            price: 0.25
          }
        },
        promotions: {},
        cart: {
          '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', quantity: 2 }
        }
      },
      form: {},
      dataLoader: { loading: false, errorMessage: '', isCompleted: true }
    },
    { type: 'DECREMENT_CART_ITEM_QUANTITY', payload: { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c' } }
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
      cart: {
        '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': { productId: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c', quantity: 1 }
      }
    },
    form: {},
    dataLoader: { loading: false, errorMessage: '', isCompleted: true }
  });
});
