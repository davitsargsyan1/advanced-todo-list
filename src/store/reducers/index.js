import { toast } from 'react-toastify';
import { createSlice, nanoid } from '@reduxjs/toolkit';

import { saveToStorage, getFromStorage } from '../../utils';

import { ALL } from '../../constants';

const initialState = {
  items: getFromStorage('tasks') || [],
  filter: {
    status: ALL,
    category: ALL,
    priority: ALL,
    search: '',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        saveToStorage('tasks', state.items);
        toast.success('Task added successfully', {
          position: 'bottom-right',
          autoClose: 1000,
        });
      },
      prepare: task => ({
        payload: {
          ...task,
          id: nanoid(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToStorage('tasks', state.items);
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.items.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.items[taskIndex] = { ...state.items[taskIndex], ...updates };
        saveToStorage('tasks', state.items);
        toast.success('Task updated successfully', {
          position: 'bottom-right',
          autoClose: 1000,
        });
      }
    },
    duplicateTask: (state, action) => {
      if (action.payload) {
        const newTask = {
          ...action.payload,
          id: nanoid(),
          title: `Copy of ${action.payload.title}`,
          createdAt: new Date().toISOString(),
        };

        state.items.unshift(newTask);
        saveToStorage('tasks', state.items);
        toast.success('Task duplicated successfully', {
          position: 'bottom-right',
          autoClose: 1000,
        });
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      saveToStorage('tasks', state.items);
      toast.success('Task deleted successfully', {
        position: 'bottom-right',
        autoClose: 1000,
      });
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: state => {
      state.filter = {
        status: ALL,
        category: ALL,
        priority: ALL,
        search: '',
      };
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
      saveToStorage('tasks', state.items);
    },
  },
});

export const {
  addTask,
  toggleTask,
  duplicateTask,
  updateTask,
  deleteTask,
  setFilter,
  resetFilter,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
