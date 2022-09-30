import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableHeader.module.scss';

import { ArrowDown, ArrowUp } from '../../../../assets/svg';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === 'asc') {
        return <ArrowUp />;
      } else {
        return <ArrowDown />;
      }
    }
    return null;
  };

  return (
    <thead className={styles.thead}>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            className={styles.tHeader}
            key={column}
            onClick={
              columns[column].path
                ? () => columns[column].sort && handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].sort && 'button' }}
            scope="col"
          >
            <div className="flex">
              {columns[column].name} {renderSortArrow(selectedSort, columns[column].path)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
};
export default TableHeader;
