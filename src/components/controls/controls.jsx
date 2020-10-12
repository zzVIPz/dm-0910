import React from 'react';
import { Button } from 'react-bootstrap';
import { CONTROLS_TEXT } from '../../constants/constants';

// import 'bootstrap/dist/css/bootstrap.css';

const Controls = ({ onCreateOrganizationClick }) => {
  const { btnAddOrganization } = CONTROLS_TEXT;

  return (
    <>
      <Button variant="outline-dark" size="lg" className="m-3" onClick={onCreateOrganizationClick}>
        {btnAddOrganization}
      </Button>
    </>
  );
};

export default Controls;
