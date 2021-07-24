import React from 'react';
import { AppBar, Toolbar, Container, Box, CssBaseline, useScrollTrigger } from '@material-ui/core';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 11 : 0,
  });
}

const DefaultPageLayout = ({ renderHeader, renderTopContent, renderContent, ...props }) => {
  return (
    <React.Fragment>
    <CssBaseline />
    <ElevationScroll {...props}>
      <AppBar>
        <Toolbar>
          {renderHeader}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Toolbar/>
    {renderTopContent && renderTopContent}
    <Container>
      <Box my={2}>
        {renderContent}
      </Box>
    </Container>
  </React.Fragment>
  );
};

export default DefaultPageLayout;
