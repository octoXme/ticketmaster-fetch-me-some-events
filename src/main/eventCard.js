import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from 'components/iconButton';
import { ArrowIcon, TicketIcon } from 'components/icons';
import {
  DefaultDateTimeFormat,
  getDateInfo,
  getFormattedDate,
  isSameYear,
  PreferredLongDateTimeFormat,
  PreferredShortDateTimeFormat,
} from 'helpers/format-date-string';
import EventAddress from 'main/eventAddress';
import EventImage from 'main/eventImage';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}`,
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
    width: 48 * 2 - 16,
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

/**
 * A Component that display simple details of an event
 *
 * @param {object} event
 * @param {bool} loading - will set to true when user click on an event that they wish to view
 * @param {func} onClick - click on the card or detail icon
 * @param {func} onEventLoaded - once loader reaches 100%, this event should fire to notify parent that loading is finished
 */
const EventCard = ({ event, loading, onClick, onEventLoaded }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const { images, name, url } = event;
  // event start date
  const date = event.dates?.start;
  const startDate = date.dateTime ?? date.localDate;

  const displayFormat = isSameYear(startDate)
    ? PreferredShortDateTimeFormat
    : PreferredLongDateTimeFormat;
  // time string can be read from dateTime
  // however, not all events returns dateTime
  // uses localTime for the time string
  const startTime = date.localTime;
  // display date and month of the event
  const dateInfo = getDateInfo(startDate);
  // event location
  const location = event?.place ?? event._embedded?.venues?.[0];

  useEffect(() => {
    if (loading) {
      setProgress(40);
    } else {
      setProgress(0);
    }
  }, [loading]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress) {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 40
        );
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
      <CardActionArea
        className={classes.container}
        disableRipple
        onClick={onClick}
        component='div'
      >
        <EventImage className={classes.image} images={images} size='small'>
          <div className={classes.ticket}>
            <IconButton
              href={url}
              target='_blank'
              onClick={(event) => event.stopPropagation()}
              icon={<TicketIcon color='secondary' />}
              title='Get Tickets!'
            />
            <IconButton
              onClick={handleViewDetails}
              icon={<ArrowIcon />}
              title='View Event Details'
            />
          </div>
          <LinearProgress
            classes={{
              root: classes.loader,
              bar: progress === 0 ? classes.loaderBar : '',
            }}
            variant='determinate'
            value={progress}
          />
        </EventImage>
        <CardHeader
          classes={{ root: classes.header, avatar: classes.calendar }}
          avatar={
            <div>
              {dateInfo && (
                <Box display='flex' alignItems='center' flexDirection='column'>
                  <Typography variant='h4'>{dateInfo?.day}</Typography>
                  <Typography color='textSecondary'>
                    {dateInfo?.month}
                  </Typography>
                </Box>
              )}
            </div>
          }
          title={<Box fontWeight='700'>{name}</Box>}
          subheader={
            <Box>
              <div>
                <Typography color='secondary' variant='caption'>
                  {getFormattedDate(
                    startDate,
                    startTime,
                    DefaultDateTimeFormat,
                    displayFormat
                  )}
                </Typography>
              </div>
              <EventAddress location={location} displayAddressShort />
            </Box>
          }
        />
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
