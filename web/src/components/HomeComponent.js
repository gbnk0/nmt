'use strict';

import React from 'react';
import MetricsComponent from './home/MetricsComponent'
import GraphComponent from './GraphComponent';
import { Header, Segment } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react'

require('styles//Home.css');

class HomeComponent extends React.Component {

  render() {
    let content;

    if (this.props.metricshasErrored) {
        content = <p>API Unavailable</p>;
        return content;
    }


    return (
      <div className="home-component">

        <Segment size='mini' color='purple' {...this.props.metricsisLoading ? {loading: true} : {}}>
            <Header> Statistics </Header>
            <MetricsComponent metrics={this.props.metrics} />
        </Segment>

        <Grid columns='equal'>



          <Grid.Column width={16}>
            <Segment size='mini' color='green' {...this.props.graphisLoading ? {loading: true} : {}}>
              <Header> Graph </Header>
              <GraphComponent {...this.props} height={'530px'}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}



HomeComponent.propTypes = {


};


HomeComponent.displayName = 'HomeComponent';

export default HomeComponent;
