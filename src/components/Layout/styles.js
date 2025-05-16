import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Content } = AntLayout;

export const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  margin: 24px;
  background: #fff;
  border-radius: 8px;
`;
