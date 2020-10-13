import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Spinner, Container } from 'react-bootstrap';

import Controls from '../controls/controls';
import Table from '../table/table';
import OrganizationModal from '../modal-organization/modal-organization';
import InvoiceModal from '../modal-invoice/modal-invoice';
import Notification from '../notification/notification';

import { NOTIFICATION_TEXT, VIEW_MODES, MODAL_INVOICE_TEXT } from '../../constants/constants';

import { onSetCompanies, onSetInvoices } from '../../actions/actions';

import getTimeStamp from '../../utils/getTimeStamp';

const Main = ({ api, onCompaniesFetch, onInvoicesFetch, companies, invoices }) => {
  const { organizationsView, invoicesView } = VIEW_MODES;
  const { credit } = MODAL_INVOICE_TEXT;
  const [displayModal, setDisplayModal] = useState(false);
  const [displayInvoiceModal, setDisplayInvoiceModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(organizationsView);

  // organization
  const [currentOrganizationId, setKey] = useState(null);
  const [currentName, setOrganizationName] = useState('');
  const [currentPhone, setPhone] = useState('');
  const [currentAddress, setAddress] = useState('');
  const [currentSiteUrl, setSiteUrl] = useState('');

  // invoice
  const [currentInvoiceId, setInvoiceId] = useState(null);
  const [currentInvoiceDate, setInvoiceDate] = useState(null);
  const [currentInvoiceType, setInvoiceType] = useState(credit);
  const [currentInvoiceTotal, setInvoiceTotal] = useState('');

  // notification
  const { titleSuccess, organizationDelete, invoiceDelete } = NOTIFICATION_TEXT;
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [notificationTitleColor, setNotificationTitleColor] = useState('');

  useEffect(() => {
    api.getAllOrganizations().then((data) => {
      onCompaniesFetch(data);
      setLoading(false);
    });
  }, []);

  const openCreateOrganization = () => {
    setDisplayModal(true);
  };

  const openCreateInvoice = () => {
    setDisplayInvoiceModal(true);
  };

  const openEditOrganization = ({ organizationKey, name, phone, address, siteUrl }) => {
    setKey(organizationKey);
    setOrganizationName(name);
    setPhone(phone);
    setAddress(address);
    setSiteUrl(siteUrl);
    setDisplayModal(true);
  };

  const setDefaultState = () => {
    setKey(null);
    setOrganizationName('');
    setPhone('');
    setAddress('');
    setSiteUrl('');
  };

  const setDefaultInvoicesState = () => {
    setInvoiceId(null);
    setInvoiceDate(null);
    setInvoiceType(credit);
    setInvoiceTotal('');
  };

  const showNotification = (title, description, bgTitleColor) => {
    setNotificationTitle(title);
    setNotificationDescription(description);
    setNotificationTitleColor(bgTitleColor);
    setDisplayNotification(true);
  };

  const onSubmitOrganization = async () => {
    if (currentOrganizationId) {
      await api.updateOrganization({
        key: currentOrganizationId,
        name: currentName,
        address: currentAddress,
        phone: currentPhone,
        siteUrl: currentSiteUrl,
      });
    } else {
      await api.addOrganization({
        name: currentName,
        address: currentAddress,
        phone: currentPhone,
        registrationDate: getTimeStamp(),
        siteUrl: currentSiteUrl,
      });
    }
    const data = await api.getAllOrganizations();
    onCompaniesFetch(data);
    setDisplayModal();
    setDefaultState();
  };

  const onSubmitInvoice = async () => {
    if (currentInvoiceId) {
      console.log('currentInvoiceId', currentInvoiceId);
    } else {
      await api.addInvoice(currentOrganizationId, {
        date: currentInvoiceDate || getTimeStamp(),
        type: currentInvoiceType,
        total: currentInvoiceTotal,
      });
    }

    const data = await api.getOrganizationInvoices(currentOrganizationId);
    onInvoicesFetch(data);
    setDisplayInvoiceModal();
    setDefaultInvoicesState();
  };

  const onDeleteOrganization = async (key) => {
    await api.deleteOrganization(key);
    const data = await api.getAllOrganizations();
    onCompaniesFetch(data);
    showNotification(titleSuccess, organizationDelete, 'green');
  };

  const onDeleteInvoice = async (invoiceId) => {
    await api.deleteInvoice(currentOrganizationId, invoiceId);
    const data = await api.getOrganizationInvoices(currentOrganizationId);
    console.log('onDeleteInvoice', data);
    onInvoicesFetch(data);
    showNotification(titleSuccess, invoiceDelete, 'green');
  };

  const onViewInvoiceClick = async (organizationKey) => {
    setKey(organizationKey);
    const invoicesList = await api.getOrganizationInvoices(organizationKey);
    console.log('organizationKey', invoicesList);
    onInvoicesFetch(invoicesList);
    setViewMode(invoicesView);
  };

  const onNotificationClose = () => {
    setDisplayNotification(false);
  };

  const onModalClose = () => {
    setDisplayModal(false);
    setDefaultState();
  };

  const onInvoiceModalClose = () => {
    setDisplayInvoiceModal(false);
    setDefaultInvoicesState();
  };

  const clickBtnBack = () => {
    setViewMode(organizationsView);
    setKey(null);
  };

  return (
    <>
      <Controls
        onCreateOrganizationClick={openCreateOrganization}
        onCreateInvoiceClick={openCreateInvoice}
        viewMode={viewMode}
        onBtnBackClick={clickBtnBack}
      />
      {isLoading ? (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: '75vh' }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Table
          {...{
            companies,
            invoices,
            viewMode,
            onEditOrganizationClick: openEditOrganization,
            onDeleteOrganizationClick: onDeleteOrganization,
            onDeleteInvoiceClick: onDeleteInvoice,
            onViewInvoiceClick,
          }}
        />
      )}
      {displayModal && (
        <OrganizationModal
          {...{
            name: currentName,
            phone: currentPhone,
            address: currentAddress,
            siteUrl: currentSiteUrl,
            currentOrganizationId,
            setOrganizationName,
            setPhone,
            setAddress,
            setSiteUrl,
            onSubmitOrganization,
            onModalClose,
            displayModal,
          }}
        />
      )}
      {displayInvoiceModal && (
        <InvoiceModal
          {...{
            total: currentInvoiceTotal,
            currentInvoiceId,
            displayInvoiceModal,
            onInvoiceModalClose,
            setInvoiceTotal,
            setInvoiceType,
            setInvoiceDate,
            onSubmitInvoice,
          }}
        />
      )}
      {displayNotification && (
        <Notification
          {...{
            notificationTitle,
            notificationDescription,
            displayNotification,
            onNotificationClose,
            notificationTitleColor,
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ api, companies, invoices }) => ({
  api,
  companies,
  invoices,
});

export default connect(mapStateToProps, {
  onCompaniesFetch: onSetCompanies,
  onInvoicesFetch: onSetInvoices,
})(Main);
