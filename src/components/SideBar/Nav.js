import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>       
        <li className={this.isPathActive('/about') ? 'active' : null}>
          <Link to="/about">
            <i className="pe-7s-note2"></i>
            <p>About</p>
          </Link>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);