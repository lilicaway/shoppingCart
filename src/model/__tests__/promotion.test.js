import { calculatePromotionPrice, PROMOTION_PERCENTAGE, PROMOTION_QUANTITY } from '../promotion';

test('calculatePromotionPrice when there is no promotion', () => {
  const unitPrice = 3;
  const quantity = 5;
  const promotion = undefined;
  expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(15);
});

test('calculatePromotionPrice with PERCENTAGE promotion', () => {
  const unitPrice = 25;
  const quantity = 4;
  const promotion = {
    id: '1d7bae3b-593c-4335-8b59-1a9b6031b47b',
    name: '10% discount',
    type: 'PERCENTAGE',
    discountRate: 0.1
  };
  expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(90);
});

test('calculatePromotionPrice with QUANTITY promotion', () => {
  const promotion = {
    id: '85d80dfa-46b9-4e87-8a76-2ad2cfcca040',
    name: '3 x 2',
    type: 'QUANTITY',
    forQuantity: 3,
    pay: 2
  };
  {
    const unitPrice = 3;
    const quantity = 1;
    expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(3);
  }
  {
    const unitPrice = 3;
    const quantity = 2;
    expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(6);
  }
  {
    const unitPrice = 3;
    const quantity = 3;
    expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(6);
  }
  {
    const unitPrice = 3;
    const quantity = 4;
    expect(calculatePromotionPrice(unitPrice, quantity, promotion)).toEqual(9);
  }
});
