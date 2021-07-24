import React from 'react';
import { map, chunk, size, times } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: ({ gutter }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    '& > div:not(.dummy):not(:first-child)': {
      marginTop: gutter,
      // remove gutter
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginTop: 0,
        marginLeft: gutter,
      },
    },
    '& > div:not(.dummy):empty': {
      display: 'none',
    },
  }),
  toTop: ({ gutter }) => ({
    marginTop: gutter,
  }),
  gutter: ({ gutter }) => ({
    marginLeft: gutter,
  }),
  dummy: {
    flex: '1 1 100%',
  },
  item: {
    width: '100%',
  },
}));

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
        className={clsx(
          classes.root,
          rowIndex !== 0 && classes.toTop,
        )}
      >
        <React.Fragment key={rowIndex}>
          {map(row, (x, index) => {
            // add gutter between items
            // exclude the one that previous item (row[index - 1]) if render empty content
            const withCutter = index % itemsPerRow !== 0 && row[index - 1] !== undefined;

            return (
              <div
                key={index.toString()}
                className={clsx(
                  classes.item,
                  withCutter && classes.gutter,
                )}
              >
                {x}
              </div>
            );
          })}
          {size(row) < itemsPerRow && times(itemsPerRow - size(row), dummyIndex => dummy(dummyIndex))}
        </React.Fragment>
      </div>
    ))
  );
};

export default PanelContent;
