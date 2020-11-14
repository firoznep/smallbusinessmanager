import {combineReducers} from 'redux';
import ProductReducer from './stockReducer/StockReducer';

export default combineReducers({
  productReducer: ProductReducer,
});
