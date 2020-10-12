import React, { useState } from 'react';
import { connect } from 'react-redux';

import Controls from '../controls/controls';
import Dashboard from '../dashboard/dashboard';
import Modal from '../modal-add/modal-add';

import { onSetCompanies } from '../../actions/actions';

import getTimeStamp from '../../utils/getTimeStamp';

const Main = ({ api, onFetch }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [currentKey, setKey] = useState(null);
  const [currentName, setOrganizationName] = useState('');
  const [currentPhone, setPhone] = useState('');
  const [currentAddress, setAddress] = useState('');
  const [currentSiteUrl, setSiteUrl] = useState('');

  const openCreateOrganization = () => {
    setDisplayModal(true);
  };

  const openEditOrganization = ({ organizationKey, name, phone, address, siteUrl }) => {
    setKey(organizationKey);
    setOrganizationName(name);
    setPhone(phone);
    setAddress(address);
    setSiteUrl(siteUrl);
    setDisplayModal(true);
  };

  const setDefaultState = () => {
    setKey(null);
    setOrganizationName('');
    setPhone('');
    setAddress('');
    setSiteUrl('');
  };

  const onSubmitOrganization = async () => {
    if (currentKey) {
      console.log('update', currentKey);
      await api.updateOrganization({
        key: currentKey,
        name: currentName,
        address: currentAddress,
        phone: currentPhone,
        siteUrl: currentSiteUrl,
      });
    } else {
      console.log('add', currentKey);
      await api.addOrganization({
        name: currentName,
        address: currentAddress,
        phone: currentPhone,
        registrationDate: getTimeStamp(),
        siteUrl: currentSiteUrl,
      });
    }

    const data = await api.getAllOrganizations();
    onFetch(data);
    setDisplayModal();
    setDefaultState();
  };

  const onClose = () => {
    setDisplayModal();
    setDefaultState();
  };

  return (
    <>
      <Controls onCreateOrganizationClick={openCreateOrganization} />
      <Dashboard onEditOrganizationClick={openEditOrganization} />
      {displayModal && (
        <Modal
          {...{
            name: currentName,
            phone: currentPhone,
            address: currentAddress,
            siteUrl: currentSiteUrl,
            currentKey,
            setOrganizationName,
            setPhone,
            setAddress,
            setSiteUrl,
            onSubmitOrganization,
            onClose,
            displayModal,
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ displayModal, api }) => ({
  displayModal,
  api,
});

export default connect(mapStateToProps, {
  onFetch: onSetCompanies,
})(Main);
