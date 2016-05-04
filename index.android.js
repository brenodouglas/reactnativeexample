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
import {AndroidHome} from './src/containers/home';
import {QRCodeAndroid} from './src/components/qrcode';
import SplashScreen from '@remobile/react-native-splashscreen';

class ReactNativeExampleNavigator extends Component {
  componentDidMount() {
      SplashScreen.hide();
  }
  
  render() {
    return (
        <Navigator
          initialRoute={{name: 'list', index: 0}}
          renderScene={(route, navigator) => {
            if(route.name == 'list')
              return <AppAndroid title="BBOMGuard">
                        <AndroidHome name={route.name} navigator={navigator} index={route.index} />
                     </AppAndroid>
            else if(route.name = 'qrCode')
              return <QRCodeAndroid name={route.name} navigator={navigator} index={route.index} />
          }}
        />
    );
  }
}

AppRegistry.registerComponent('ReactNativeExampleNavigator', () => ReactNativeExampleNavigator);
