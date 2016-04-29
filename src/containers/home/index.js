import React, {Component, StyleSheet, View} from 'react-native';
import NovaConta from './../../components/novaConta';
import ListComponent from './../../components/list';
import {BUTTON_PRIMARY, TEXT} from './../../services/colors';

export class AndroidHome extends Component
{
  openQrdCode()
  {
      this.props.navigator.push({
        name:'qrCode',
        index: 1
      });
  }

  render()
  {
      return (
        <View style={styles.container}>
          <NovaConta color={BUTTON_PRIMARY} colorText={TEXT} onClick={()=> this.openQrdCode() }/>
          <ListComponent />
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
