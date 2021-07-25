import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import EventLists from 'main/eventLists';
import Search from 'features/search/search';
import EventSearchTags from 'main/eventSearchTags';
import PageLayout from 'components/pageLayout';
import Drawer from 'features/drawer/drawer';
import Dialog from 'features/dialog/dialog';

require('typeface-rubik')

// overwrite default theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: deepOrange,
    background: {
      default: '#eff3f6',
    },
    text: {
      primary: '#374957',
    },
  },
  typography: {
    fontFamily: [
      'Rubik',
      'serif',
    ].join(','),
    fontWeight: 500,
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [initialState, setInitialState] = useState(true);
  const searchRef = useRef();

  const handleInitialSearchState = () => {
    if (initialState) {
      setInitialState(false);
    }
  }

  const onSearchInputFocus = () => {
    searchRef.current.firstChild?.focus();
  }

  return (
    <ThemeProvider theme={theme}>
      <PageLayout
        renderHeader={(
          <Search
            onSearch={handleInitialSearchState}
            onReset={() => setInitialState(true)}
            searchRef={searchRef}
          />
        )}
        renderTopContent={<EventSearchTags />}
        renderContent={(
          <EventLists
            initialState={initialState}
            onUpdateInitialState={state => setInitialState(state)}
            onSearchInputFocus={onSearchInputFocus}
          />
        )}
      />
      <Drawer />
      <Dialog />
    </ThemeProvider>
  );
}

export default App;