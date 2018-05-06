import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/space_x_logo_bw_centered.png';

import './LauncherDetails.sass';

class LauncherDetails extends React.Component {
  constructor(props){
    super(props);

    const { from, to, launch } = this.props;

    this.state = { time: {}, seconds: from, to: 0, launch: launch };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let days = Math.floor(secs / (86400))

    let divisor_for_hours= secs % (86400);
    let hours = Math.floor(divisor_for_hours / 60);

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "d": days,
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

  }

  countDown(){
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      alert('boom');
      clearInterval(this.timer);
    }
  }


  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.getInitialState()
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  getInitialState() {
    return {data: this.launch};
  }


  render() {

    const btnStyle = {
      color: 'blue',
      width: '100px',
      height: '50px'
    };

    return (
      <div id={"content"}>
        <div className={`col-6 content__left rocket`}>
          <section>
            <div className="rocket__start_date">{this.props.launch.launch_date_utc}</div>
            <div className="rocket__name">{this.props.launchSite.full_name}</div>
            <div className="rocket__launch">{this.props.launch.launch_date_utc}<div className={`timer`}>hours:  minutes: {this.state.time.m} seconds: {this.state.time.s}</div></div>
          </section>

          <img src={this.props.launch.links.mission_patch_small} alt={"logo"} className="rocket-logo"/>
        </div>

        <div className={`col-6 content__right`}>
          <section>
            <div className={`section__title`}>Details</div>
            <div className={`section__desc`}>{this.props.launch.details}</div>
          </section>
          <section>
            <div className={`section__title`}>Rocket</div>
            <div className={`section__desc`}>
              <div className={`col-6 section__desc--dot`}>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Name:</span>
                  <span className="section__desc__list__value">{this.props.rocket.name}</span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Company:</span>
                  <span className="section__desc__list__value">{this.props.rocket.company}</span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Height:</span>
                  <span className="section__desc__list__value">{this.props.rocket.diameter.meters}m / {this.props.rocket.diameter.feet}ft </span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Diameter:</span>
                  <span className="section__desc__list__value">{this.props.rocket.mass.kg}kg / {this.props.rocket.mass.lb}lb</span>
                </div>
              </div>
              <div className={`col-6 section__desc--dot`}>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">First flight:</span>
                  <span className="section__desc__list__value">{this.props.rocket.first_flight}</span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Country:</span>
                  <span className="section__desc__list__value">{this.props.rocket.country}</span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Success rate:</span>
                  <span className="section__desc__list__value">{this.props.rocket.success_rate_pct}%</span>
                </div>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Cost per launch:</span>
                  <span className="section__desc__list__value">${this.props.rocket.cost_per_launch}</span>
              </div>
              </div>
              <div className={`col-12 section__desc_full`}>
                {this.props.rocket.description}
              </div>
            </div>
          </section>
          <section>
            <div className={`section__title`}>Launch Pad</div>
            <div className={`section__desc`}>
              <div className={`col-6 section__desc--dot`}>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Name:</span>
                  <span className="section__desc__list__value">{this.props.launchSite.location.name}</span>
                </div>
              </div>
              <div className={`col-6 section__desc--dot`}>
                <div className="section__desc__list">
                  <span className="section__desc__list__name">Location:</span>
                  <span className="section__desc__list__value">{this.props.launchSite.location.region}</span>
                </div>
              </div>
              <div className={`col-12 section__desc_full`}>
                {this.props.launchSite.details}
              </div>
            </div>
          </section>

        </div>
        <div className={`links`}>
          <div className={`links__title links__title--center`}>Mission links</div>
          <ul className="links__lists links__list--no-list-style">
            <li><a href={this.props.launch.links.reddit_media} target="_blank">Reddit campaign</a></li>
            <li><a href={this.props.launch.links.presskit} target="_blank">Presskit</a></li>
            <li><a href={this.props.launch.links.video_link} target="_blank">Mission video</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LauncherDetails;
