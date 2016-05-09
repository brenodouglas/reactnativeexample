import React, {AsyncStorage, Component, View, ScrollView, Text, ListView, StyleSheet, Image, TextInput, Alert} from 'react-native';
import Api from './../../services/api';
import ContasDAO from './../../DAO/contas';
import moment from 'moment';
import Progress from './../../components/progress';
import { Icon } from 'react-native-material-design';

export default class ListComponent extends Component
{

  constructor()
  {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };
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
          <Progress datetime={rowData.created_token} onRefresh={(callback) => this.props.onRefresh(rowData.id, callback)}/>
        </View>
      </View>
    );

  }

  __renderList()
  {
    const {provider} = this.props;
    const dataSource = this.ds.cloneWithRows(provider);

    return (
        <View style={styles.container}>
          <ScrollView style={{backgroundColor: '#fff'}}>
             <ListView
               dataSource={dataSource}
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
    const {provider} = this.props;
    let listSection;

    if(provider.length > 0)
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
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: '#FFF'
  },
  textEmpty: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSearch: {
    flex: 1,
    justifyContent: 'center',
    margin: 6,
    alignItems: 'center',
    flexDirection: 'row',
    height: 40
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
