import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Modal, Form } from 'react-bootstrap';
import ModalButtons from '../modal-buttons/modal-buttons';
import FormControl from '../form-control/form-control';

import { MODAL_INVOICE_TEXT, SELECT_OPTIONS } from '../../constants/constants';

import getTimeStamp from '../../utils/getTimeStamp';

const ModalContainer = ({
  displayInvoiceModal,
  currentInvoiceId,
  currentInvoiceDate,
  currentInvoiceType,
  onInvoiceModalClose,
  setInvoiceTotal,
  setInvoiceType,
  setInvoiceDate,
  onSubmitInvoice,
  total,
}) => {
  const { Header, Title, Body } = Modal;
  const { Group, Label } = Form;

  const {
    createInvoice,
    editInvoice,
    date,
    invoicesTypes,
    totalLabel,
    totalPlaceholder,
  } = MODAL_INVOICE_TEXT;

  const defaultSelectOption = SELECT_OPTIONS.findIndex((el) => el.value === currentInvoiceType);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(currentInvoiceDate * 1000 || new Date());
  const [selectedOption, setSelectedOption] = useState(SELECT_OPTIONS[defaultSelectOption]);

  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    setInvoiceType(selectedValue.value);
  };
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    const timestamp = getTimeStamp(selectedDate);
    setInvoiceDate(timestamp);
  };
  const handleTotalChange = ({ target: { value } }) => setInvoiceTotal(value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      onSubmitInvoice();
    }
    setValidated(true);
  };

  return (
    <Modal show={displayInvoiceModal} size="xl" onHide={onInvoiceModalClose} centered>
      <Header closeButton>
        <Title style={{ fontSize: '2rem' }}>{currentInvoiceId ? editInvoice : createInvoice}</Title>
      </Header>
      <Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Group controlId="formDateSelect">
            <Label>{date}</Label>
            <DatePicker selected={startDate} onChange={handleDateChange} showTimeSelect />
          </Group>
          <Group controlId="formInvoiceTypeSelect">
            <Label>{invoicesTypes}</Label>
            <Select
              options={SELECT_OPTIONS}
              defaultValue={selectedOption}
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </Group>
          <FormControl
            placeholder={totalPlaceholder}
            value={total}
            callback={handleTotalChange}
            label={totalLabel}
            controlId="formTotalGroup"
          />
          <ModalButtons callback={onInvoiceModalClose} />
        </Form>
      </Body>
    </Modal>
  );
};

export default ModalContainer;
