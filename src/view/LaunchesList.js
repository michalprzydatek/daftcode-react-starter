import React from 'react';
import PropTypes from 'prop-types';

import './LaunchesList.sass';

import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds';

import { CircleLoader } from 'react-spinners';

import logo from '../assets/space_x_logo_bw_centered.png';

//import launches from '../assets/launches.json';

import FilterButtons from './FilterButtons.js';
import Footer from '../view/Footer';

class LaunchesList extends React.Component {
  constructor(props){
    super(props);
    const { launch, launchSite, rocket , onLaunchClick, onBackClick } = this.props;

    this.state = { 
      rocketNameFilter: 'all', 
      isLoading:false, 
      error:false, 
      availableRocketNames:'', 
      filteredLaunches:'',
      rocketNames: ['Falcon 1', 'Falcon 9', 'Falcon 10', 'Falcon Heavy'],
      launches: []
    };
    //this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  get allRocketNames() {
    return <li className={this.state.rocketNameFilter === 'all' ? "active" : ""} onClick={(x)=>{this.handleFilterChange('all')}}><a href={"#"}>All rockets</a></li>;
  }

availableRocketList(value) {
    const {rocketNameFilter } = this.state;

    let filter = `?rocket_name=${value}`;
    if(!value) filter = '';

    fetch(`https://api.spacexdata.com/v2/launches${filter}`)  
      .then((response) => response.json())
      .then((response) => {
        this.setState({ launches: response, isLoading: false });
        console.log('availableRocketList',response.length);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleFilterChange(value) {
    console.log('handleFilterChange');
    this.availableRocketList(value);
  }

  get filteredLaunches(){
    const {rocketNameFilter} = this.state;
    console.log('filteredLaunches',this.state);

    if(!rocketNameFilter || rocketNameFilter === 'all' ) return false;

    fetch('https://api.spacexdata.com/v2/launches?rocket_id='+rocketNameFilter)
    .then((response) => response.json())
    .then((data) => {
        console.log('filteredLaunches',data.filter( launch => launch.rocket.rocket_name === rocketNameFilter ));
      return (
        data.filter( launch => launch.rocket.rocket_name === rocketNameFilter )
      );
    },(error) => {
      this.setState({
        isLoading: true,
        error: false
      });
    }) 
    .catch((error) => {
      console.error(error);
    });
  }

  doToDetails(){
    console.log('doToDetails',this.state);
    const {rocketNameFilter, launches} = this.state;
    if(!rocketNameFilter) return launches;
    return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
  }

  componentWillMount() {
    console.log('componentWillMount ');
    this.availableRocketList();
  }

  componentDidMount() {
      this.getInitialState();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate',this.state);
  }

  componentWillUnmount() {
   
  }

  getInitialState() {
    return {data: this.launch};
  }

  render() {
    const {isLoading,error,availableRocketNames,filteredLaunches,allRocketNames,launches} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id={"list"}>
          <img src={logo} className={"logo"} />
          <h1>Lanches 2018</h1>

          <FilterButtons 
            options={this.state.rocketNames}
            onChange={this.handleFilterChange}
          />

          {error ? ( 
            <div className="error">
                <h1 className="error__text">Sorry, no launches found</h1>
              </div>
            ) : (
                <div id={"rockets"}>
                    <div className="loading">
                      <CircleLoader className="circle"
                              color={'#ccac5b'}
                              loading={isLoading}
                              size={100}
                      />
                    </div>

                  <ul>
                    {launches.map((e)=>
                        <li>
                        <div className={"rockets__content"}>
                          <div className={"rockets__content__date"}>{format( new Date(e.launch_date_local), 'DD MMMM YYYY' )}</div>
                          <div className={"rockets__content__details"}>
                            <div className={"rockets__details__lab-name"}>Rocket: </div>
                            <div className={"rockets__details__name"}><a href="#" onClick={this.props.onLaunchClick}>{e.rocket.rocket_name}</a></div>
                            <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                            <div className={"rockets__details__site"}>{e.launch_site.site_name_long}</div>
                          </div>
                        </div>
                      </li>

                    )}
                  </ul> 
                  </div>
        
        
      )  
    }
    <Footer />
    </div>

   ) 
  }
}
}

export default LaunchesList;