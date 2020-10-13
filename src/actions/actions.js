import { SET_COMPANIES, SET_INVOICES, CLEAR_DB, SET_VIEW_MODE } from './actions-types';

const onSetCompanies = (companies) => ({ type: SET_COMPANIES, companies });
const onSetInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const onClearDB = () => ({ type: CLEAR_DB });
const onSetViewMode = (mode) => ({ type: SET_VIEW_MODE, mode });

export { onSetCompanies, onClearDB, onSetInvoices, onSetViewMode };
