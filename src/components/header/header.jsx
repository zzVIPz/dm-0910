import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HEADER_TEXT, VIEW_MODES } from '../../constants/constants';
import DATA from '../../data/dummy-data';
import { onClearDB, onSetCompanies, onSetViewMode } from '../../actions/actions';

import './header.scss';

const Header = ({ currentUser, api, onBtnClearClick, onBtnUpdateClick, setViewMode, viewMode }) => {
  const { btnUpdateDB, btnClearDB } = HEADER_TEXT;
  const { organizationsView, invoicesView } = VIEW_MODES;
  const [isLoading, setLoading] = useState(false);
  const currentViewMode = viewMode === organizationsView ? organizationsView : invoicesView;

  const handleBtnUpdateClick = async () => {
    setViewMode(organizationsView);
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
    setViewMode(organizationsView);
    setLoading(true);
    onBtnClearClick();
    await api.removeAllOrganizations();
    setLoading(false);
  };

  return (
    <nav className="sb-topnav navbar navbar-dark bg-dark">
      <span className="navbar-brand">{currentUser}</span>
      <span className="navbar-brand header__title">{currentViewMode.toUpperCase()}</span>
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

const mapStateToProps = ({ currentUser, api, viewMode }) => ({
  currentUser,
  api,
  viewMode,
});

export default connect(mapStateToProps, {
  onBtnClearClick: onClearDB,
  onBtnUpdateClick: onSetCompanies,
  setViewMode: onSetViewMode,
})(Header);
