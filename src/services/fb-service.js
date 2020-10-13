import * as firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseService {
  _firebaseConfig = {
    apiKey: 'AIzaSyAe-E4h21eWIMsiCLuW9qJ-5bjNDJdJI0s',
    authDomain: 'dm-0910.firebaseapp.com',
    databaseURL: 'https://dm-0910.firebaseio.com',
    projectId: 'dm-0910',
    storageBucket: 'dm-0910.appspot.com',
    messagingSenderId: '450497879081',
    appId: '1:450497879081:web:e46425b69170b49ced1038',
    measurementId: 'G-4MG04CPLX7',
  };

  constructor() {
    this.firebaseConfig = this._firebaseConfig;
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  }

  async getAllOrganizations() {
    const allCompaniesRef = this.database.ref('companies/');
    let result;
    await allCompaniesRef.once('value', (snapshot) => {
      result = snapshot.val();
    });
    return result || [];
  }

  addOrganization({ name, address, phone, registrationDate, siteUrl, invoices = [] }) {
    const newCompanyRef = this.database.ref(`companies/`).push();
    newCompanyRef.set({
      name,
      address,
      phone,
      registrationDate,
      siteUrl,
    });
    if (invoices.length) {
      invoices.forEach((invoice) => {
        this.addInvoice(newCompanyRef.key, invoice);
      });
    }
  }

  addInvoice(key, invoice) {
    const newInvoiceRef = this.database.ref(`invoices/${key}`).push();
    newInvoiceRef.set({ ...invoice });
  }

  updateOrganization({ key, name, address, phone, siteUrl }) {
    const newCompanyRef = this.database.ref(`companies/${key}`);
    newCompanyRef.update({
      name,
      address,
      phone,
      siteUrl,
    });
  }

  updateInvoice(organizationId, invoiceId, invoice) {
    const newCompanyRef = this.database.ref(`invoices/${organizationId}/${invoiceId}`);
    newCompanyRef.update({ ...invoice });
  }

  async getOrganizationInvoices(organizationKey) {
    const newInvoicesRef = this.database.ref(`invoices/${organizationKey}`);
    let result;
    await newInvoicesRef.once('value', (snapshot) => {
      result = snapshot.val();
    });
    return result || [];
  }

  deleteOrganization(key) {
    this.database.ref(`companies/${key}`).remove();
    this.database.ref(`invoices/${key}`).remove();
  }

  deleteInvoice(organizationKey, invoiceKey) {
    this.database.ref(`invoices/${organizationKey}/${invoiceKey}`).remove();
  }

  deleteOrganizationInvoices(organizationKey) {
    this.database.ref(`invoices/${organizationKey}`).remove();
  }

  removeAllOrganizations() {
    this.database.ref(`companies/`).remove();
    this.database.ref(`invoices/`).remove();
  }
}
