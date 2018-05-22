import React from 'react';
import PropTypes from 'prop-types';

import './LaunchesList.sass';

import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds';

import logo from '../assets/space_x_logo_bw_centered.png';

//import launches from '../assets/launches.json';

import FilterButtons from './FilterButtons.js';
import Footer from '../view/Footer';

class LaunchesList extends React.Component {
  constructor(props){
    super(props);
    const { launch, launchSite, rocket , launches, onLaunchClick, onBackClick } = this.props;
    this.state = { availableRocketList: '', rocketNameFilter: 'all', isLoading:false};
  }

  get allRocketNames() {
    return <li className={this.state.rocketNameFilter === 'all' ? "active" : ""} onClick={(x)=>{this.handleFilterChange('all')}}><a href={"#"}>All rockets</a></li>;
  }

  get availableRocketNames() {
    let array = [];
    let uniqueArray = [];
    let uniqueArrayLi = [];

    fetch('https://api.spacexdata.com/v2/launches')
     .then((response) => response.json())
     .then((data) => {       
        data.map((e)=> array.push(e.rocket.rocket_name));
        console.log('array',array);

        }).then((data)=>{

          uniqueArray = array.filter(function(item, pos) {
            console.log('ua',item, pos )
            array.indexOf(item) == pos;
          });
          console.log('uniqueArray',uniqueArray);

        }).then((data)=>{
          return uniqueArray.map((e,i) => 
          <li className={this.state.rocketNameFilter === e ? 'active' : ''}>
            <a href="#" data-name={e} onClick={(x)=>{this.handleFilterChange(e)}}>{e}</a>
          </li>);
        })
     .catch((error) => {
       console.error(error);
     });

    //const rocketNames = names.map((e) => array.push(e.rocket.rocket_name));
  }
  
  get availableRocketList() {

    const {rocketNameFilter } = this.state;
    console.log('availableRocketList',this.state);

    fetch('https://api.spacexdata.com/v2/launches')
    .then((response) => response.json())
    .then((data) => {
        console.log('availableRocketList',data.length);

      if(rocketNameFilter ==='all'){
        console.log('all');
        return (
          data.map((e) =>
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
          )
        )
      }else{
        console.log('no all');
        return (
          data.filter( launch => launch.rocket.rocket_name === rocketNameFilter ).map((e) =>
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
          )
        )  
      }
      
    })
    .catch((error) => {
      console.error(error);
    });

    
/*
    fetch('https://api.spacexdata.com/v2/launches')
      .then((response) => response.json())
      .then((data) => {
        const launches_d = data;
        console.log(launches_d);
        this.setState({ launches:launches_d });
        this.setState({ isLoading: false });
        console.log('availableRocketList, this.state.launches',this.state.launches);

        let filtred = this.state.rocketNameFilter;
        //const data_f = 'aaa';
        const data_f = this.state.launches.map((e) =>
                    <li>
                      <div className={"rockets__content"}>
                        <div className={"rockets__content__date"}>{format(  new Date(e.launch_date_local), 'DD MMMM YYYY' )}</div>
                        <div className={"rockets__content__details"}>
                          <div className={"rockets__details__lab-name"}>Rocket: </div>
                          <div className={"rockets__details__name"}><a href="#" onClick={this.props.onLaunchClick}>{e.rocket.rocket_name}</a></div>
                          <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                          <div className={"rockets__details__site"}>{e.launch_site.site_name_long}</div>
                        </div>
                      </div>
                    </li>
            )

            const dataFiltred_f = this.state.launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter ).map((e) =>
            <li>
              <div className={"rockets__content"}>
                <div className={"rockets__content__date"}>{format(  new Date(e.launch_date_local), 'DD MMMM YYYY' )}</div>
                <div className={"rockets__content__details"}>
                  <div className={"rockets__details__lab-name"}>Rocket: </div>
                  <div className={"rockets__details__name"}><a href="#" onClick={this.props.onLaunchClick}>{e.rocket.rocket_name}</a></div>
                  <div className={"rockets__details__lab-site"}>|&nbsp;&nbsp; Launch Site: </div>
                  <div className={"rockets__details__site"}>{e.launch_site.site_name_long}</div>
                </div>
              </div>
            </li> 
            )
            
        
      })
      .catch((error) => {
        console.error(error);
      });
  */
   
    
  }

  get filteredLaunches(){
    const {rocketNameFilter} = this.state;
    console.log('filteredLaunches',this.state);

    if(!rocketNameFilter) return launches;

    fetch('https://api.spacexdata.com/v2/launches?rocket_id'+rocketNameFilter)
    .then((response) => response.json())
    .then((data) => {
        console.log('filteredLaunches',data.filter( launch => launch.rocket.rocket_name === rocketNameFilter ));
      return (
        data.filter( launch => launch.rocket.rocket_name === rocketNameFilter )
      )
    })
    .catch((error) => {
      console.error(error);
    });

    /*
    const launches = this.getData('https://api.spacexdata.com/v2/launches');

    if(!rocketNameFilter) return launches;

    //return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
    
    */
  }

  doToDetails(){
    console.log('doToDetails',this.state);
    /*
    const {rocketNameFilter} = this.state;
    const launches = this.getData('https://api.spacexdata.com/v2/launches');

    if(!rocketNameFilter) return launches;

    return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
    */
    return ['a','b','c']
  }

  handleFilterChange(value) {
    console.log('handleFilterChange', value);
    this.setState({ rocketNameFilter: value });
    return false;
  }

  componentDidMount() {

    fetch('https://api.spacexdata.com/v2/launches')
      .then((response) => response.json())
      .then((data) => {
        const launches_d = data;
        console.log(launches_d);
        this.setState({ launches:launches_d });
        this.setState({ isLoading: false });
        console.log('componentDidMount, this.state.launches',this.state.launches);
      })
      .catch((error) => {
        console.error(error);
      });

    this.getInitialState();
  }

  componentDidUpdate() {
    console.log(  'componentDidUpdate'  );
  }

  componentWillUnmount() {
   
  }

  getInitialState() {
    return {data: this.launch};
  }



  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
        
      <div id={"list"}>
        <img src={logo} className={"logo"} />
        <h1>Lanches 2018</h1>
        
        <FilterButtons
          options={this.availableRocketNames}
          onChange={this.filteredLaunches}
          allOptions={this.allRocketNames}
        />

        <div id={"rockets"}>
          <ul>
            {this.availableRocketList}
          </ul>
        </div>
        <Footer />
      </div>
        
    );
  }
}



export default LaunchesList;