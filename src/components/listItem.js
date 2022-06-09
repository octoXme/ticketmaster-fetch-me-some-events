import { Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DOMPurify from 'dompurify';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    wordBreak: 'break-word',
  },
  icon: {
    width: 40,
    display: 'flex',
    color: theme.palette.text.secondary,
  },
}));
/**
 * A component that renders icon and content in a defined way
 * @param {any} icon
 * @param {string} title
 * @param {string} subtitle
 * @param {any} content
 */

const ListItem = ({ icon, title, content, tooltip }) => {
  const classes = useStyles();
  const contentHtml = DOMPurify.sanitize(content);
  return (
    <div className={classes.root}>
      <Tooltip title={tooltip}>
        <div className={classes.icon}>{icon}</div>
      </Tooltip>
      <div className={classes.content}>
        {title && (
          <Typography color='textSecondary' variant='subtitle2'>
            {title}
          </Typography>
        )}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
};

export default ListItem;
