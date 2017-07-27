import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import shopping, * as shoppingApi from './shopping';
import dataLoader, * as dataLoaderApi from './dataLoader';

const reducers = combineReducers({
  shopping,
  form: formReducer,
  dataLoader
});

export default reducers;

// Selectors from here on.

export const getCartContent = state => {
  return shoppingApi.getCartContent(state.shopping);
};

export const getProductList = state => {
  return shoppingApi.getProductList(state.shopping);
};

export const getPromotionList = state => {
  return shoppingApi.getPromotionList(state.shopping);
};

export const isLoadingData = state => {
  return dataLoaderApi.isLoadingData(state.dataLoader);
};

export const getLoadingDataErrorMessage = state => {
  return dataLoaderApi.getLoadingDataErrorMessage(state.dataLoader);
};

export const isCompletedData = state => {
  return dataLoaderApi.isCompletedData(state.dataLoader);
};
