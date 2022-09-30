import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './MainPage.module.scss';

import objects from '../../../utils/objects';
import { paginate } from '../../../utils/paginate';

import { GroupList, Pagination } from '../../common';
import { Table } from '../../common/table';

import { useSelector } from 'react-redux';
import { getData } from '../../../store/data';

const MainPage = () => {
  const data = useSelector(getData());

  const columns = objects.columns;
  const conditions = objects.conditions;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const pageSize = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedColumn, selectedCondition, searchQuery]);

  const handleColumnSelect = (item) => {
    setSelectedColumn(item);
  };

  const handleConditionSelect = (item) => {
    setSelectedCondition(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleClearFilters = () => {
    setSelectedColumn([]);
    setSelectedCondition([]);
    setSearchQuery('');
  };

  if (data) {
    const filterByCondition = (data) => {
      const includeRegExp = new RegExp(`${searchQuery.toLowerCase()}`, 'g');
      const equalRegExp = new RegExp(`^${searchQuery.toLowerCase()}$`, 'g');

      switch (selectedCondition?.path) {
        case 'include':
        case 'equal':
          return data.filter((item) =>
            String(item[selectedColumn?.path])
              .toLowerCase()
              .match(selectedCondition?.path === 'include' ? includeRegExp : equalRegExp)
          );
        case 'over':
          return data.filter((item) => item[selectedColumn?.path] > searchQuery && item);
        case 'less':
          return data.filter((item) => item[selectedColumn?.path] < searchQuery && item);
        default:
          return data;
      }
    };
    const filteredByConditions = filterByCondition(data);

    const count = filteredByConditions.length;
    const sortedData = _.orderBy(filteredByConditions, [sortBy.path], [sortBy.order]);
    const dataCrop = paginate(sortedData, currentPage, pageSize);

    return (
      <section className={styles.parent}>
        <div className={styles.filters}>
          <GroupList
            selectedItem={selectedColumn}
            items={columns}
            onItemSelect={handleColumnSelect}
            label="Колонка"
          />
          {selectedColumn.length !== 0 && (
            <GroupList
              selectedItem={selectedCondition}
              items={conditions}
              onItemSelect={handleConditionSelect}
              label="Условие"
            />
          )}
          {selectedCondition.length !== 0 && (
            <input
              type="text"
              name="searchQuery"
              placeholder="Search..."
              onChange={handleSearchQuery}
              value={searchQuery}
              className={styles.searchQuery}
            />
          )}
          <button onClick={handleClearFilters} className={styles.clearBtn}>
            Clear
          </button>
        </div>
        <Table
          columns={selectedColumn.length === 0 ? columns : { selectedColumn }}
          onSort={handleSort}
          selectedSort={sortBy}
          data={dataCrop}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    );
  }
  return 'Loading...';
};
export default MainPage;
