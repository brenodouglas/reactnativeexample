import React, {Component, StyleSheet, View, Platform, AsyncStorage, TextInput} from 'react-native';
import NovaConta from './../../components/novaConta';
import ListComponent from './../../components/list';
import Api from './../../services/api';
import ContasDAO from './../../DAO/contas';
import {BUTTON_PRIMARY, TEXT} from './../../services/colors';
import {AppAndroid} from './../app';
import {QRCodeAndroid} from './../qrcode';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-material-design';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Home extends Component
{

  constructor()
  {
      super();

      this.state = {
        dataProvider: [],
        dao: new ContasDAO(),
        text: '',
        visible: false
      };
  }

  componentWillMount()
  {
    this.state.dao.getList((result) => {
      this.setState({...this.state, dataProvider: result});
    });
  }

  search(text)
  {
      this.setState({...this.state, text: text});

      if(this.id)
        clearTimeout(this.id);

      this.id = setTimeout(() => {
        this.state.dao.search(text, (result) => {
            this.setState({...this.state, dataProvider: result});
        });
      }, 500);
  }

  openQrdCode()
  {
      this.props.navigator.push({
        name:'qrCode',
        index: 1,
        component: QRCodeAndroid
      });
  }

  registerApi()
  {
    AsyncStorage.getItem('token', (err, result) => {
      if (! err && result) {
        let api = new Api();

        this.setState({...this.state, visible: true});

        api.getToken(result).then(response => {

          if(response.status == false){
            Alert.alert('Mensagem', response.message);
          } else {
            this.state.dao.insert(response, (error, result) => {
              if(error)
                alert(JSON.stringify(error));
              this.refreshList();
            });
          }
        });
      }

      AsyncStorage.removeItem('token');
     });
  }

  refreshToken(id, callback)
  {
    this.setState({...this.state, visible: true});
    this.state.dao.getById(id, (err, result) => {
        if(result) {
            let api = new Api();
            api.refreshToken(result.hash).then(response => {
                this.state.dao.refreshToken(result.id, response.token, (err, success) => {
                    this.refreshList();
                    setTimeout(callback, 500);
                });
            });
        } else {
           this.refreshList();
        }
    });
  }

  refreshList()
  {
    this.state.dao.getList((result) => {
      this.setState({...this.state, dataProvider: result, visible: false});
    });
  }

  render()
  {
      const {dataProvider} = this.state;

      const view = (
        <View style={styles.container}>
          <ListComponent
            provider={dataProvider}
            onRefresh={(id, callback) => this.refreshToken(id, callback)}
            onApiRegister={() => this.register()} />
        </View>
      );

      let template;

      if ( Platform.OS === 'ios') {
         template = (<View style={styles.container}> {view} </View>);
      } else {
        template =  (
            <AppAndroid title="BBOMGuard">
              <TextInput
                style={{height: 60, borderColor: '#112255', borderWidth: 2}}
                onChangeText={(text) => this.search(text)}
                value={this.state.text}
                placeholder="Busca de usuário.."
                placeholderTextColor="#CCC"
                underlineColorAndroid="#112255"
              />

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
            <Spinner visible={this.state.visible} />
            {template}
        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF',
    borderColor: '#FFFFF'
  }
});
