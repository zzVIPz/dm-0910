import { SET_COMPANIES, CLEAR_DB } from '../actions/actions-types';

import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_COMPANIES:
      return { ...state, companies: action.companies };
    case CLEAR_DB:
      return { ...state, companies: [] };
    default:
      return state;
  }
};

export default reducer;
