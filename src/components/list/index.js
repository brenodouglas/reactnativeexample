import React, { Component, View, ScrollView, Text, ListView, StyleSheet} from 'react-native';
import ContasDAO from './../../DAO/contas';
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
  }
  _genRows(pressData: {[key: number]: boolean}): Array<string> {
     var dataBlob = [];
     for (var ii = 0; ii < 200; ii++) {
       var pressedText = pressData[ii] ? ' (pressed)' : '';
       dataBlob.push('Row ' + ii + pressedText);
     }
     return dataBlob;
  }

  render()
  {
    return (
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: '#fff'}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
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
    margin: 6
  }
});
