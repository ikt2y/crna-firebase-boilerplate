import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'native-base';
import FormSection from './FormSection';
import styled from 'styled-components';

const Confirm = ({ visible, message, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <ModalBG>
        <ModalWrapper>
          <ModalSection>
            <ModalText>
              {message}
            </ModalText>
          </ModalSection>
          <ModalSection>
          <ModalButton
              onPress={onDecline}
              full
              bordered
            >
              <ModalText>No</ModalText>
            </ModalButton>
            <ModalButton
              onPress={onAccept}
              full
            >
              <ModalText>Yes</ModalText>
            </ModalButton>
          </ModalSection>
        </ModalWrapper>
      </ModalBG>
    </Modal>
  );
};

const ModalBG = styled(View)`
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  flex: 1;
  justify-content: center;
`;
const ModalWrapper = styled(View)`
  background-color: #F0F0F0;
  height: 60%;
  width: 80%;
  margin: 0 auto;
`;
const ModalText = styled(Text)`
  margin-top: 30%;
  font-size: 18;
  text-align: center;
  line-height: 40;
  color: #444444;
`;
const ModalSection = styled(FormSection)`
  justify-content: center;
`;
const ModalButton = styled(Button)`
  margin: 15px 10px;
`;

export default Confirm;