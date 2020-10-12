import { SET_COMPANIES, CLEAR_DB } from './actions-types';

const onSetCompanies = (companies) => ({ type: SET_COMPANIES, companies });
const onClearDB = () => ({ type: CLEAR_DB });

export { onSetCompanies, onClearDB };
