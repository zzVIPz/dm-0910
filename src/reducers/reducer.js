import { SET_COMPANIES } from '../actions/actions-types';

import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_COMPANIES: {
      const { companies } = action;
      return { ...state, companies };
    }

    default:
      return state;
  }
};

export default reducer;
