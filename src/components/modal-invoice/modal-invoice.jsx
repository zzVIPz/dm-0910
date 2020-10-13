import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Modal, Form } from 'react-bootstrap';
import ModalButtons from '../modal-buttons/modal-buttons';
import FormControl from '../form-control/form-control';

import { MODAL_INVOICE_TEXT } from '../../constants/constants';

import getTimeStamp from '../../utils/getTimeStamp';

const ModalContainer = ({
  displayInvoiceModal,
  currentInvoiceId,
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
    credit,
    debit,
    mixed,
    commercial,
  } = MODAL_INVOICE_TEXT;

  const options = [
    { value: credit, label: credit },
    { value: debit, label: debit },
    { value: commercial, label: commercial },
    { value: mixed, label: mixed },
  ];

  const dateNow = new Date();
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(dateNow);
  const [selectedOption, setSelectedOption] = useState(options[0]);

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
              options={options}
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
