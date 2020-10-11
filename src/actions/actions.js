import { SET_COMPANIES, CLEAR_DB, SET_DISPLAY_MODAL } from './actions-types';

const onSetCompanies = (companies) => ({ type: SET_COMPANIES, companies });
const onClearDB = () => ({ type: CLEAR_DB });
const onSetDisplayModal = (mode = false) => ({ type: SET_DISPLAY_MODAL, mode });

export { onSetCompanies, onClearDB, onSetDisplayModal };
