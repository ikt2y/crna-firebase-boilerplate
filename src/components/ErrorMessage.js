import React from 'react'
import {
  View,
  Text
} from 'react-native';
import styled from 'styled-components';

const ErrorWrapper = styled(View)`
  width: 100%;
  padding: 5px;
  background-color: #f2dede;
  border-color: #ebcccc;
`
const ErrorText = styled(Text)`
  color: #a94442;
  font-size: 14px;
  text-align: center;
`;

const ErrorMessage = ({ text }) => (
  <ErrorWrapper>
    <ErrorText>{text}</ErrorText>
  </ErrorWrapper>
)

export default ErrorMessage;