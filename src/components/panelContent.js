import React from 'react';
import { map, chunk, size, times } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: ({ gutter }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: gutter,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  }),
  toTop: ({ gutter }) => ({
    marginTop: gutter,
  }),
  gutter: ({ gutter }) => ({
    gap: gutter,
  }),
  dummy: {
    flex: '1 1 100%',
  },
  item: {
    width: '100%',
  },
}));

/**
 * Divide given children (array of items) into number of item per row
 * @param {any} children - react node/element that will divide into rows 
 * @param {number} gutter - gaps between items
 * @param {number} itemsPerRow - number of items per row
*/
const PanelContent = ({
  children,
  gutter = 24,
  itemsPerRow = 2,
}) => {
  const classes = useStyles({ gutter });
  const tileRows = chunk(children, itemsPerRow);

  const dummy = key => <div className={clsx('dummy', classes.gutter, classes.dummy)} key={`dummy${key}`} />;

  return (
    map(tileRows, (row, rowIndex) => (
      <div
        key={rowIndex.toString()}
        className={clsx(classes.root, rowIndex !== 0 && classes.toTop)}
      >
        <React.Fragment key={rowIndex}>
          {map(row, (x, index) => (
            <div key={index.toString()} className={classes.item}>
              {x}
            </div>
          ))}
          {size(row) < itemsPerRow && times(itemsPerRow - size(row), dummyIndex => dummy(dummyIndex))}
        </React.Fragment>
      </div>
    ))
  );
};

export default PanelContent;
