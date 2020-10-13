import React from 'react';

import { Form } from 'react-bootstrap';

const FormControl = ({ placeholder, value, callback, label, controlId }) => {
  const { Control, Group, Label } = Form;
  return (
    <Group controlId={controlId}>
      <Label>{label}</Label>
      <Control
        size="lg"
        required
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={callback}
      />
    </Group>
  );
};

export default FormControl;
