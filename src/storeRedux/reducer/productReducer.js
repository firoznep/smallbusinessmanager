import _ from 'lodash';
import {Products} from '../../database';
import {
  FILTER_ALL,
  FILTER_BY_DATE,
  FILTER_BY_NAME,
  FILTER_BY_VENDOR,
  IS_FLATLIST_REFRESHED,
  PRODUCT_FILTER_SCREEN_VISIBLE,
  UPDATE_PRO_BY_ID,
} from '../actions/productActionType';

const INITIAL_STATE = {
  allProducts: Products,
  filter: {
    byName: '',
    byVendor: '',
    byDate: new Date().toDateString(),
  },
  updateItemById: {},
  productFilterScreenIsVisible: false,
  isFlatListRefreshed: false,
};

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRO_BY_ID:
      return {...state, updateItemById: action.payload};

    case FILTER_BY_NAME:
      return {...state, filter: {...state.filter, byName: action.payload}};

    case FILTER_BY_VENDOR:
      return {...state, filter: {...state.filter, byVendor: action.payload}};

    case FILTER_BY_DATE:
      return {...state, filter: {...state.filter, byDate: action.payload}};

    case PRODUCT_FILTER_SCREEN_VISIBLE:
      return {...state, productFilterScreenIsVisible: action.payload};

    case IS_FLATLIST_REFRESHED:
      return {...state, isFlatListRefreshed: action.payload};

    default:
      return state;
  }
};

export default ProductReducer;
