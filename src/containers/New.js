import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTweet, createTweet } from '../modules/tweet';
import { Button, Text } from 'native-base';
import Form from './Form';
import { Layout, FormSection } from '../components/';
import styled from 'styled-components';

class New extends Component {
  componentWillMount() {
    const { title, content, updateTweets } = this.props;
    updateTweet({ prop: 'title', value: "" })
    updateTweet({ prop: 'content', value: "" })
  }

  render() {
    const { title, content, createTweet } = this.props;
    return (
      <Layout>
        <Form {...this.props} />
        <FormSection>
          <StyledButton
            onPress={() => createTweet({ title, content })}
            full
          >
            <Text>Create</Text>
          </StyledButton>
        </FormSection>
      </Layout>
    );
  }
}
const StyledButton = styled(Button)`
  margin: 15px 10px;
`

const mapStateToProps = state => {
  const { title, content } = state.tweet;
  return { title, content };
}

export default connect(mapStateToProps, {
  updateTweet, createTweet
})(New);