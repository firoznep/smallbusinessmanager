import {combineReducers} from 'redux';
import StockReducer from './stockReducer/StockReducer';

export default combineReducers({
  stockReducer: StockReducer,
});
