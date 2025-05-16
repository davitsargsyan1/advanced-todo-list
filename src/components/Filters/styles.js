import styled from 'styled-components';
import { Card, Space, Radio } from 'antd';

export const FilterCard = styled(Card)`
  margin-bottom: 24px;
`;

export const FilterContainer = styled(Space)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterItem = styled.div`
  flex: 1;
  min-width: 150px;

  .ant-select {
    width: 100%;
  }
`;

export const StyledRadioButton = styled(Radio.Button)`
  width: 33.3%;
  text-align: center;
`;

export const StyledLabel = styled.label`
  margin-bottom: 8px;
`;
