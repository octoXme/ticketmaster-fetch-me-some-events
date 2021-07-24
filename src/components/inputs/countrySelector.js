/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { find, sortBy } from 'lodash';
import { countryList, countryISOToFlagEmoji } from './countryListData';

const useStyles = makeStyles({
  option: {
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const CountrySelector = ({
  form: { setFieldValue },
  field: { name, value },
  onChange,
  label,
}) => {
  const classes = useStyles();
  const [val, setVal] = useState(null);

  useEffect(() => {
    if (value) {
      setVal(find(countryList, x => x.code === value));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event, newValue) => {
    setFieldValue(name, newValue?.code);
    setVal(newValue);
    if (onChange) {
      onChange(newValue, setFieldValue);
    }
  }

  return (
    <Autocomplete
      value={val}
      onChange={handleChange}
      options={sortBy(countryList, ['suggested'])}
      classes={{
        option: classes.option,
      }}
      getOptionLabel={option => option.label}
      groupBy={(option) => {
        if (option.suggested) {
          return 'Suggested';
        }
        return option.label[0];
      }}
      renderOption={option => (
        <>
          <span>
            {countryISOToFlagEmoji(option.code)}
          </span>
          {option.label} ({option.code})
        </>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default CountrySelector;
