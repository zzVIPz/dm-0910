import React from 'react';
import { Button } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { CONTROLS_TEXT, VIEW_MODES } from '../../constants/constants';

const Controls = ({
  onCreateOrganizationClick,
  onCreateInvoiceClick,
  onDeleteInvoices,
  onBtnBackClick,
  viewMode,
}) => {
  const { btnAddOrganization, btnAddInvoice, deleteDeleteInvoices } = CONTROLS_TEXT;
  const { organizationsView } = VIEW_MODES;
  const btnBack = <IoMdArrowRoundBack />;

  return (
    <>
      {viewMode === organizationsView ? (
        <CreateButton bntText={btnAddOrganization} callback={onCreateOrganizationClick} />
      ) : (
        <>
          <CreateButton bntText={btnBack} callback={onBtnBackClick} />
          <CreateButton bntText={btnAddInvoice} callback={onCreateInvoiceClick} />
          <CreateButton bntText={deleteDeleteInvoices} callback={onDeleteInvoices} />
        </>
      )}
    </>
  );
};

export default Controls;

const CreateButton = ({ bntText, callback }) => (
  <Button variant="outline-dark" size="lg" className="m-3" onClick={callback}>
    {bntText}
  </Button>
);
