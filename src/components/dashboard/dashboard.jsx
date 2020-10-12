import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Container } from 'react-bootstrap';

import Table from '../table/table';

import { onSetCompanies } from '../../actions/actions';

const Dashboard = ({ api, onFetch, onEditOrganizationClick }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllOrganizations().then((data) => {
      onFetch(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: '75vh' }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Table {...{ onEditOrganizationClick }} />
      )}
    </>
  );
};

const mapStateToProps = ({ isListenerCompanies, api }) => ({
  isListenerCompanies,
  api,
});

export default connect(mapStateToProps, { onFetch: onSetCompanies })(Dashboard);
