import {useSelector} from 'react-redux';
import _ from 'lodash';

export const allProductData = useSelector((state) =>
  _.reverse([...state.productReducer.allProducts.data()]),
);
