import * as actionType from '../actions';

const dataLoader = (state = { loading: false, errorMessage: '', isCompleted: false }, action) => {
  switch (action.type) {
    case actionType.DATA_LOADER_LOADING:
      return {
        ...state,
        loading: true,
        isCompleted: false,
        errorMessage: ''
      };
    case actionType.DATA_LOADER_COMPLETED:
      return {
        ...state,
        loading: false,
        isCompleted: true,
        errorMessage: ''
      };
    case actionType.DATA_LOADER_ERROR:
      return {
        ...state,
        loading: false,
        isCompleted: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default dataLoader;

// Selectors from here on.

export const isLoadingData = state => {
  return state.loading;
};

export const getLoadingDataErrorMessage = state => {
  return state.errorMessage;
};

export const isCompletedData = state => {
  return state.isCompleted;
};
