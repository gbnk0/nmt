require('normalize.css/normalize.css');


import React from 'react';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { graphFetchData  } from '../actions/graph';
import { metricsFetchData  } from '../actions/metrics';

import HomeComponent from '../components/HomeComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import HeaderComponent from '../components/HeaderComponent'


class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.jwt) {
      this.props.metricsFetchData('/metrics/');
      this.props.graphFetchData('/graphs/');
    }
  }


  render() {
    const links = [];
    return (
      <div>
        <BreadcrumbComponent links={links}/>

        <HeaderComponent
          title='Home'
          subtitle=''
          icon='home'
          isLoading={this.props.isLoading}/>

        <HomeComponent {...this.props}/>
      </div>


    );
  }
}


HomeContainer.propTypes = {
    metricsFetchData: PropTypes.func.isRequired,
    metrics: PropTypes.object.isRequired,
    metricshasErrored: PropTypes.bool.isRequired,
    metricsisLoading: PropTypes.bool.isRequired,
    graphFetchData: PropTypes.func.isRequired,
    graph: PropTypes.object.isRequired,
    graphhasErrored: PropTypes.bool.isRequired,
    graphisLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        metrics: state.metrics,
        metricshasErrored: state.metricsHasErrored,
        metricsisLoading: state.metricsIsLoading,
        graph: state.graph,
        graphhasErrored: state.graphHasErrored,
        graphisLoading: state.graphIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        metricsFetchData: (url) => dispatch(metricsFetchData(url)),
        graphFetchData: (url) => dispatch(graphFetchData(url))
    };
};

HomeContainer.displayName = 'HomeContainer';

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
