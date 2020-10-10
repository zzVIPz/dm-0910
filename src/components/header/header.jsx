import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HEADER_TEXT } from '../../constants/constants';

import 'bootstrap/dist/css/bootstrap.css';

const Header = ({ currentUser }) => {
  const { btnUpdateDB, btnClearDB } = HEADER_TEXT;
  return (
    <nav className="sb-topnav navbar navbar-dark bg-dark">
      <div className="col-2">
        <span className="navbar-brand">{currentUser}</span>
      </div>
      <div>
        <Button variant="success" className="mr-3" size="lg">
          {btnUpdateDB}
        </Button>
        <Button variant="primary" size="lg">
          {btnClearDB}
        </Button>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Header);
