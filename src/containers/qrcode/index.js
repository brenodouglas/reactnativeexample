import React, {Component, BackAndroid, Alert, View } from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import ContasDAO from './../../DAO/contas';
import Api from './../../services/api';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

export class QRCodeAndroid extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      api: new Api(),
      dao: new ContasDAO(),
      visible: false
    };

    BackAndroid.addEventListener('hardwareBackPress', this.back.bind(this));
  }

  back()
  {
    this.props.navigator.pop();
    return true;
  }

  barcodeReceived(e) {
    this.setState({...this.state, visible: true});
    this.state.api.getToken(e.data).then(response => {
        this.setState({...this.state, visible: false});
        if(response.status == false) {
          Alert.alert('Error', response.message);
          this.back();
        } else {
          this.state.dao.insert(response);
          this.back();
        }
    });
  }

  // componentWillReceiveProps(pros)
  // {
  //   BackAndroid.addEventListener('hardwareBackPress', this.back.bind(this));
  // }

  componentWillUnmount()
  {
    BackAndroid.addEventListener('hardwareBackPress', this.back.bind(this));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} />
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
      </View>
    );
  }

}
