import React, {Component, View, ToolbarAndroid, StyleSheet} from 'react-native';

export class AppAndroid extends Component
{
  static propTypes = {
   title: React.PropTypes.string,
   children: React.PropTypes.node
  }

  render()
  {
    const {title, children} = this.props;

    const colors = {
      titleColor: '#FFF',
      subtitleColor: '#FFF'
    };

    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title={title} style={styles.toolbar}
          {...colors} />

          {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 60,
    backgroundColor: '#112255'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
})
