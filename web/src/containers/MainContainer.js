require('normalize.css/normalize.css');
require('styles/App.css');
// Redux
import React from 'react';

import { Grid } from 'semantic-ui-react'

import NavbarComponent from '../components/NavbarComponent.js'
import {connect} from 'react-redux';
import Routes from '../routes';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types';
import { userFetchData } from '../actions/sessions'

import Notifications from 'react-notification-system-redux';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // If not logged_in and trying to get another route than /login
    if (!this.props.logged_in && ( this.props.router.location.pathname != '/login/') && (!localStorage.jwt)) {
      this.props.pushToHistory('/login/');
    }
    if (this.props.logged_in) {
      this.props.userFetchData('/auth/me');
    }
  }

  componentDidMount() {

  }

  getContent(props) {
    var content = <Routes />;
    if (props.logged_in) {
      var content = (
      <div>
        <NavbarComponent {...props} />
        <Grid stretched>

          <Grid.Column width={2}>

          </Grid.Column >
          <Grid.Column width={13}>
            <Routes />
          </Grid.Column>
        </Grid>
      </div>
      );
                  
    };

    return content;
  }

  render() {
        const { notifications } = this.props;
        const style = {
          NotificationItem: {
            DefaultStyle: {
              marginTop: '50px'
            }

          }
        };

          return (
            
            <div className="index">
              <div className="Layout">
                <Notifications
                  notifications={notifications}
                  style={style}
                />
                {this.getContent(this.props)}
                    
              </div>
            </div>
          );

  }
}


MainContainer.propTypes = {
  pushToHistory: PropTypes.func.isRequired,
  userFetchData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userHasErrored: PropTypes.bool.isRequired,
  userIsLoading: PropTypes.bool.isRequired,
  notifications: PropTypes.array
}

function mapStateToProps(state) {
  return {
    logged_in: state.sessionReducer,
    router: state.router,
    user: state.user,
    userHasErrored: state.userHasErrored,
    userIsLoading: state.userIsLoading,
    notifications: state.notifications
  };
}


const mapDispatchToProps = (dispatch) => {
    return {
        pushToHistory: (route) => dispatch(push(route)),
        userFetchData: (url) => dispatch(userFetchData(url))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));

