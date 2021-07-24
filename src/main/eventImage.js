import React, { useState } from 'react';
import { isEmpty, head, maxBy, filter } from 'lodash';
import PropTypes from 'prop-types';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
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
}))

// pass through array of events
// ratio(string: enum) - Aspect ratio of the image
// choose the first matching ratio that found and max in height
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

  let image = maxBy(filter(images, x => x.ratio === ratio), 'height');
  
  if (isEmpty(image)) {
    image = head(images);
  }

  return (
    <CardMedia className={clsx(classes.root, className)} {...other}>
      <div className={classes.imageContainer}>
        {loading && <Skeleton variant="rect" height="100%" />}
        <img
          alt=""
          src={image?.url}
          onLoad={() => setLoading(false)}
          className={classes.image}
        />
      </div>
      {children}
    </CardMedia>
  )
};

EventImage.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};

export default EventImage;
