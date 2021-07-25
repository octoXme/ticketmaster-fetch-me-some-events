import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({
  onChange,
  field: { name, value },
  form: { setFieldValue },
  ...other
}) => {
  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
    if (onChange) {
      onChange(e.target.value, setFieldValue);
    }
  }

  const handleBlur = (event) => {
    // trim white space on input blur
    setFieldValue(name, event.target.value.trim());
  }

  return (
    <TextField
      name={name}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      {...other}
    />
  )
};

export default TextInput;