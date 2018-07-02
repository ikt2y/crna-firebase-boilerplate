import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ListItem, Left, Body, Text } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';

const ListContent = ({ tweet }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Actions.editForm({ tweet: tweet }) }>
      <ListItem>
        <Body>
          <Text>{tweet.title}</Text>
          <Text>{tweet.content}</Text>
        </Body>
      </ListItem>
    </TouchableWithoutFeedback>
  );
}
export default ListContent;