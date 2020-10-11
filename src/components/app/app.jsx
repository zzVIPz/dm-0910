import React from 'react';
import { connect } from 'react-redux';

import Header from '../header/header';
import Controls from '../controls/controls';
import Dashboard from '../dashboard/dashboard';
import Modal from '../modal-add/modal-add';

const App = ({ displayModal }) => (
  <>
    <Header />
    <Controls />
    <Dashboard />
    {displayModal && <Modal />}
  </>
);

const mapStateToProps = ({ displayModal }) => ({
  displayModal,
});

export default connect(mapStateToProps)(App);
