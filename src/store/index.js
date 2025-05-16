import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
