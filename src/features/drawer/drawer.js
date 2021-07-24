import React from 'react';
import { Drawer, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { closeDrawer } from 'features/drawer/drawerSlice';
import { CloseIcon } from 'components/icons';
import IconButton from 'components/iconButton';

const useStyles = makeStyles(theme => ({
  drawerPaper: ({ width }) => ({
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width
    },
  }),
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(3),
    flex: 1,
  },
}));

const DefaultDrawer = () => {
  const dispatch = useDispatch();
  const state = useSelector(({ drawer }) => drawer.open);
  const options = useSelector(({ drawer }) => drawer.options);
  const classes = useStyles({ width: options.width });

  const handleClose = (event, reason) => {
    if (options.onClose) {
      options.onClose();
    }
    if (reason === 'backdropClick' && options.disableBackdropClick) return;
    if (reason === 'escapeKeyDown' && options.disableEscapeKeyDown) return;
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      anchor={options.anchor}
      open={state}
      onClose={handleClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose} icon={<CloseIcon />} title="Close" />
        {options.header && <Box mx={2}>{options.header}</Box>}
      </div>
      <div className={classes.content}>
        {options.children}
      </div>
    </Drawer>
  );
};

export default DefaultDrawer;
