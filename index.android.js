/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Navigator,
  StatusBar,
  View
} from 'react-native';

import {AppAndroid} from './src/containers/app';
import Home from './src/containers/home';
import SplashScreen from '@remobile/react-native-splashscreen';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-material-design';
import Spinner from 'react-native-loading-spinner-overlay';

class ReactNativeExampleNavigator extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }

  constructor(props) {
    super();
    this.state = {
      visible: false
    };
  }

  render() {
    return (
        <Navigator
          initialRoute={{name: 'list', index: 0, component: Home}}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
          renderScene={(route, navigator) => {
              return <View style={{flex: 1,
              justifyContent: 'center',
              backgroundColor: '#FFF'}}>
                  <StatusBar
                     backgroundColor="#203267"
                     barStyle="light-content"
                   />

                  <route.component
                    name={route.name}
                    navigator={navigator}
                    index={route.index} />
              </View>
          }}
        />
    );
  }
}

AppRegistry.registerComponent('ReactNativeExampleNavigator', () => ReactNativeExampleNavigator);
