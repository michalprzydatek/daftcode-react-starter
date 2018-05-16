import React from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/space_x_logo_bw_centered.png';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'

import launch from '../assets/launch.json';
import launchSite from '../assets/launch_site.json';
import rocket from '../assets/rocket.json';
import launches from '../assets/launches.json';

import './LaunchDetails.sass';

class LaunchDetails extends React.Component {
  constructor(props){
    super(props);

    const { launch } = this.props;
	const rocketStart = format(  new Date(this.props.launch.launch_date_local), 'DD MMMM YYYY' );
	const differenceTimeToLaunch = differenceInSeconds(
		new Date(rocketStart),
		new Date()
	)

    this.state = { time: {}, seconds: differenceTimeToLaunch, launch: launch, today : format(new Date(), 'DD MM YYYY'), rocketStart: rocketStart, differenceTimeToLaunch:	differenceTimeToLaunch };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
	secs = Math.round(secs);
	let days = Math.floor(secs / (60 * 60 * 24));
	let divisor_for_hours = secs % (60 * 60 * 24);

    let hours = Math.floor(divisor_for_hours / (60 * 60));

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
	this.startTimer();
    this.getInitialState()
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  getInitialState() {
    return {data: this.launch};
  }


  render() {

    return (
      <div id={"content"}>
        <div className={`col-6 content__left rocket`}>
          <section>
            <div className="rocket__start_date">{this.state.rocketStart}</div>
            <div className="rocket__name">{this.props.launchSite.full_name}</div>
            <div className="rocket__launch"><div className={`timer`}>{this.state.time.d} DAYS {this.state.time.h} HRS {this.state.time.m} MINS {this.state.time.s} SEC TO START</div></div>
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

export default LaunchDetails;
