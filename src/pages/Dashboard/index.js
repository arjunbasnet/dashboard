import React from 'react';
import SalesChart from './SalesChart';
import Tasks from './Tasks';
import LunchFeed from 'widgets/LunchFeed';
import Weather from 'widgets/Weather';

const Dashboard = () => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
        <SalesChart />
        </div>
        <div className="col-md-6">
          <Tasks />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <LunchFeed/>
        </div>
        <div className="col-md-6">
          <Weather/>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;