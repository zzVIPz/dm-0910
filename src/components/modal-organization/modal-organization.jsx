import React, { useState } from 'react';

import { Modal, Form } from 'react-bootstrap';
import ModalButtons from '../modal-buttons/modal-buttons';
import FormControl from '../form-control/form-control';
import { MODAL_ORGANIZATION_TEXT } from '../../constants/constants';

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
  onModalClose,
  currentOrganizationId,
}) => {
  // console.log('11111', name, currentOrganizationId);
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
  } = MODAL_ORGANIZATION_TEXT;

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

  return (
    <Modal show={displayModal} size="xl" onHide={onModalClose} centered>
      <Header closeButton>
        <Title style={{ fontSize: '2rem' }}>
          {currentOrganizationId ? editOrganization : createOrganization}
        </Title>
      </Header>
      <Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FormControl
            placeholder={organizationPlaceholder}
            value={name}
            callback={handleOrganizationChange}
            label={organizationName}
            controlId="formGroupName"
          />
          <FormControl
            placeholder={phonePlaceholder}
            value={phone}
            callback={handlePhoneChange}
            label={phoneNumber}
            controlId="formGroupPhoneNumber"
          />
          <FormControl
            placeholder={addressPlaceholder}
            value={address}
            callback={handleAddressChange}
            label={addressText}
            controlId="formGroupAddress"
          />
          <FormControl
            placeholder={siteUrlPlaceholder}
            value={siteUrl}
            callback={handleSiteChange}
            label={siteText}
            controlId="formGroupSite"
          />
          <ModalButtons callback={onModalClose} />
        </Form>
      </Body>
    </Modal>
  );
};

export default ModalContainer;
