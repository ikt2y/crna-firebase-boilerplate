import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const FormSection = ({ children }) => (
  <FormWrapper>
    {children}
  </FormWrapper>
);

const FormWrapper = styled(View)`
  margin: 5px 10px;
`

export default FormSection;