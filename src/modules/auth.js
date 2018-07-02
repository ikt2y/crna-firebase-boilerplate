import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

// action-types
export const AUTH_START = 'AUTH_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

// reducer
const initialState = {
  isLoad: false,
  isError: false,
  errorMessage: null,
  user: []
}
export function reducer(state = initialState, action) {
  switch (action.type){
    case AUTH_START:
      return {
        ...state,
        isLoad: true
      };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.payload
      };
    case LOGIN_FAILED:
     return {
       ...state,
       isLoad: true,
       isError: true,
       errorMessage: action.payload
     };
    case SIGNUP_SUCCESS:
      return {
        ...initialState,
        user: action.payload
      };
   case SIGNUP_FAILED:
     return {
       ...state,
       isLoad: false,
       isError: true,
       errorMessage: action.payload
     };
    default:
      return state;
  }
  return state;
}

// action-creator
export const submitLogin = ({ email, password }) => async dispatch => {
  dispatch({ type: AUTH_START });
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    })
    Actions.main();
  } catch(err) {
    await dispatch({
      type: LOGIN_FAILED,
      payload: err.toString()
    })
    submitSignUp(email, password, dispatch);
  }
}
const submitSignUp = async(email, password, dispatch) => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user
    })
    Actions.main();
  } catch(err) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: err.toString()
    })
  }
}