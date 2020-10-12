import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HEADER_TEXT } from '../../constants/constants';
import DATA from '../../data/dummy-data';
import { onClearDB, onSetCompanies } from '../../actions/actions';

const Header = ({ currentUser, api, onBtnClearClick, onBtnUpdateClick }) => {
  const { btnUpdateDB, btnClearDB } = HEADER_TEXT;
  const [isLoading, setLoading] = useState(false);

  const handleBtnUpdateClick = async () => {
    setLoading(true);
    onBtnClearClick();
    await api.removeAllOrganizations();
    DATA.forEach(async (company) => {
      await api.addOrganization(company);
    });
    api.getAllOrganizations().then((companies) => {
      onBtnUpdateClick(companies);
      setLoading(false);
    });
  };

  const handleBtnClearClick = async () => {
    setLoading(true);
    onBtnClearClick();
    await api.removeAllOrganizations();
    setLoading(false);
  };

  return (
    <nav className="sb-topnav navbar navbar-dark bg-dark">
      <div className="col-2">
        <span className="navbar-brand">{currentUser}</span>
      </div>
      <div>
        <Button
          variant="success"
          className="mr-3"
          size="lg"
          disabled={isLoading}
          onClick={!isLoading ? handleBtnUpdateClick : null}
        >
          {btnUpdateDB}
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={isLoading}
          onClick={!isLoading ? handleBtnClearClick : null}
        >
          {btnClearDB}
        </Button>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ currentUser, api }) => ({
  currentUser,
  api,
});

export default connect(mapStateToProps, {
  onBtnClearClick: onClearDB,
  onBtnUpdateClick: onSetCompanies,
})(Header);
