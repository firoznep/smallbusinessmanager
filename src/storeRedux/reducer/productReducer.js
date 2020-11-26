import _ from 'lodash';
import {Products} from '../../database';
import {
  FILTER_BY_DATE,
  FILTER_BY_NAME,
  PRODUCT_FILTER_SCREEN_VISIBLE,
  UPDATE_PRO_BY_ID,
} from '../actions/productActionType';

const INITIAL_STATE = {
  allProducts: Products,
  filter: {
    byName: '',
    byDate: '',
  },
  updateItemById: {},
  productFilterScreenIsVisible: false,
};

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRO_BY_ID:
      return {...state, updateItemById: action.payload};
    case FILTER_BY_NAME:
      return {...state, filter: {...state.filter, byName: action.payload}};
    case PRODUCT_FILTER_SCREEN_VISIBLE:
      return {...state, productFilterScreenIsVisible: action.payload};

    default:
      return state;
  }
};

export default ProductReducer;
