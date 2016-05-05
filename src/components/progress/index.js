import React, {Component} from 'react-native';
import ProgressBar from 'react-native-progress-bar';
import moment from 'moment';

export default class Progress extends Component
{
  constructor() {
    super();
    this.state = {
      progress: 0,
      finsh: false
    }
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
          if(this.props.onFinish)
            this.props.onFinish(progress/100);
        }
        
     }, 100);

  }

  render()
  {
     let {datetime} = this.props
     return (
       <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 200}}
          progress={this.state.progress}
        />
      );
  }
}
