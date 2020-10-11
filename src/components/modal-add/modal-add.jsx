import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { onSetDisplayModal, onSetCompanies } from '../../actions/actions';
import { MODAL_TEXT } from '../../constants/constants';

import getTimeStamp from '../../utils/getTimeStamp';

// import 'bootstrap/dist/css/bootstrap.css';

const ModalContainer = ({ displayModal, setDisplayModal, api, onFetch }) => {
  const { Header, Title, Body } = Modal;
  const {
    createOrganization,
    organizationName,
    organizationPlaceholder,
    addressText,
    addressPlaceholder,
    phoneNumber,
    phonePlaceholder,
    siteText,
    siteUrlPlaceholder,
    btnCancel,
    btnOk,
  } = MODAL_TEXT;

  const [validated, setValidated] = useState(false);
  const [name, setOrganizationName] = useState('');
  const [phone, setPhoneValue] = useState('');
  const [address, setAddressValue] = useState('');
  const [siteUrl, setSiteValue] = useState('');
  const handleOrganizationChange = ({ target: { value } }) => setOrganizationName(value);
  const handlePhoneChange = ({ target: { value } }) => setPhoneValue(value);
  const handleAddressChange = ({ target: { value } }) => setAddressValue(value);
  const handleSiteChange = ({ target: { value } }) => setSiteValue(value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      await api.addCompany({ name, address, phone, registrationDate: getTimeStamp(), siteUrl });
      setDisplayModal();
      const data = await api.getAllCompanies();
      onFetch(data);
    }
    setValidated(true);
  };

  const getFormControl = (placeholder, value, onChange) => (
    <Form.Control
      size="lg"
      required
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <Modal show={displayModal} size="xl" onHide={setDisplayModal} centered>
      <Header closeButton>
        <Title style={{ fontSize: '2rem' }}>{createOrganization}</Title>
      </Header>
      <Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>{organizationName}</Form.Label>
            {getFormControl(organizationPlaceholder, name, handleOrganizationChange)}
          </Form.Group>
          <Form.Group controlId="formGroupPhoneNumber">
            <Form.Label>{phoneNumber}</Form.Label>
            {getFormControl(phonePlaceholder, phone, handlePhoneChange)}
          </Form.Group>
          <Form.Group controlId="formGroupAddress">
            <Form.Label>{addressText}</Form.Label>
            {getFormControl(addressPlaceholder, address, handleAddressChange)}
          </Form.Group>
          {/* <Form.Group controlId="formGroupRegistrationDate">
            <Form.Label>Registration date *</Form.Label>
            <Form.Control required type="text" placeholder="Enter registration date" />
          </Form.Group> */}
          <Form.Group controlId="formGroupSite">
            <Form.Label>{siteText}</Form.Label>
            {getFormControl(siteUrlPlaceholder, siteUrl, handleSiteChange)}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setDisplayModal()}
              style={{ width: 75 }}
            >
              {btnCancel}
            </Button>
            <Button
              size="lg"
              variant="success"
              style={{ width: 75 }}
              type="submit"
              className="ml-3"
            >
              {btnOk}
            </Button>
          </div>
        </Form>
      </Body>
    </Modal>
  );
};

const mapStateToProps = ({ displayModal, api }) => ({
  displayModal,
  api,
});

export default connect(mapStateToProps, {
  setDisplayModal: onSetDisplayModal,
  onFetch: onSetCompanies,
})(ModalContainer);
