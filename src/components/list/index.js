import React, {AsyncStorage, Component, View, ScrollView, Text, ListView, StyleSheet, Image, TextInput, Alert} from 'react-native';
import Api from './../../services/api';
import ContasDAO from './../../DAO/contas';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Progress from './../../components/progress';
import { Icon } from 'react-native-material-design';

export default class ListComponent extends Component
{

  constructor()
  {
    super();

    this.dao = new ContasDAO();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      result: [],
      visible: true,
      dao: new ContasDAO()
    };

    this.refreshList();
  }

  componentWillMount()
  {
    AsyncStorage.getItem('token', (err, result) => {
      if (! err && result) {
        let api = new Api();

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

          AsyncStorage.removeItem('token');
        });
      }
     });
  }

  refreshList(){
      this.dao.getList((result) => {
        this.setState({...this.state, dataSource: this.ds.cloneWithRows(result), result: result});
      });
  }

  _renderRow(rowData)
  {
    return (
      <View style={styles.containerRow}>
        <View style={styles.containerText}>
          <Text style={styles.textToken}>
              {rowData.token}
          </Text>
          <Text style={styles.textUsuario}>
              {rowData.usuario}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <Progress datetime={rowData.created_token} onRefresh={() => this.refreshList()}/>
        </View>
      </View>
    );

  }

  __renderSearch()
  {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => console.log(text)}
        value={'tes'}
      />
    );
  }

  __renderList()
  {
    return (
      <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
        {this.__renderSearch()}
        <ScrollView style={{backgroundColor: '#fff'}}>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={(rowData) => this._renderRow(rowData)}
             renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
             enableEmptySections={true}
           />
         </ScrollView>
       </View>
    );
  }

  __renderEmpty()
  {
    return (
      <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
        <View style={styles.textEmpty}>
          <Image
            style={{height: 40, resizeMode: 'contain'}}
            source={require('./logo.png')}
          />
          <Text style={{}}>
            Nenhuma conta adicionada até o momento!
          </Text>
        </View>
      </View>
    );
  }

  render()
  {
    const {result} = this.state;
    let listSection;

    if(result.length > 0)
      listSection = this.__renderList();
    else
      listSection = this.__renderEmpty();

    return (
      <View style={styles.container}>
        {listSection}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 6,
    flexDirection: 'row'
  },
  textEmpty: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerRow: {
    flex: 1,
    justifyContent: 'center',
    margin: 6,
    alignItems: 'center',
    flexDirection: 'row',
    height: 80
  },
  textToken: {
    flex: 1,
    fontSize: 25,
  },
  usuario: {
    flex: 1,
    fontSize: 20,
  },
  progressContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  separator: {
   height: 1,
   backgroundColor: '#CCCCCC',
 }
});
