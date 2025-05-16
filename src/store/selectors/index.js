import { ALL, STATUSES } from '../../constants';

export const selectTasks = state => state.tasks.items;

export const selectFilteredTasks = state => {
  const { items = [], filter } = state.tasks;
  return items.filter(task => {
    if (filter.status === STATUSES.COMPLETED && !task.completed) return false;
    if (filter.status === STATUSES.ACTIVE && task.completed) return false;

    if (filter.category !== ALL && task.category !== filter.category) return false;

    if (filter.priority !== ALL && task.priority !== filter.priority) return false;

    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase()))
      return false;

    return true;
  });
};

export const selectedFilters = state => state.tasks.filter;
