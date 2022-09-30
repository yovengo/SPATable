import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLoadingStatus, loadDataList } from '../../../store/data';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataLoadingStatus = useSelector(getDataLoadingStatus());

  useEffect(() => {
    dispatch(loadDataList());
  }, []);

  if (dataLoadingStatus) return 'Loading...';
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
export default AppLoader;
