import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardActionArea, Typography, Box, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventAddress from 'main/eventAddress';
import { getDateInfo, getFormattedDate } from 'helpers/format-date-string';
import IconButton from 'components/iconButton';
import { TicketIcon, ArrowIcon } from 'components/icons';
import EventImage from 'main/eventImage';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}`
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    minHeight: 150,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
  },
  ticket: {
    borderRadius: 0,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    height: 48,
    zIndex: 1,
  },
  calendar: {
    width: (48 * 2) - 16,
    marginRight: 0,
  },
  loader: {
    width: '100%',
    position: 'absolute',
  },
  loaderBar: {
    backgroundColor: 'transparent',
  },
}));

const EventCard = ({
  event,
  loading,
  onClick,
  onEventLoaded,
}) => {
  const { images, name, url } = event;
  const date = event.dates?.start;
  const location = event?.place ?? event._embedded?.venues?.[0];

  const classes = useStyles();
  const dateInfo = getDateInfo(date.localDate);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(40);
    } else {
      setProgress(0);
    }
  }, [loading])

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress) {
        setProgress(prevProgress => (prevProgress >= 100 ? 100 : prevProgress + 40));
      }
    }, 300);

    if (progress === 100) {
      onEventLoaded();
    }

    return () => {
      clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const handleViewDetails = (event) => {
    event.stopPropagation();
    onClick();
  };
  
  return (
    <Card className={classes.root} elevation={8}>
      <CardActionArea className={classes.container} disableRipple onClick={onClick} component="div">
        <EventImage className={classes.image} images={images} size="small">
          <div className={classes.ticket}>
            <IconButton
              href={url}
              target="_blank"
              onClick={event => event.stopPropagation() }
              icon={<TicketIcon color="secondary" />}
              title="Get Tickets!"
            />
            <IconButton
              onClick={handleViewDetails}
              icon={<ArrowIcon />}
              title="View Event Details"
            />
          </div>
          <LinearProgress classes={{ root: classes.loader, bar: progress === 0 ? classes.loaderBar : '' }} variant="determinate" value={progress} />
        </EventImage>
        <CardHeader
          classes={{ root: classes.header, avatar: classes.calendar}}
          avatar={
            <div>
              {dateInfo && (
                  <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography variant="h4">{dateInfo?.day}</Typography>
                  <Typography color="textSecondary">{dateInfo?.month}</Typography>
                </Box>
                )}
            </div>
          }
          title={<Box fontWeight="700">{name}</Box>}
          subheader={(
            <Box>
              <div>
                <Typography color="secondary" variant="caption">{getFormattedDate(date.localDate, date.localTime)}</Typography>
              </div>
              <EventAddress location={location} displayAddressShort />
            </Box>
          )}
        />
      </CardActionArea>
    </Card>
  )
};

export default EventCard;
