import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { CONTROLS_TEXT } from '../../constants/constants';
import { onSetDisplayModal } from '../../actions/actions';

const Controls = ({ setDisplayModal }) => {
  const { btnAddCompany } = CONTROLS_TEXT;

  const handleBtnAddClick = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <Button variant="outline-dark" size="lg" className="m-3" onClick={handleBtnAddClick}>
        {btnAddCompany}
      </Button>
    </>
  );
};

const mapStateToProps = ({ displayModal }) => ({
  displayModal,
});

export default connect(mapStateToProps, { setDisplayModal: onSetDisplayModal })(Controls);
