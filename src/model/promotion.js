export const PROMOTION_PERCENTAGE = 'PERCENTAGE';
export const PROMOTION_QUANTITY = 'QUANTITY';

export const calculatePromotionPrice = (unitPrice, quantity, promotion) => {
  if (!promotion) {
    return unitPrice * quantity;
  }
  switch (promotion.type) {
    case PROMOTION_PERCENTAGE:
      return unitPrice * quantity * (1 - promotion.discountRate);
    case PROMOTION_QUANTITY:
      const priceInDiscount = unitPrice * promotion.pay * Math.trunc(quantity / promotion.forQuantity);
      const priceInNormal = unitPrice * (quantity % promotion.forQuantity);
      return priceInDiscount + priceInNormal;
    default:
      throw new Error(`Unsupported promotion type: ${promotion.type}`);
  }
};
