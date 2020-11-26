import _ from 'lodash';
import {createSelector} from 'reselect';

export const selectAllProductsData = createSelector(
  (state) => state.productReducer,
  (productReducer) => _.reverse([...productReducer.allProducts.data()]),
);
