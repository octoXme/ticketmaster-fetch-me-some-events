import {
  Box,
  CardActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import DefaultButton from 'components/defaultButton';
import IconButton from 'components/iconButton';
import {
  CloseIcon,
  DetailIcon,
  GoogleMapIcon,
  LocationIcon,
  TimeIcon,
} from 'components/icons';
import ListItem from 'components/listItem';
import { closeDialog } from 'features/dialog/dialogSlice';
import GoogleMapReact from 'google-map-react';
import {
  formatDate,
  PreferredLongDateFormat,
} from 'helpers/format-date-string';
import EventAddress from 'main/eventAddress';
import EventImage from 'main/eventImage';
import React from 'react';
import { useDispatch } from 'react-redux';

const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const DEFAULT_INDEX = 1;

const useStyle = makeStyles((theme) => ({
  header: {
    padding: 0,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    flex: 1,
    zIndex: DEFAULT_INDEX,
  },
  image: {
    width: '100%',
    height: 'auto',
    filter: 'grayscale(50%)',
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '" "',
      background: `linear-gradient(to right, ${alpha(
        theme.palette.secondary.main,
        0.4
      )}, ${alpha(theme.palette.primary.main, 0.4)})`,
      zIndex: DEFAULT_INDEX,
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: 230,
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: DEFAULT_INDEX,
  },
  title: {
    maxWidth: 320,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      borderTopRightRadius: theme.shape.borderRadius,
    },
  },
  ticket: {
    padding: theme.spacing(1, 2),
  },
  container: {
    padding: 0,
  },
  contentContainer: {
    minHeight: 'min-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(2),
  },
  map: {
    height: 200,
    padding: 0,
  },
}));

const Marker = () => <GoogleMapIcon color='secondary' fontSize='large' />;

/**
 *
 * @param {object} event
 * https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2
 *
 * Show event details include start and end date
 * address
 * details
 * Google map location - note: there are some geo location that provided by api is incorrect
 */

const EventDetails = ({ event }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  // event dates
  const startDate =
    event.dates?.start?.dateTime ?? event.dates?.start?.localDate;
  const endDate = event.dates?.end?.dateTime ?? event.dates?.end?.localDate;
  const startTime = event.dates?.start?.localTime;
  const endTime = event.dates?.start?.localTime;

  // location - address and geo location
  const location = event?.place ?? event._embedded?.venues?.[0];
  const geoLocation = location?.location ?? location?.location;
  const showGoogleMap =
    geoLocation &&
    Number(geoLocation?.latitude) !== 0 &&
    Number(geoLocation?.longitude) !== 0;

  // event details
  const details = event?.info ?? event?.description;

  const formattedStartDate = formatDate(
    startDate,
    null,
    PreferredLongDateFormat
  );
  const formattedEndDate = formatDate(endDate, null, PreferredLongDateFormat);

  // google map default props
  const defaultProps = {
    center: {
      lat: Number(geoLocation?.latitude),
      lng: Number(geoLocation?.longitude),
    },
    zoom: 14,
  };

  return (
    <>
      <DialogTitle className={classes.header}>
        <EventImage
          className={classes.image}
          images={event.images}
          size='large'
        >
          <div className={classes.close}>
            <IconButton
              color='inherit'
              icon={<CloseIcon />}
              title='Close'
              onClick={() => dispatch(closeDialog())}
            />
          </div>
          <div className={classes.headerContent}>
            <div className={classes.title}>
              <Typography variant='h6' color='primary'>
                {event.name}
              </Typography>
            </div>
            <div className={classes.ticket}>
              <DefaultButton
                variant='contained'
                href={event.url}
                target='_blank'
              >
                Get Tickets
              </DefaultButton>
            </div>
          </div>
        </EventImage>
      </DialogTitle>
      <DialogContent className={classes.container}>
        <div className={classes.content}>
          <div className='items-container'>
            <Box
              className='flex-row-container with-gutter'
              alignItems='flex-start'
            >
              <ListItem
                tooltip='Start Date'
                icon={<TimeIcon />}
                title={formattedStartDate}
                content={formatDate(startTime, 'hh:mm:ss', 'h:mm a')}
              />
              {endDate && (
                <>
                  <Typography variant='subtitle2'>TO</Typography>
                  <ListItem
                    tooltip='End Date'
                    icon={<TimeIcon />}
                    title={formattedEndDate}
                    content={formatDate(endTime, 'hh:mm:ss', 'h:mm a')}
                  />
                </>
              )}
            </Box>
            <ListItem
              tooltip='Location'
              icon={<LocationIcon />}
              title='Address'
              content={<EventAddress location={location} />}
            />
            {details && (
              <ListItem
                tooltip='Info'
                icon={<DetailIcon />}
                content={details}
              />
            )}
          </div>
        </div>
      </DialogContent>
      {showGoogleMap && (
        <CardActions className={classes.map}>
          <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
          >
            <Marker lat={geoLocation?.latitude} lng={geoLocation?.longitude} />
          </GoogleMapReact>
        </CardActions>
      )}
    </>
  );
};

export default EventDetails;
