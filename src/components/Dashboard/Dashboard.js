import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPoliceReports } from '../../actions/policeReportsAction';
import { authenticateUser } from '../../actions/authenticateAction';
import { fetchOffenseTypes } from '../../actions/offenseTypes';

import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import NewLocation from './NewLocation/NewLocation';
import LocationsOnMap from './LocationsOnMap/LocationsOnMap';
import ReportInfo from './ReportInfo/ReportInfo';
import OffenseTypeFilter from './OffenseTypeFilter/OffenseTypeFilter';
import LocationSummary from './LocationSummary/LocationSummary';

import './dashboard.css';

class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      defaultCircle: {
        lat: 47.617756,
        lng: -122.326560,
        range: 5000
      }
    }
  }
  componentWillMount() {
    const lat = this.state.defaultCircle.lat;
    const lng = this.state.defaultCircle.lng;
    const range = this.state.defaultCircle.range;

    this.props.dispatch(authenticateUser());
    this.props.dispatch(fetchOffenseTypes());
  }

  render() {
    return (
      <div className="Dashboard-container">
        <div className="Dashboard-nav-container">
          <Nav />
        </div>

        <div className="Dashboard-main-container">
          <div className="Dashboard-map-container">
            <Map
              reports={this.props.policeReports}
              mergedReports={this.props.mergedReports}
            />
            <LocationsOnMap />
          </div>
          <div className="Dashboard-tools-container">
            <div className="Dashboard-tools-reportinfo">
              <ReportInfo report={this.props.currentReport}/>
            </div>

            <div className="Dashboard-tools-newlocation">
              <NewLocation />
            </div>
            
            <div className="Dashboard-tools-offensetype">
              <OffenseTypeFilter />
            </div>
          </div>
        </div>
        <div className="Dashboard-location-summary-container">
          {
            this.props.areStats ?
              <LocationSummary {...this.props} />
            :
            <h4>Waiting...</h4>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    policeReports: store.policeReports.reports,
    mergedReports: store.policeReports.mergedReports,
    currentReport: store.currentReport.currentReports,
    areStats: store.locations.areStats,
    locations: store.locations
  };
};

export default connect(mapStateToProps)(Dashboard);
