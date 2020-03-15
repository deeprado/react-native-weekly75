import React, {Component} from 'react';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';

import AppWithNavigationState from './redux/navigator/AppNavigators';
import configureStore from './redux/store';

const store = configureStore();

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

class App extends Component {
  render() {
    /**
     * 将store传递给App框架
     */
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(App);
