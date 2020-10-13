const HEADER_TEXT = {
  user: 'User',
  btnUpdateDB: 'Update DB',
  btnClearDB: 'Clear DB',
};

const TABLE_ORGANIZATIONS_HEAD = {
  counter: '№',
  organization: 'Organization',
  phone: 'Phone number',
  address: 'Address',
  registrationData: 'Registration date',
  siteUrl: 'Site',
  tools: 'Tools',
};

const TABLE_INVOICES_HEAD = {
  counter: '№',
  date: 'Date',
  type: 'Type',
  total: 'Total',
  tools: 'Tools',
};

const CONTROLS_TEXT = {
  btnAddOrganization: 'Add organization',
  btnAddInvoice: 'Add invoice',
  deleteDeleteInvoices: 'Delete all invoices',
};

const MODAL_ORGANIZATION_TEXT = {
  createOrganization: 'Create new organization',
  editOrganization: 'Edit organization',
  organizationName: 'Organization name:',
  organizationPlaceholder: 'Enter organization name',
  phoneNumber: 'Phone number:',
  phonePlaceholder: 'Enter organization phone number:',
  addressText: 'Address:',
  addressPlaceholder: 'Enter organization address',
  siteText: 'Site',
  siteUrlPlaceholder: 'Enter organization web site',
};

const MODAL_INVOICE_TEXT = {
  createInvoice: 'Create new invoice',
  editInvoice: 'Edit invoice',
  date: 'Date:',
  invoicesTypes: 'Invoices types:',
  totalLabel: 'Total:',
  totalPlaceholder: 'Enter the amount of money',
  btnCancel: 'Cancel',
  credit: 'credit',
  debit: 'debit',
  mixed: 'mixed',
  commercial: 'commercial',
};

const MODAL_BUTTONS = {
  btnCancel: 'Cancel',
  btnOk: 'Ok',
};

const NOTIFICATION_TEXT = {
  titleSuccess: 'Success',
  titleError: 'Error',
  organizationDelete: 'Organization deleted',
  invoiceDelete: 'Invoice deleted',
  invoicesDelete: 'All invoices deleted',
};

const VIEW_MODES = {
  organizationsView: 'organizations',
  invoicesView: 'invoices',
};

const { credit, debit, mixed, commercial } = MODAL_INVOICE_TEXT;

const SELECT_OPTIONS = [
  { value: credit, label: credit },
  { value: debit, label: debit },
  { value: commercial, label: commercial },
  { value: mixed, label: mixed },
];

export {
  HEADER_TEXT,
  TABLE_ORGANIZATIONS_HEAD,
  TABLE_INVOICES_HEAD,
  CONTROLS_TEXT,
  MODAL_ORGANIZATION_TEXT,
  NOTIFICATION_TEXT,
  VIEW_MODES,
  MODAL_INVOICE_TEXT,
  MODAL_BUTTONS,
  SELECT_OPTIONS,
};
