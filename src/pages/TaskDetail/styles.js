import { Card } from 'antd';
import styled from 'styled-components';

import { PRIORITIES } from '../../constants';

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const StyledCard = styled(Card)`
  border-left: 5px solid
    ${props => {
      if (props.$priority === PRIORITIES.HIGH) return '#f5222d';
      if (props.$priority === PRIORITIES.MEDIUM) return '#faad14';
      return '#52c41a';
    }};
  margin-bottom: 24px;
`;
