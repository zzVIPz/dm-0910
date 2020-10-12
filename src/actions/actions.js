import { SET_COMPANIES, SET_INVOICES, CLEAR_DB } from './actions-types';

const onSetCompanies = (companies) => ({ type: SET_COMPANIES, companies });
const onSetInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const onClearDB = () => ({ type: CLEAR_DB });

export { onSetCompanies, onClearDB, onSetInvoices };
