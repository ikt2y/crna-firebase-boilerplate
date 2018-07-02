import { Platform } from 'react-native';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import devTool from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as AuthReducer } from './modules/auth';
import { reducer as TweetReducer } from './modules/tweet';

const reducers =  combineReducers({
  auth: AuthReducer,
  tweet: TweetReducer
});
const middleware = applyMiddleware(thunk, promise, logger);

const Store = createStore(
  reducers,
  compose(
    middleware,
    devTool({
      name: Platform.OS,
      hostname: 'localhost',
      port: 8080
    }),
  )
);

export default Store;