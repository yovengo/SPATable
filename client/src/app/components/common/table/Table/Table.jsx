import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';

import { TableHeader } from '../TableHeader';
import { TableBody } from '../TableBody';

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className={styles.parent}>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
  children: PropTypes.array,
};
export default Table;
