import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTweet } from '../modules/tweet';
import { View } from 'react-native';
import { Item, Input, Picker, Icon, Label, Button, Text } from 'native-base';
import { FormSection } from '../components/';
import styled from 'styled-components';

class Form extends Component {
  render() {
    const { title, content, updateTweet, createTweet } = this.props
    return (
      <View>
        <FormSection>
          <Item floatingLabel>
            <Label>Title</Label>
            <Icon active name='home' />
            <Input
              onChangeText={value => updateTweet({ prop: 'title', value })}
              value={title}
            />
          </Item>
        </FormSection>
        <FormSection>
          <Item floatingLabel>
            <Label>Content</Label>
            <Icon active name='book'/>
            <Input
              onChangeText={value => updateTweet({ prop: 'content', value })}
              value={content}
            />
          </Item>
        </FormSection>
      </View>
    );
  }
}

const StyledButton = styled(Button)`
  margin: 15px 10px;
`
const StyledPicker = styled(Picker)`
  width: 100%;
`

const mapStateToProps = state => {
  const { title, content } = state.tweet;
  return { title, content };
}

export default connect(mapStateToProps, {
  updateTweet
})(Form);