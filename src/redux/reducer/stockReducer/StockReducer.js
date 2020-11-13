import {ADD_ITEM} from '../../actiontypeConst/actionTypeConst';

const INITIAL_STATE = [];

const StockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default StockReducer;
