import React, {Component, Alert} from 'react-native';
import {Button} from 'react-native-material-design';
import BarcodeScanner from 'react-native-barcodescanner';

export default class NovaConta extends Component
{
  _showSucessAlert()
  {
    Alert.alert(
      'Mensagem',
      'Nova conta criada com sucesso!'
    )
  }

  render()
  {
    const {color = "#112255", colorText = "#FFFFFF", onClick} = this.props;

    const buttonStyle =  {
      backgroundColor: color,
      textColor: colorText
    };

    return (
      <Button text="NOVA CONTA" onPress={onClick}
          raised={true}
          overrides={buttonStyle} />
    );
  }
}
