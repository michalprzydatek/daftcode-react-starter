import React from 'react';
import PropTypes from 'prop-types';

import './LaunchesList.sass';

import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds';

import logo from '../assets/space_x_logo_bw_centered.png';

import launch from '../assets/launch.json';
import launchSite from '../assets/launch_site.json';
import rocket from '../assets/rocket.json';
import launches from '../assets/launches.json';

import FilterButtons from './FilterButtons.js';

class LaunchesList extends React.Component {
  constructor(props){
    super(props);

    const { launches } = this.props;
    const rocketStart = format(  new Date(this.props.launches.launch_date_local), 'DD MMMM YYYY' );

    this.state = { time: {}, today : format(new Date(), 'DD MM YYYY')};

  }
  get availableRocketNames() {
    const {launches} = this.props;

    const rocketNames = this.props.launches.map((e) => <li>{e.rocket.rocket_name}</li>)

    return rocketNames;
  }

  get filteredLaunches(){
    const {rocketNameFilter} = this.state;
    const {launches} = this.props;

    if(!rocketNameFilter) return launches;

    return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
  }

  handleFilterChange(value) {
    this.setState({ rocketNameFilter: value });
  }

  componentDidMount() {
    console.log(this.availableRocketNames);
    this.setState({ time: 0 });
    this.getInitialState()
  }

  componentWillUnmount() {
   
  }

  getInitialState() {
    return {data: this.launch};
  }


  render() {

    return (
      <div>
        
      <div id={"content"}>
        <img src={logo} className={"logo"} />
        <h1>Lanches 2018</h1>
        
        <FilterButtons
          options={this.availableRocketNames}
          onChange={this.handleFilterChange}
        />

        <div id={"rockets"}>
          <ul>
            <li>
              <div className={"rockets__content"}>
                <div className={"rockets__content__date"}>{format(  new Date(this.props.launches[0].launch_date_local), 'DD MMMM YYYY' )}</div>
                <div className={"rockets__content__details"}>
                  <div className={"rockets__details__lab-name"}>Rocket: </div>
                  <div className={"rockets__details__name"}>{this.props.launches[0].mission_name}</div>
                  <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                  <div className={"rockets__details__site"}>{this.props.launches[0].launch_site.site_name_long}</div>
                </div>
              </div>
            </li>
            <li>
              <div className={"rockets__content"}>
                <div className={"rockets__content__date"}>{format(  new Date(this.props.launches[1].launch_date_local), 'DD MMMM YYYY' )}</div>
                <div className={"rockets__content__details"}>
                  <div className={"rockets__details__lab-name"}>Rocket: </div>
                  <div className={"rockets__details__name"}>{this.props.launches[1].mission_name}</div>
                  <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                  <div className={"rockets__details__site"}>{this.props.launches[1].launch_site.site_name_long}</div>
                </div>
              </div>
            </li>
            <li>
              <div className={"rockets__content"}>
                <div className={"rockets__content__date"}>{format(  new Date(this.props.launches[2].launch_date_local), 'DD MMMM YYYY' )}</div>
                <div className={"rockets__content__details"}>
                  <div className={"rockets__details__lab-name"}>Rocket: </div>
                  <div className={"rockets__details__name"}>{this.props.launches[2].mission_name}</div>
                  <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                  <div className={"rockets__details__site"}>{this.props.launches[2].launch_site.site_name_long}</div>
                </div>
              </div>
            </li>
            <li>
              <div className={"rockets__content"}>
                <div className={"rockets__content__date"}>{format(  new Date(this.props.launches[0].launch_date_local), 'DD MMMM YYYY' )}</div>
                <div className={"rockets__content__details"}>
                  <div className={"rockets__details__lab-name"}>Rocket: </div>
                  <div className={"rockets__details__name"}>{this.props.launches[3].mission_name}</div>
                  <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                  <div className={"rockets__details__site"}>{this.props.launches[3].launch_site.site_name_long}</div>
                </div>
              </div>
            </li>
            
          </ul>
        </div>
        
      </div>
      
        </div>
        
    );
  }
}

export default LaunchesList;
