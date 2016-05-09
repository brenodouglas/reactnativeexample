import React, { Component, View, ScrollView, Text, ListView, StyleSheet} from 'react-native';
import ContasDAO from './../../DAO/contas';
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
      dataSource: this.ds.cloneWithRows([])
    };

    this.refreshList();
  }

  refreshList(){
      this.dao.getList((result) => {
        this.setState({dataSource: this.ds.cloneWithRows(result)});
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

  render()
  {
    return (
      <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 6,
    flexDirection: 'row'
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
 },
});
