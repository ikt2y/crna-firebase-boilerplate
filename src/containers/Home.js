import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTweet } from '../modules/tweet';
import { Layout, ListContent } from '../components';
import { ListView, View, Text } from 'react-native';
import { List, Spinner } from 'native-base';

class Home extends Component {
  componentWillMount() {
    this.props.fetchTweet();
  }
  render() {
    const { isLoad, tweets } = this.props;
    return (
      <Layout>
      { isLoad
        ? <Spinner color='#888888'/>
        : <List>
            {tweets.map(tweet =>
              <ListContent
                key={tweet.id}
                tweet={tweet}
              />
            )}
          </List>
      }
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoad: state.tweet.isLoad,
    tweets: state.tweet.data
  }
}

export default connect(mapStateToProps,{
  fetchTweet
})(Home);