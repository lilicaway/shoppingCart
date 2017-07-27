import { combineReducers } from 'redux';
import { calculatePromotionPrice } from '../../../model/promotion';
import cart, * as cartApi from './cart';
import products, * as productsApi from './products';
import promotions, * as promotionsApi from './promotions';

const reducers = combineReducers({
  products,
  promotions,
  cart
});

export default reducers;

// Selectors from here on.

export const getCartContent = state => {
  let totalPrice = 0;
  const cartItems = cartApi.getCartList(state.cart).map(cartItem => {
    const product = productsApi.getProductById(state.products, cartItem.productId);
    const promotion = promotionsApi.getPromotionById(state.promotions, product.promotionId);
    const itemPrice = calculatePromotionPrice(product.price, cartItem.quantity, promotion);
    totalPrice += itemPrice;
    return {
      productId: cartItem.productId,
      productName: product.name,
      unitPrice: product.price,
      quantity: cartItem.quantity,
      price: itemPrice,
      promotionName: promotion && promotion.name
    };
  });
  return { totalPrice, cartItems };
};

export const getProductList = state => {
  const products = productsApi.getProductList(state.products).map(product => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      promotionName: product.promotionId && promotionsApi.getPromotionById(state.promotions, product.promotionId).name
    };
  });
  return products;
};

export const getPromotionList = state => {
  return promotionsApi.getPromotionList(state.promotions);
};
