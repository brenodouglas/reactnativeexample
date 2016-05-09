import React, {Component, View, TouchableOpacity   } from 'react-native';
import ProgressBar from 'react-native-progress-bar';
import moment from 'moment';
import { Icon } from 'react-native-material-design';

export default class Progress extends Component
{
  constructor() {
    super();
    this.state = {
      progress: 0,
      finish: false
    }
  }

  componentWillUnmount()
  {
    clearInterval(this.id);
  }
  
  componentDidMount()
  {
    this.getProgress(this.props.datetime);
  }

  getProgress(datetime)
  {
    const start = moment(this.props.datetime, 'YYYY-MM-DD H:mm:ss');
    const created = start.clone();
    const end = start.add(5, 'minutes');
    const interval = end.diff(created);

    let progress = 100 * (moment().toDate().getTime() - created.toDate().getTime()) / interval;
    this.setState({progress: progress/100, finish: false});

    this.id = setInterval(() => {
        let progress = 100 * (Date.now() - created.toDate().getTime()) / interval;
        this.setState({progress: progress/100, finish: false});

        if(progress >= 100) {
          clearInterval(this.id);
          this.setState({progress: progress/100, finish: true});;
        }

     }, 100);

     if(progress >= 100){
       clearInterval(this.id);
       this.setState({progress: progress/100, finish: true});
     }
  }

  refresh()
  {
    this.props.onRefresh && this.props.onRefresh();
  }

  render()
  {
     let {datetime} = this.props;
     let component;

     if(! this.state.finish) {
       component = (
        <ProgressBar
           fillStyle={{height: 20, borderRadius: 4, backgroundColor: '#112255'}}
           backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 4}}
           style={{marginTop: 10, height: 20, width: 200}}
           progress={this.state.progress}
           ref="progressBar"
         />
       );
     } else {
       component = (
          <TouchableOpacity onPress={() => this.refresh()} >
            <View>
              <Icon name="autorenew" color="#112255" style={{marginRight: 20}} size={50} />
            </View>
          </TouchableOpacity >
      );
     }

     return (
      <View >
        {component}
      </View>
    );
  }
}
