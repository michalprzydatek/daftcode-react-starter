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

    fetch('https://api.spacexdata.com/v2/launches')
     .then((response) => response.json())
     .then((data) => {
       return data.map((e)=> array.push(e.rocket.rocket_name));
     })
     .catch((error) => {
       console.error(error);
     });
    
    
    
    console.log('array',array);
    
    //const rocketNames = names.map((e) => array.push(e.rocket.rocket_name));
    const uniqueArray = array.filter(function(item, pos) {
          return array.indexOf(item) == pos;
    });
    const uniqueArrayLi = uniqueArray.map((e,i) => 
        <li className={this.state.rocketNameFilter === e ? 'active' : ''}>
        <a href="#" data-name={e} onClick={(x)=>{this.handleFilterChange(e)}}>{e}</a>
  </li>);
    return uniqueArrayLi;
  }
  
  get availableRocketList() {
    const {rocketNameFilter} = this.state;
    let fetch_data = '';
    let data_f='';
    let dataFiltred_f ='';

    let filtred = this.state.rocketNameFilter;

    fetch('https://api.spacexdata.com/v2/launches')
     .then((response) => response.json())
     .then((data) => {
        const launches = data;
        console.log(launches);
        this.setState({ launches:launches });
        this.setState({ isLoading:false });
        console.log('this.state.launches',this.state.launches);
        
        data_f = this.state.launches.map((e) =>
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
    
      dataFiltred_f = this.state.launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter ).map((e) =>
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

     
    return rocketNameFilter === 'all' ? data_f : dataFiltred_f ;
  }

  get filteredLaunches(){
    const {rocketNameFilter} = this.state;
    const launches = this.getData('https://api.spacexdata.com/v2/launches');

    if(!rocketNameFilter) return launches;

    //return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
    return this.getData('https://api.spacexdata.com/v2/launches?rocket_id='+rocketNameFilter);
  }

  doToDetails(){
    const {rocketNameFilter} = this.state;
    const launches = this.getData('https://api.spacexdata.com/v2/launches');

    if(!rocketNameFilter) return launches;

    return launches.filter( launch => launch.rocket.rocket_name === rocketNameFilter );
  }

  handleFilterChange(value) {
    console.log('handleFilterChange', value);
    this.setState({ rocketNameFilter: value });
    return false;
  }

getData(url) {
   return fetch(url)
   .then((response) => response.json())
   .then((responseJson) => {
     return responseJson;
   })
   .catch((error) => {
     console.error(error);
   });
}
  componentDidMount() {
    this.setState({isLoading: true});
    this.getInitialState();
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