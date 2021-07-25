import React from 'react';
import { Slide, Dialog, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { closeDialog } from './dialogSlice';

const Transition = React.forwardRef((props, ref) =>
  <Slide mountOnEnter unmountOnExit direction="up" ref={ref} {...props} />);

const DefaultDialog = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const state = useSelector(({ dialog }) => dialog.open);
  const options = useSelector(({ dialog }) => dialog.options);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={state}
      TransitionComponent={Transition}
      onClose={() => dispatch(closeDialog())}
      scroll="body"
      {...options}
    />
  );
};

export default DefaultDialog;
