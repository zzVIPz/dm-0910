import React from 'react';
import { connect } from 'react-redux';

const Dashboard = () => <div />;

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Dashboard);
