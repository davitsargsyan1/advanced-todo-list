import styled from 'styled-components';
import { Card, Tag, Typography } from 'antd';

import { PRIORITIES } from '../../constants';

export const StyledCard = styled(Card)`
  margin-bottom: 16px;
  cursor: grab;
  border-left: 5px solid
    ${props => {
      if (props.$priority === PRIORITIES.HIGH) return '#f5222d';
      if (props.$priority === PRIORITIES.MEDIUM) return '#faad14';
      return '#52c41a';
    }};
  background-color: white;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-card-body {
    padding: 16px;
  }
  .ant-card-actions {
    width: 30%;
    border-top: 0px;
    justify-self: flex-end;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const Title = styled(Typography.Text)`
  font-size: 16px;
  font-weight: 500;
  text-decoration: ${props => (props.$completed ? 'line-through' : 'none')};
`;

export const CategoryTag = styled(Tag)`
  margin-right: 8px;
`;

export const PriorityTag = styled(Tag)`
  margin-right: 8px;
`;
