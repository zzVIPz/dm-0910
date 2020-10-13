import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { CgFileDocument } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import {
  TABLE_ORGANIZATIONS_HEAD,
  VIEW_MODES,
  TABLE_INVOICES_HEAD,
} from '../../constants/constants';

import getRegistrationDate from '../../utils/getRegistrationDate';

import './table.scss';

const TableContainer = ({
  companies,
  invoices,
  viewMode,
  onEditOrganizationClick,
  onDeleteOrganizationClick,
  onDeleteInvoiceClick,
  onViewInvoiceClick,
  onEditInvoiceClick,
}) => {
  const { organizationsView } = VIEW_MODES;
  const isOrganizationsView = viewMode === organizationsView;
  const tableHead = isOrganizationsView ? TABLE_ORGANIZATIONS_HEAD : TABLE_INVOICES_HEAD;
  const tableBody = isOrganizationsView ? companies : invoices;

  const onDeleteClick = async (key) => {
    if (isOrganizationsView) {
      onDeleteOrganizationClick(key);
      return;
    }
    onDeleteInvoiceClick(key);
  };

  const handleEditClick = async (data) => {
    if (viewMode === organizationsView) {
      onEditOrganizationClick(data);
      return;
    }
    onEditInvoiceClick(data);
  };

  const onDetailsClick = async (organizationKey) => {
    onViewInvoiceClick(organizationKey);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {Object.entries(tableHead).map(([key, value]) => (
            <th key={key} className={`column-title column-title-${key}`}>
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(tableBody).map(([key, value], idx) => (
          <tr key={key}>
            <td>{idx + 1}</td>
            {isOrganizationsView ? (
              <OrganizationTableRow {...value} />
            ) : (
              <InvoicesTableRow {...value} />
            )}

            <td className="d-flex align-middle justify-content-center">
              <ButtonGroup className="mt-1 mb-1">
                {isOrganizationsView && (
                  <Button variant="success" onClick={() => onDetailsClick(key)}>
                    <CgFileDocument style={{ fontSize: '2.5rem' }} />
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleEditClick({ itemKey: key, ...value })}
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
  );
};

export default TableContainer;

const OrganizationTableRow = ({ name, phone, address, registrationDate, siteUrl }) => (
  <>
    <td>{name}</td>
    <td>{phone}</td>
    <td>{address}</td>
    <td className="mobile-hide">{getRegistrationDate(registrationDate)}</td>
    <td className="mobile-hide">
      <a href={siteUrl} rel="noreferrer" target="_blank">
        {siteUrl}
      </a>
    </td>
  </>
);

const InvoicesTableRow = ({ date, type, total }) => (
  <>
    <td>{getRegistrationDate(date)}</td>
    <td>{type}</td>
    <td>{total}</td>
  </>
);
