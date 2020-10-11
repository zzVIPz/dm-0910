import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Table } from 'react-bootstrap';

import { TABLE_HEAD } from '../../constants/constants';

const TableContainer = ({ companies }) => {
  console.log('companies', companies);
  return (
    <Table>
      <thead>
        <tr>
          {Object.entries(TABLE_HEAD).map(([key, value]) => (
            <th key={key}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(companies).map(([key, value], idx) => {
          console.log(key, value);
          return (
            <tr key={key}>
              <td key={uniqid()}>{idx + 1}</td>
              <td key={uniqid()}>{value.name}</td>
              <td key={uniqid()}>{value.phone}</td>
              <td key={uniqid()}>{value.address}</td>
              <td key={uniqid()}>{value.registrationDate}</td>
              <td key={uniqid()}>{value.siteUrl}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const mapStateToProps = ({ companies }) => ({
  companies,
});

export default connect(mapStateToProps)(TableContainer);
