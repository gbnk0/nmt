require('normalize.css/normalize.css');


import React from 'react';

import UserlistComponent from '../components/settings/UserlistComponent'
import SensorListComponent from '../components/settings/SensorListComponent'
import PluginlistComponent from '../components/settings/PluginlistComponent'

import HeaderComponent from '../components/HeaderComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import { Tab } from 'semantic-ui-react'

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersFetchData  } from '../actions/users';
import { sensorsFetchData } from '../actions/sensors';
import { pluginsFetchData } from '../actions/plugins';


const panes = (props) => [
  {
    menuItem: { key: 'users', icon: 'users', content: 'Users' },
    render: () => <UserlistComponent {...props} />
  },
  {
    menuItem: { key: 'sensors', icon: 'circle outline', content: 'Sensors' },
    render: () => <SensorListComponent {...props} />
  },
  {
    menuItem: { key: 'plugins', icon: 'plug', content: 'Plugins' },
    render: () => <PluginlistComponent {...props} />
  }
]

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.usersFetchData('/users/');
    this.props.sensorsFetchData('/sensors/');
    this.props.pluginsFetchData('/plugins/');
  }

  render() {
    const links = [
      {
        'route': '/settings/',
        'name': 'Settings',
        'active': true
      }
    ];
    return (
        <div>
          <BreadcrumbComponent links={links}/>
          <HeaderComponent
            title='Settings (WIP)'
            subtitle={'Manage permissions, scans, sensors'}
            icon='setting'
            isLoading={this.props.sensorsisLoading && this.props.usersIsLoading}/>
            <Tab menu={{ pointing: true }} panes={panes(this.props)} />
        </div>



    );
  }
}


SettingsContainer.propTypes = {
    usersFetchData: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    usershasErrored: PropTypes.bool.isRequired,
    usersisLoading: PropTypes.bool.isRequired,
    sensorsFetchData: PropTypes.func.isRequired,
    sensors: PropTypes.object.isRequired,
    sensorshasErrored: PropTypes.bool.isRequired,
    sensorsisLoading: PropTypes.bool.isRequired,
    plugins: PropTypes.object.isRequired,
    pluginshasErrored: PropTypes.bool.isRequired,
    pluginsisLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        usershasErrored: state.usersHasErrored,
        usersisLoading: state.usersIsLoading,
        sensors: state.sensors,
        sensorshasErrored: state.sensorsHasErrored,
        sensorsisLoading: state.sensorsIsLoading,
        plugins: state.plugins,
        pluginshasErrored: state.pluginsHasErrored,
        pluginsisLoading: state.pluginsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        usersFetchData: (url) => dispatch(usersFetchData(url)),
        sensorsFetchData: (url) => dispatch(sensorsFetchData(url)),
        pluginsFetchData: (url) => dispatch(pluginsFetchData(url))
    };
};

SettingsContainer.displayName = 'SettingsContainer';

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
