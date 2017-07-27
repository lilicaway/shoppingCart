import reducers from '../../reducers';

test('DATA_LOADER_LOADING', () => {
  let state;
  state = reducers(
    {
      shopping: { products: {}, promotions: {}, cart: {} },
      form: {},
      dataLoader: { loading: false, errorMessage: '', isCompleted: false }
    },
    { type: 'DATA_LOADER_LOADING' }
  );
  expect(state).toEqual({
    shopping: { products: {}, promotions: {}, cart: {} },
    form: {},
    dataLoader: { loading: true, errorMessage: '', isCompleted: false }
  });
});

test('DATA_LOADER_COMPLETE', () => {
  let state;
  state = reducers(
    {
      shopping: { products: {}, promotions: {}, cart: {} },
      form: {},
      dataLoader: { loading: true, errorMessage: '', isCompleted: false }
    },
    { type: 'DATA_LOADER_COMPLETE' }
  );
  expect(state).toEqual({
    shopping: { products: {}, promotions: {}, cart: {} },
    form: {},
    dataLoader: { loading: false, errorMessage: '', isCompleted: true }
  });
});

test('DATA_LOADER_ERROR', () => {
  let state;
  state = reducers(
    {
      shopping: { products: {}, promotions: {}, cart: {} },
      form: {},
      dataLoader: { loading: true, errorMessage: '', isCompleted: false }
    },
    { type: 'DATA_LOADER_ERROR', payload: 'Error: Request failed with status code 404' }
  );
  expect(state).toEqual({
    shopping: { products: {}, promotions: {}, cart: {} },
    form: {},
    dataLoader: { loading: false, errorMessage: 'Error: Request failed with status code 404', isCompleted: false }
  });
});
