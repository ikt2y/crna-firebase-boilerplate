import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Scene, Router } from 'react-native-router-flux';
import Store from './src/Store';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { firebaseConfig } from './src/utils';
import { Login, Home, New, Edit } from './src/containers';

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }
  render = () => (
    <Provider store={Store}>
      {this.renderRouter()}
    </Provider>
  )
  renderRouter = () =>(
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" initial>
          <Scene key="login" component={Login} title="Login" initial/>
        </Scene>
        <Scene key="main">
          <Scene
            key="home"
            rightTitle="Add"
            onRight={() => { Actions.createForm() }}
            component={Home}
            title="Home"
            initial
          />
          <Scene
            key="createForm"
            component={New}
            title="Create"
          />
          <Scene
            key="editForm"
            component={Edit}
            title="Edit"
          />
        </Scene>
      </Scene>
    </Router>
  )
}
