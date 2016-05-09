import React, {Component, BackAndroid, View, AsyncStorage} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

export class QRCodeAndroid extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      visible: false
    };

    BackAndroid.addEventListener('hardwareBackPress', () => this.back());
  }

  back()
  {
    this.props.navigator.pop();
    return true;
  }

  barcodeReceived(e) {
    AsyncStorage.setItem('token', e.data, () => {
      this.back();
    })
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
