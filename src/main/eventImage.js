import React, { useState } from 'react';
import { isEmpty, head, maxBy, filter } from 'lodash';
import PropTypes from 'prop-types';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import { ImageFallBackIcon } from 'components/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  fallback: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#eaedf7',
    color: theme.palette.action.disabled,
  },
}))

/**
 * 
 * @param {array} images - event images - array 
 * @param {string} size - determine ratio 'large' = '16_9', 'medium' = '4_3', 'small' = '3_2'
 * @param {string} className
 * @param {any} children
 * ratio(string: enum) - Aspect ratio of the image
 * select the first matching ratio that found and max in height
 * if not found, fall back to the first one in the array
 */
const EventImage = ({
  images,
  children,
  size,
  className,
  ...other
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  let ratio = '16_9';

  switch(size) {
    case 'large':
      ratio = '16_9'
      break;
    case 'medium':
      ratio = '4_3'
      break;
    case 'small':
      ratio = '3_2'
      break;
    default:
      break;
  }

  const imageComponent = () => {
    if (isEmpty(images)) {
      return (
        <div className={classes.fallback}>
          <ImageFallBackIcon fontSize="large" />
        </div>
      );
    }

    let image = maxBy(filter(images, x => x.ratio === ratio), 'height');
  
    if (isEmpty(image)) {
      image = head(images);
    }
  
    return (
      <>
        {loading && <Skeleton variant="rect" height="100%" />}
        <img
          alt=""
          src={image?.url}
          onLoad={() => setLoading(false)}
          className={classes.image}
        />
      </>
    );
  }

  return (
    <CardMedia className={clsx(classes.root, className)} {...other}>
      <div className={classes.imageContainer}>
        {imageComponent()}
      </div>
      {children}
    </CardMedia>
  );
};

EventImage.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};

export default EventImage;
