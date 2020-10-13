import React from 'react';
import { Toast } from 'react-bootstrap';

const Notification = ({
  notificationTitle,
  notificationDescription,
  onNotificationClose,
  displayNotification,
  notificationTitleColor,
}) => {
  const { Header, Body } = Toast;
  return (
    <Toast
      onClose={onNotificationClose}
      show={displayNotification}
      delay={2000}
      autohide
      style={{
        position: 'absolute',
        top: 50,
        right: 10,
      }}
    >
      <Header
        style={{
          fontSize: '1.5rem',
          backgroundColor: notificationTitleColor,
          color: 'white',
        }}
      >
        <strong className="mr-auto">{notificationTitle}</strong>
      </Header>
      <Body style={{ fontSize: '1.2rem' }}>{notificationDescription}</Body>
    </Toast>
  );
};

export default Notification;
