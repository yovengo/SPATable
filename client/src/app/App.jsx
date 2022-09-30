import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/page/MainPage/MainPage';
import AppLoader from './components/ui/hoc/AppLoader';

function App() {
  return (
    <AppLoader>
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </AppLoader>
  );
}

export default App;
