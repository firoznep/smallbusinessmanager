import {ADD_PRODUCT} from '../actiontypeConst/actionTypeConst';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});
