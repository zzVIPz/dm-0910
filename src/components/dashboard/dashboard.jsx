import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { HEADER_TEXT } from '../../constants/constants';

import Table from '../table/table';

import { onSetCompanies } from '../../actions/actions';

const Dashboard = ({ api, onFetch }) => {
  const [isLoading, setLoading] = useState(true);
  const { loading } = HEADER_TEXT;

  useEffect(() => {
    api.getAllCompanies().then((data) => {
      onFetch(data);
      setLoading(false);
    });
  }, []);

  return <>{isLoading ? <div className="text-center mt-5">{loading}</div> : <Table />} </>;
};

const mapStateToProps = ({ isListenerCompanies, api }) => ({
  isListenerCompanies,
  api,
});

export default connect(mapStateToProps, { onFetch: onSetCompanies })(Dashboard);
