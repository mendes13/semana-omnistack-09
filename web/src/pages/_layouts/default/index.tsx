import React from 'react';
import { RouteProps } from 'react-router-dom';

import { Container, Content } from './styles';

import logo from '../../../assets/logo.svg';

interface Props {
  children: RouteProps;
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <img src={logo} alt="" />
      <Content>{children}</Content>
    </Container>
  );
};

export default Default;
