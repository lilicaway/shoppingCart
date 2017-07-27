import moxios from 'moxios';
import * as actionCreator from '../actionCreators';

test('addPromotion', () => {
  expect(
    actionCreator.addPromotion({
      id: '1d7bae3b-593c-4335-8b59-1a9b6031b47b',
      name: '10% discount',
      type: 'PERCENTAGE',
      discountRate: 0.1
    })
  ).toMatchSnapshot();
});

test('addProduct', () => {
  expect(
    actionCreator.addProduct({
      id: '42d1595f-63d6-4c68-967a-e1ec4d7ca37c',
      name: 'Apple',
      price: 0.25
    })
  ).toMatchSnapshot();
});

test('addCartItem', () => {
  expect(actionCreator.addCartItem('42d1595f-63d6-4c68-967a-e1ec4d7ca37c')).toMatchSnapshot();
});

test('incrementCartItemQuantity', () => {
  expect(actionCreator.incrementCartItemQuantity('42d1595f-63d6-4c68-967a-e1ec4d7ca37c')).toMatchSnapshot();
});

test('decrementCartItemQuantity', () => {
  expect(actionCreator.decrementCartItemQuantity('42d1595f-63d6-4c68-967a-e1ec4d7ca37c')).toMatchSnapshot();
});

test('setDataAsLoading', () => {
  expect(actionCreator.setDataAsLoading()).toMatchSnapshot();
});

test('setDataAsError', () => {
  expect(actionCreator.setDataAsError('some error message')).toMatchSnapshot();
});

test('setDataAsCompleted', () => {
  expect(actionCreator.setDataAsCompleted()).toMatchSnapshot();
});

test('getAPIDetails', done => {
  const quantityPromotion = {
    id: '85d80dfa-46b9-4e87-8a76-2ad2cfcca040',
    name: '3 x 2',
    type: 'QUANTITY',
    forQuantity: 3,
    pay: 2
  };
  const expectedPromotions = [quantityPromotion];

  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    actionCreator.loadData()(dispatchMock);

    moxios.wait(() => {
      try {
        expect(dispatchMock).toBeCalledWith(actionCreator.setDataAsLoading());
        const promotionsRequest = moxios.requests.mostRecent();
        promotionsRequest
          .respondWith({ status: 200, response: expectedPromotions })
          .then(() => {
            expect(promotionsRequest.url).toEqual('/promotions.json');
            expect(dispatchMock).toBeCalledWith(actionCreator.addPromotion(quantityPromotion));
            done();
          })
          .catch(done.fail); // https://jasmine.github.io/2.3/introduction.html#section-54
      } catch (e) {
        done.fail(e);
      }
    });
  });
});
