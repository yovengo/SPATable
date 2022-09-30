import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './TableBody.module.scss';

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    return _.get(item, columns[column].path);
  };

  return (
    <tbody className={styles.tbody}>
      {data.map((item) => (
        <tr key={item._id} className={styles.tableRow}>
          {Object.keys(columns).map((column) => (
            <td key={column} className={styles.tableData}>
              {renderContent(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
};
export default TableBody;
