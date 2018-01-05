require('normalize.css/normalize.css');


import React from 'react';
import { Grid } from 'semantic-ui-react'
import NetworkDetailComponent from '../components/NetworkDetailComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import HeaderComponent from '../components/HeaderComponent'

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hostsFetchData } from '../actions/hosts';
// import { graphFetchData } from '../actions/graph';


class NetworkDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const networkId = this.props.match.params.id
    this.props.fetchData('/networks/' + networkId + '/');
    // this.props.graphFetchData('/graphs/' + networkId + '/');
  }

  render() {
    const links = [
      {
        'route': '/networks/',
        'name': 'Networks',
        'active': false
      },
      {
        'route': '/networks/' + this.props.hosts.network.id,
        'name': this.props.hosts.network.name,
        'active': true
      }
    ];
    return (
        <div>
          <BreadcrumbComponent
            links={links}/>
          <HeaderComponent
            title={this.props.hosts.network.name}
            subtitle={this.props.hosts.total + ' Hosts'}
            icon='sitemap'
            isLoading={this.props.isLoading}/>

          <NetworkDetailComponent {...this.props} />

        </div>



    );
  }
}


NetworkDetailsContainer.propTypes = {
    fetchData: PropTypes.func.isRequired,
    hosts: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    // graphFetchData: PropTypes.func.isRequired,
    // graph: PropTypes.object.isRequired,
    // graphhasErrored: PropTypes.bool.isRequired,
    // graphisLoading: PropTypes.bool.isRequired

};

const mapStateToProps = (state) => {
    return {
        hosts: state.hosts,
        hasErrored: state.hostsHasErrored,
        isLoading: state.hostsIsLoading,
        // graph: state.graph,
        // graphhasErrored: state.graphHasErrored,
        // graphisLoading: state.graphIsLoading

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(hostsFetchData(url))
        // graphFetchData: (url) => dispatch(graphFetchData(url))
    };
};

NetworkDetailsContainer.displayName = 'NetworkDetailsContainer';

export default connect(mapStateToProps, mapDispatchToProps)(NetworkDetailsContainer);
