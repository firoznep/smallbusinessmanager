import {ADD_PRODUCT} from '../../actiontypeConst/actionTypeConst';

import _ from 'lodash';

const INITIAL_STATE = [];

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return _.uniqBy(_.concat(state, action.payload), 'id');

    default:
      return state;
  }
};

export default ProductReducer;
