import React, {Component, StyleSheet, View, Platform, AsyncStorage} from 'react-native';
import NovaConta from './../../components/novaConta';
import ListComponent from './../../components/list';
import {BUTTON_PRIMARY, TEXT} from './../../services/colors';
import {AppAndroid} from './../app';
import {QRCodeAndroid} from './../qrcode';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-material-design';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Home extends Component
{

  openQrdCode()
  {
      this.props.navigator.push({
        name:'qrCode',
        index: 1,
        component: QRCodeAndroid
      });
  }

  render()
  {
      const view = (
        <View style={styles.container}>
          <ListComponent />
        </View>
      );

      let template;

      if ( Platform.OS === 'ios') {
         template = (<View style={styles.container}> {view} </View>);
      } else {
        template =  (
            <AppAndroid title="BBOMGuard">

              {view}

              <ActionButton
                buttonColor="#112255"
                buttonTextColor="#FFFFFF"
                onPress={()=> this.openQrdCode()}
              />

            </AppAndroid>
        );
      }

      return (
        <View style={styles.container}>
            {template}
        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
