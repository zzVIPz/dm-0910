import React from 'react';
import { connect } from 'react-redux';
import './table.scss';
// import uniqid from 'uniqid';
import { Table } from 'react-bootstrap';

import { TABLE_HEAD } from '../../constants/constants';

import getRegistrationDate from '../../utils/getRegistrationDate';

const TableContainer = ({ companies }) => {
  console.log('companies', companies);
  return (
    <>
      {companies ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {Object.entries(TABLE_HEAD).map(([key, value]) => (
                <th key={key} className={`column-title column-title-${key}`}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(companies).map(([key, value], idx) => {
              console.log(key, value);
              return (
                <tr key={key}>
                  <td>{idx + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.phone}</td>
                  <td>{value.address}</td>
                  <td className="mobile-hide">{getRegistrationDate(value.registrationDate)}</td>
                  <td className="mobile-hide">
                    <a href={value.siteUrl} rel="noreferrer" target="_blank">
                      {value.siteUrl}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ companies }) => ({
  companies,
});

export default connect(mapStateToProps)(TableContainer);
