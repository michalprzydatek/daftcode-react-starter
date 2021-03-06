import React from 'react';
import PropTypes from 'prop-types';

import './Count.sass';

class Count extends React.Component {
  constructor(props){
    super(props);

    const { from, to } = this.props;

    this.state = { time: {}, seconds: from, to: to };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    console.log('start timer');
    //if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    //}
  }
  resetTimer() {
    console.log('reset timer');
    clearInterval(this.timer);
    this.setState({
      time: this.secondsToTime(60),
      seconds: 60,
    });

  }

  countDown(){
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == this.state.to) {
      alert('boom');
      this.setState({
        time: this.secondsToTime(60),
        seconds: 60,
      });
      clearInterval(this.timer);
    }
  }


  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }


  render() {

    const btnStyle = {
      color: 'blue',
      width: '100px',
      height: '50px'
    };

    return (
      <div>
      {this.from}
      <button style={btnStyle} onClick={this.startTimer} >Start</button>
      <button style={btnStyle} onClick={this.resetTimer} >Reset</button>
      <div className={`timer`}>  m: {this.state.time.m} s: {this.state.time.s}</div>
      </div>
    );
  }
}

export default Count;
