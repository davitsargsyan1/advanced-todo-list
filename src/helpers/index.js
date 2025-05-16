import { PRIORITIES } from '../constants';

export const getPriorityColor = priority => {
  switch (priority) {
    case PRIORITIES.HIGH:
      return 'red';
    case PRIORITIES.MEDIUM:
      return 'orange';
    case PRIORITIES.LOW:
      return 'green';
    default:
      return 'blue';
  }
};

export const formatDate = dateString => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
};
