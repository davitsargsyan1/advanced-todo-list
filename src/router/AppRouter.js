import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TaskList from '../pages/TaskList';
import TaskDetail from '../pages/TaskDetail';
import Layout from '../components/Layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskList />} />
          <Route path="task/:id" element={<TaskDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
