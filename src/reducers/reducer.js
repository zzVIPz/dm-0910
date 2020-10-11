import { SET_COMPANIES, CLEAR_DB, SET_DISPLAY_MODAL } from '../actions/actions-types';

import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_COMPANIES:
      return { ...state, companies: action.companies };
    case CLEAR_DB:
      return { ...state, companies: [] };
    case SET_DISPLAY_MODAL: {
      console.log(1111111);
      return { ...state, displayModal: action.mode };
    }

    default:
      return state;
  }
};

export default reducer;
