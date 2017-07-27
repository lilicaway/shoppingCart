import * as actionType from '../../actions';

const promotions = (state = {}, action) => {
  switch (action.type) {
    case actionType.ADD_PROMOTION:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
};

export default promotions;

// Selectors from here on.

export const getPromotionById = (state, promotionId) => {
  return promotionId && state[promotionId];
};

export const getPromotionList = state => {
  return Object.values(state);
};
