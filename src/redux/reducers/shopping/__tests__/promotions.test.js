import reducers from '../../../reducers';

test('addPercentagePromotion', () => {
  let state;
  state = reducers(
    {
      shopping: {
        products: {},
        promotions: {},
        cart: {}
      },
      form: {
        addPromotionPercentage: {
          registeredFields: {
            name: { name: 'name', type: 'Field', count: 1 },
            percentage: { name: 'percentage', type: 'Field', count: 1 }
          },
          fields: { name: { visited: true, touched: true }, percentage: { visited: true, touched: true } },
          values: { name: 'Pay only half', percentage: 50 },
          anyTouched: true
        }
      },
      dataLoader: { loading: false, errorMessage: '', isCompleted: true }
    },
    {
      type: 'ADD_PROMOTION',
      payload: {
        id: '0f366736-38e9-4de8-a2e6-f88eb6a09f41',
        name: 'Pay only half',
        discountRate: 0.5,
        type: 'PERCENTAGE'
      }
    }
  );
  expect(state).toEqual({
    shopping: {
      products: {},
      promotions: {
        '0f366736-38e9-4de8-a2e6-f88eb6a09f41': {
          id: '0f366736-38e9-4de8-a2e6-f88eb6a09f41',
          name: 'Pay only half',
          discountRate: 0.5,
          type: 'PERCENTAGE'
        }
      },
      cart: {}
    },
    form: {
      addPromotionPercentage: {
        registeredFields: {
          name: { name: 'name', type: 'Field', count: 1 },
          percentage: { name: 'percentage', type: 'Field', count: 1 }
        },
        fields: { name: { visited: true, touched: true }, percentage: { visited: true, touched: true } },
        values: { name: 'Pay only half', percentage: 50 },
        anyTouched: true
      }
    },
    dataLoader: { loading: false, errorMessage: '', isCompleted: true }
  });
});

test('addQuantityPromotion', () => {
  let state;
  state = reducers(
    {
      shopping: { products: {}, promotions: {}, cart: {} },
      form: {
        addPromotionQuantity: {
          registeredFields: {
            name: { name: 'name', type: 'Field', count: 1 },
            forQuantity: { name: 'forQuantity', type: 'Field', count: 1 },
            pay: { name: 'pay', type: 'Field', count: 1 }
          },
          fields: {
            name: { visited: true, touched: true },
            forQuantity: { visited: true, touched: true },
            pay: { visited: true, touched: true }
          },
          values: { name: 'Two for one', forQuantity: 2, pay: 1 },
          anyTouched: true
        }
      },
      dataLoader: { loading: false, errorMessage: '', isCompleted: false }
    },
    {
      type: 'ADD_PROMOTION',
      payload: {
        id: '1a2e90e6-c4f0-44de-b57c-71de8c0ba569',
        name: 'Two for one',
        forQuantity: 2,
        pay: 1,
        type: 'QUANTITY'
      }
    }
  );
  expect(state).toEqual({
    shopping: {
      products: {},
      promotions: {
        '1a2e90e6-c4f0-44de-b57c-71de8c0ba569': {
          id: '1a2e90e6-c4f0-44de-b57c-71de8c0ba569',
          name: 'Two for one',
          forQuantity: 2,
          pay: 1,
          type: 'QUANTITY'
        }
      },
      cart: {}
    },
    form: {
      addPromotionQuantity: {
        registeredFields: {
          name: { name: 'name', type: 'Field', count: 1 },
          forQuantity: { name: 'forQuantity', type: 'Field', count: 1 },
          pay: { name: 'pay', type: 'Field', count: 1 }
        },
        fields: {
          name: { visited: true, touched: true },
          forQuantity: { visited: true, touched: true },
          pay: { visited: true, touched: true }
        },
        values: { name: 'Two for one', forQuantity: 2, pay: 1 },
        anyTouched: true
      }
    },
    dataLoader: { loading: false, errorMessage: '', isCompleted: false }
  });
});
