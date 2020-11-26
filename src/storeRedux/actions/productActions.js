import {
  FILTER_BY_DATE,
  FILTER_BY_NAME,
  PRODUCT_FILTER_SCREEN_VISIBLE,
  UPDATE_PRO_BY_ID,
} from './productActionType';

export const updateProAction = (payload) => ({
  type: UPDATE_PRO_BY_ID,
  payload,
});

export const filterByName = (payload) => ({
  type: FILTER_BY_NAME,
  payload,
});

export const filterByDate = (payload) => ({
  type: FILTER_BY_DATE,
  payload,
});

export const productFilterScreenVisibleAction = (payload) => ({
  type: PRODUCT_FILTER_SCREEN_VISIBLE,
  payload,
});
