import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupList.module.scss';

const GroupList = ({ items, onItemSelect, selectedItem, label }) => {
  if (!Array.isArray(items)) {
    return (
      <select
        value={JSON.stringify(selectedItem)}
        onChange={({ target }) => onItemSelect(JSON.parse(target.value))}
        className={styles.select}
      >
        <option disabled={selectedItem.length !== 0}>{label}</option>
        {Object.keys(items).map((item) => (
          <option value={JSON.stringify(items[item])} key={items[item].path} role="button">
            {items[item].name}
          </option>
        ))}
      </select>
    );
  }
  return (
    <select
      value={JSON.stringify(selectedItem)}
      onChange={({ target }) => onItemSelect(JSON.parse(target.value))}
      className={styles.select}
    >
      <option disabled={selectedItem.length !== 0}>{label}</option>
      {items.map((item) => (
        <option value={JSON.stringify(item)} key={item.path} role="button">
          {item.name}
        </option>
      ))}
    </select>
  );
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
};
export default GroupList;
