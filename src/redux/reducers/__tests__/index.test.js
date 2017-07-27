import * as mainReducerApi from '../index';

import values from 'object.values';
if (!Object.values) {
  // To address the 'TypeError: Object.values is not a function' on the tests.
  values.shim();
}

const fullState = {
  shopping: {
    products: {
      '42d1595f-63d6-4c68-967a-e1ec4d7ca37c': {
        id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
        name: 'Apple',
        price: 0.25
      },
      '84f02126-160d-4950-99a6-0335b9c49b1b': {
        id: '84f02126-160d-4950-99a6-0335b9c49b1b',
        name: 'Orange',
        price: 0.3
      },
      '303b0e06-ad7a-49e5-8a30-63fb12027990': {
        id: '303b0e06-ad7a-49e5-8a30-63fb12027990',
        name: 'Banana',
        price: 0.15
      },
      'a9dd5019-194f-4cd0-a661-5e9485676879': {
        id: 'a9dd5019-194f-4cd0-a661-5e9485676879',
        name: 'Papaya',
        price: 0.5,
        promotionId: '85d80dfa-46b9-4e87-8a76-2ad2cfcca040'
      }
    },
    promotions: {
      '1d7bae3b-593c-4335-8b59-1a9b6031b47b': {
        id: '1d7bae3b-593c-4335-8b59-1a9b6031b47b',
        name: '10% discount',
        type: 'PERCENTAGE',
        discountRate: 0.1
      },
      '85d80dfa-46b9-4e87-8a76-2ad2cfcca040': {
        id: '85d80dfa-46b9-4e87-8a76-2ad2cfcca040',
        name: '3 x 2',
        type: 'QUANTITY',
        forQuantity: 3,
        pay: 2
      }
    },
    cart: {
      '84f02126-160d-4950-99a6-0335b9c49b1b': {
        productId: '84f02126-160d-4950-99a6-0335b9c49b1b',
        quantity: 1
      },
      'a9dd5019-194f-4cd0-a661-5e9485676879': {
        productId: 'a9dd5019-194f-4cd0-a661-5e9485676879',
        quantity: 4
      }
    }
  },
  form: {},
  dataLoader: {
    loading: false,
    errorMessage: '',
    isCompleted: true
  }
};

test('getCartContent', () => {
  expect(mainReducerApi.getCartContent(fullState)).toMatchSnapshot();
});

test('getProductList', () => {
  expect(mainReducerApi.getProductList(fullState)).toMatchSnapshot();
});

test('getPromotionList', () => {
  expect(mainReducerApi.getPromotionList(fullState)).toMatchSnapshot();
});

test('isLoadingData', () => {
  expect(mainReducerApi.isLoadingData(fullState)).toBe(false);
});

test('getLoadingDataErrorMessage', () => {
  expect(mainReducerApi.getLoadingDataErrorMessage(fullState)).toEqual('');
});

test('isCompletedData', () => {
  expect(mainReducerApi.isCompletedData(fullState)).toBe(true);
});
