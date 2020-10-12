import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';
import { MODAL_TEXT } from '../../constants/constants';

// import 'bootstrap/dist/css/bootstrap.css';

const ModalContainer = ({
  displayModal,
  name,
  phone,
  address,
  siteUrl,
  setOrganizationName,
  setPhone,
  setAddress,
  setSiteUrl,
  onSubmitOrganization,
  onClose,
  currentKey,
}) => {
  console.log('11111', name, currentKey);
  const { Header, Title, Body } = Modal;
  const {
    createOrganization,
    editOrganization,
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

  const handleOrganizationChange = ({ target: { value } }) => setOrganizationName(value);
  const handlePhoneChange = ({ target: { value } }) => setPhone(value);
  const handleAddressChange = ({ target: { value } }) => setAddress(value);
  const handleSiteChange = ({ target: { value } }) => setSiteUrl(value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      onSubmitOrganization();
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
    <Modal show={displayModal} size="xl" onHide={onClose} centered>
      <Header closeButton>
        <Title style={{ fontSize: '2rem' }}>
          {currentKey ? editOrganization : createOrganization}
        </Title>
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
            <Button size="lg" variant="primary" onClick={onClose} style={{ width: 75 }}>
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

export default ModalContainer;
