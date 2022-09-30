import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Pagination.module.scss';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav className={styles.parent}>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li
            key={'page_' + page}
            onClick={() => onPageChange(page)}
            role="button"
            className={`${styles.item} ${page === currentPage && styles.item_selected}`}
          >
            <p>{page}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
