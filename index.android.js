/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Navigator
} from 'react-native';

import {AppAndroid} from './src/containers/app';
import Home from './src/containers/home';
import SplashScreen from '@remobile/react-native-splashscreen';

class ReactNativeExampleNavigator extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }

  render() {
    return (
        <Navigator
          initialRoute={{name: 'list', index: 0, component: Home}}
          renderScene={(route, navigator) => {
              return <route.component name={route.name} navigator={navigator} index={route.index} />
          }}
        />
    );
  }
}

AppRegistry.registerComponent('ReactNativeExampleNavigator', () => ReactNativeExampleNavigator);
