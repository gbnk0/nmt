require('normalize.css/normalize.css');


import React from 'react';
import HostDetailComponent from '../components/HostDetailComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import HeaderComponent from '../components/HeaderComponent'

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hostFetchData } from '../actions/hosts';

class HostDetailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchData('/hosts/' + this.props.match.params.id + '/');
  }

  getbreadcrumblinks(props) {
    var links = [
      {
        'route': '/networks/',
        'name': 'Networks',
        'active': false
      },
      {
        'route': '/networks/' + props.host.host.network.id,
        'name': props.host.host.network.name,
        'active': false
      },
      {
        'route': '/hosts/' + props.host.host.id,
        'name': props.host.host.ip_addr,
        'active': true
      }
    ];
    return links;
  }

  render() {

    let content;

    if (this.props.hasErrored) {
        content = <p>Sorry! There was an error</p>;
        return content;
    }

    return (
      <div>
        <BreadcrumbComponent
          links={this.getbreadcrumblinks(this.props)}/>
        <HeaderComponent
          title={this.props.host.host.ip_addr}
          subtitle={this.props.host.host.dns_names}
          icon='server'
          isLoading={this.props.isLoading}/>
        <HostDetailComponent host={this.props.host.host} {...this.props}/>
      </div>
    );
    
  }
}


HostDetailContainer.propTypes = {
    fetchData: PropTypes.func.isRequired,
    host: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired

};

const mapStateToProps = (state) => {
    return {
        host: state.host,
        hasErrored: state.hostHasErrored,
        isLoading: state.hostIsLoading

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(hostFetchData(url))
    };
};

HostDetailContainer.displayName = 'HostDetailContainer';

export default connect(mapStateToProps, mapDispatchToProps)(HostDetailContainer);
