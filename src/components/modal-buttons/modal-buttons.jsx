import React from 'react';

import { Button } from 'react-bootstrap';

import { MODAL_BUTTONS } from '../../constants/constants';

const ModalButtons = ({ callback }) => {
  const { btnCancel, btnOk } = MODAL_BUTTONS;
  return (
    <div className="d-flex justify-content-end">
      <Button size="lg" variant="primary" onClick={callback} style={{ width: 75 }}>
        {btnCancel}
      </Button>
      <Button size="lg" variant="success" style={{ width: 75 }} type="submit" className="ml-3">
        {btnOk}
      </Button>
    </div>
  );
};

export default ModalButtons;
