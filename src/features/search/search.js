import React, { useState } from 'react';
import { Paper, Divider, Fade, Badge, Input } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field } from 'formik';
import { isEqual } from 'lodash';

import { closeDrawer, openDrawer } from 'features/drawer/drawerSlice';
import isSearchStringValid from 'helpers/is-search-string-valid';
import { CountrySelector, TextInput } from 'components/inputs';
import IconButton from 'components/iconButton';
import DefaultButton from 'components/defaultButton';
import { SearchIcon, FilterIcon, CloseIcon } from 'components/icons';
import { countryISOToFlagEmoji } from 'components/inputs/countryListData';

import { resetEvent, resetEventList, fetchEvents, getSearchParams, initialState } from './searchSlice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 auto',
  },
  searchBar: {
    borderRadius: 48 / 2,
    maxWidth: 480,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: '1 1 auto',
  },
  divider: {
    height: 28,
    margin: theme.spacing(0, 1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  countryFlag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    fontSize: 18,
  },
}))

const Search = ({ onSearch, onReset, searchRef }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentSearchParams = useSelector(getSearchParams);
  const [value, setValue] = useState(currentSearchParams.keyword);

  React.useEffect(() => {
    setValue(currentSearchParams.keyword);
  }, [currentSearchParams])

  const onSearchEvents = (params) => {
    dispatch(resetEventList());
    return dispatch(fetchEvents(params));
  }
  const handleChange = (event) => {
    const { value: newValue } = event.target;
    setValue(newValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!isSearchStringValid(value)) return;
    if (onSearch) {
      onSearch();
    }
    onSearchEvents({ ...currentSearchParams, keyword: value });
  };

  const handleClear = () => {
    setValue('');
    if (onReset) {
      onReset();
    }
    dispatch(resetEvent());
  };

  const handleReset = () => {
    handleClear();
    dispatch(closeDrawer());
  };

  const openFilter = () => dispatch(openDrawer({
    header: <DefaultButton onClick={handleReset} color="default">Clear</DefaultButton>,
    children: (
      <Formik
        initialValues={{ ...currentSearchParams }}
        onSubmit={(values, { setSubmitting }) => {
          onSearchEvents({ ...values }).then(() => {
            setSubmitting(false);
            dispatch(closeDrawer());

            if (onSearch) {
              onSearch();
            }
          });
        }}
      >
      {({ values, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className="items-container">
            <Field component={TextInput} name="keyword" label="Keyword" />
            <Field component={TextInput} name="city" label="City" />
            <Field component={TextInput} name="stateCode" label="State" />
            <Field component={TextInput} name="postalCode" label="Postal Code" />
            <Field component={CountrySelector} name="countryCode" label="Country" />
          </div>
          <DefaultButton type="submit" disabled={isSubmitting} variant="outlined" loading={isSubmitting}>
              Search
            </DefaultButton>
        </form>
      )}
    </Formik>
    ),
  }));

  return (
    <div className={classes.root}>
      <Paper className={classes.searchBar} component="form">
        <div className={classes.countryFlag}>{countryISOToFlagEmoji(currentSearchParams.countryCode)}</div>
        <Input
          className={classes.input}
          placeholder="Find Your Next Event!"
          onChange={handleChange}
          value={value}
          ref={searchRef}
          autoFocus
          disableUnderline
        />
        {currentSearchParams.keyword !== '' && (
          <Fade in={currentSearchParams.keyword !== ''} timeout={300}>
            <IconButton onClick={handleClear} icon={<CloseIcon fontSize="small" />} title='Clear Search' />
          </Fade>
        )}
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="submit"
          title="Search Event By Keywords"
          onClick={handleSearch}
          icon={<SearchIcon fontSize="small" />}
        />
        <IconButton
          title="Search Filters"
          onClick={openFilter}
          icon={(
            <Badge color="secondary" variant="dot" invisible={isEqual(currentSearchParams, initialState.searchParams)}>
              <FilterIcon fontSize="small" />
            </Badge>
          )}
        />
      </Paper>
    </div>
  );
}

export default Search;