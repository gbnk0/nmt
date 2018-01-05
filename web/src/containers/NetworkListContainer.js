require('normalize.css/normalize.css');


import React from 'react';
import NetworkListComponent from '../components/NetworkListComponent'
import HeaderComponent from '../components/HeaderComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import SidebarComponent from '../components/SidebarComponent'
import { Grid } from 'semantic-ui-react'
// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { networksFetchData, networksDeleteData  } from '../actions/networks';

class NetworkListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchData('/networks/');
  }

  render() {
    const links = [
      {
        'route': '/networks/',
        'name': 'Networks',
        'active': true
      }
    ];
    return (
        <div>
              <BreadcrumbComponent links={links}  />
              <HeaderComponent
                title='Networks'
                subtitle={this.props.networks.total + ' Networks'}
                icon='sitemap'
                isLoading={this.props.isLoading}/>
              <Grid stretched>

                <Grid.Column width={2}>
                  <SidebarComponent {...this.props} />
                </Grid.Column>
                <Grid.Column width={14}>
                  <NetworkListComponent {...this.props} />
                </Grid.Column>
              </Grid>
              

        </div>

    );
  }
}


NetworkListContainer.propTypes = {
    fetchData: PropTypes.func.isRequired,
    networks: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    networksDeleteData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        networks: state.networks,
        hasErrored: state.networksHasErrored,
        isLoading: state.networksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(networksFetchData(url)),
        networksDeleteData: (url, networks) => dispatch(networksDeleteData(url, networks))
    };
};

NetworkListContainer.displayName = 'NetworkListContainer';

export default connect(mapStateToProps, mapDispatchToProps)(NetworkListContainer);
