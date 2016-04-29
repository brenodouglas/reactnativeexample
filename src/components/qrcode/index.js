import React, {Component, BackAndroid, Alert} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

export class QRCodeAndroid extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };

    BackAndroid.addEventListener('hardwareBackPress', this.back.bind(this));
  }

  back()
  {
    this.props.navigator.pop();
    return true;
  }

  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
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
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
      />
    );
  }

}
