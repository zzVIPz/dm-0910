import { SET_COMPANIES, SET_INVOICES, CLEAR_DB } from '../actions/actions-types';

import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_COMPANIES:
      return { ...state, companies: action.companies };
    case SET_INVOICES:
      return { ...state, invoices: action.invoices };
    case CLEAR_DB:
      return { ...state, companies: [] };
    default:
      return state;
  }
};

export default reducer;
