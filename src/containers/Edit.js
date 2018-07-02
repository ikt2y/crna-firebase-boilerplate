import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTweet, editTweet, deleteTweet } from '../modules/tweet';
import { Button, Text } from 'native-base';
import Form from './Form';
import { Layout, FormSection, Confirm } from '../components/';
import styled from 'styled-components';

class Edit extends Component {
  state = { isShow: false };
  componentWillMount() {
    const { tweet, updateTweet } = this.props;
    // オブジェクト型をkeyとvalueで取り出し, それぞれ更新
    _.each(tweet, (value, prop) => {
      updateTweet({ prop, value });
    });
  }
  render() {
    const { isShow } = this.state;
    const { tweet, title, content, editTweet, deleteTweet } = this.props;
    return (
      <Layout>
        <Form />
        <FormSection>
          <StyledButton
            onPress={() => editTweet({ title, content, uid: tweet.id })}
            full
          >
            <Text>Save Change</Text>
          </StyledButton>
          <StyledButton
            onPress={() => this.setState({ isShow: !isShow })}
            full
            danger
          >
            <Text>Delete</Text>
          </StyledButton>
          <Confirm
            visible={isShow}
            message={"Are you sure?"}
            onAccept={() => deleteTweet({ uid: tweet.id })}
            onDecline={() => this.setState({ isShow: false })}
          />
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
  updateTweet,
  editTweet,
  deleteTweet
})(Edit);