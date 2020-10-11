import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Table from '../table/table';

import { onSetCompanies } from '../../actions/actions';

const Dashboard = ({ api, onFetch }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllCompanies().then((data) => {
      onFetch(data);
      setLoading(false);
    });
  }, []);

  return <>{isLoading ? <div>Loading</div> : <Table />} </>;
};

const mapStateToProps = ({ isListenerCompanies, api }) => ({
  isListenerCompanies,
  api,
});

export default connect(mapStateToProps, { onFetch: onSetCompanies })(Dashboard);
