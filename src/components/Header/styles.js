import styled from 'styled-components';
import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const StyledHeader = styled(AntHeader)`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

export const Logo = styled(Title)`
  margin: 0 !important;
  margin-right: 24px !important;
  color: white !important;
`;
