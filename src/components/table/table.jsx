import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { CgFileDocument } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Notification from '../notification/notification';

import { TABLE_HEAD, NOTIFICATION_TEXT } from '../../constants/constants';

import { onSetCompanies } from '../../actions/actions';

import getRegistrationDate from '../../utils/getRegistrationDate';

import './table.scss';

const TableContainer = ({ companies, api, onFetch, onEditOrganizationClick }) => {
  const { titleSuccess, descriptionDelete } = NOTIFICATION_TEXT;
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [notificationTitleColor, setNotificationTitleColor] = useState('');

  const onDeleteClick = async (key) => {
    await api.deleteOrganization(key);
    const data = await api.getAllOrganizations();
    onFetch(data);
    setNotificationTitle(titleSuccess);
    setNotificationDescription(descriptionDelete);
    setNotificationTitleColor('green');
    setDisplayNotification(true);
  };

  const onEditClick = async (organization) => {
    onEditOrganizationClick(organization);
  };

  const onNotificationClose = () => {
    setDisplayNotification(false);
  };

  return (
    <>
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
          {Object.entries(companies).map(([key, value], idx) => (
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
              <td className="align-middle">
                <ButtonGroup className="mt-1 mb-1">
                  <Button variant="success">
                    <CgFileDocument style={{ fontSize: '2.5rem' }} />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => onEditClick({ organizationKey: key, ...value })}
                  >
                    <BiEdit style={{ fontSize: '2.5rem' }} />
                  </Button>
                  <Button variant="danger" onClick={() => onDeleteClick(key)}>
                    <RiDeleteBin6Line style={{ fontSize: '2.5rem' }} />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {displayNotification && (
        <Notification
          {...{
            notificationTitle,
            notificationDescription,
            displayNotification,
            onNotificationClose,
            notificationTitleColor,
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ companies, api }) => ({
  companies,
  api,
});

export default connect(mapStateToProps, { onFetch: onSetCompanies })(TableContainer);
