import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

// action-types
export const TWEET_START = 'TWEET_START';
export const TWEET_FETCH = 'TWEET_FETCH';
export const TWEET_UPDATE = 'TWEET_UPDATE';
export const TWEET_CREATE = 'TWEET_CREATE';
export const TWEET_EDIT = 'TWEET_EDIT';
export const TWEET_DELETE = 'TWEET_DELETE';
export const TWEET_FAILED = 'TWEET_FAILED';

// reducer
const initialState = {
  title: '',
  content: '',
  isLoad: false,
  isError: false,
  errorMessage: null,
  data: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TWEET_START:
      return {
        ...state,
        isLoad: true
      };
    case TWEET_FETCH:
      return {
        ...initialState,
        data: action.payload
      };
    case TWEET_UPDATE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case TWEET_CREATE:
      return {
        ...initialState
      };
    case TWEET_EDIT:
      return {
        ...initialState
      }
    case TWEET_DELETE:
      return {
        ...initialState
      }
    case TWEET_FAILED:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  };
};

// action-creator
export const updateTweet = ({ prop, value }) => {
  return {
    type: TWEET_UPDATE,
    payload: { prop, value }
  };
};

export const createTweet = ({ title, content }) =>  async dispatch => {
  dispatch({ type: TWEET_START });
  try {
    const { currentUser } = await firebase.auth();
    await firebase.database()
      .ref(`/users/${currentUser.uid}/tweets`)
      .push({ title, content });
    dispatch({ type: TWEET_CREATE });
    Actions.reset('main').pop();
  } catch(err) {
    dispatch({
      type: TWEET_FAILED,
      payload: err.toString()
    })
  }
};

export const fetchTweet = () => async dispatch => {
  dispatch({ type: TWEET_START });
  try {
    const dataList = [];
    const { currentUser } = await firebase.auth();
    const snapshot = await firebase.database()
      .ref(`/users/${currentUser.uid}/tweets`)
      .once('value');
    snapshot.forEach(child => {
      dataList.push({
        title: child.val().title,
        content: child.val().content,
        id: child.key
      });
    });
    dispatch({ type: TWEET_FETCH, payload: dataList });
  } catch(err) {
    dispatch({
      type: TWEET_FAILED,
      payload: err.toString()
    })
  }
}

export const editTweet = ({ title, content, uid }) =>  async dispatch => {
  dispatch({ type: TWEET_START });
  try {
    const { currentUser } = await firebase.auth();
    await firebase.database()
      .ref(`/users/${currentUser.uid}/tweets/${uid}`)
      .set({ title, content });
    dispatch({ type: TWEET_EDIT });
    Actions.reset('main').pop();
  } catch(err) {
    dispatch({
      type: TWEET_FAILED,
      payload: err.toString()
    })
  }
};

export const deleteTweet = ({ uid }) => async dispatch => {
  dispatch({ type: TWEET_START });
  try {
    const { currentUser } = await firebase.auth();
    await firebase.database()
      .ref(`/users/${currentUser.uid}/tweets/${uid}`)
      .remove();
    dispatch({ type: TWEET_DELETE });
    Actions.reset('main').pop();
  } catch(err) {
    dispatch({
      type: TWEET_FAILED,
      payload: err.toString()
    })
  }
};
