'use strict';

import React from 'react';
import { Statistic } from 'semantic-ui-react'

require('styles/home/Metrics.css');

class MetricsComponent extends React.Component {
  render() {
    return (
      <div className="metrics-component">
        <Statistic.Group>
          <Statistic color='purple' size='mini'>
            <Statistic.Value>{this.props.metrics.network_count}</Statistic.Value>
            <Statistic.Label>Networks</Statistic.Label>
          </Statistic>
          <Statistic color='orange' size='mini'>
            <Statistic.Value>{this.props.metrics.host_count}</Statistic.Value>
            <Statistic.Label>Hosts</Statistic.Label>
          </Statistic>
          <Statistic color='green' size='mini'>
            <Statistic.Value>{this.props.metrics.sensor_count}</Statistic.Value>
            <Statistic.Label>Sensors</Statistic.Label>
          </Statistic>
          <Statistic color='blue' size='mini'>
            <Statistic.Value>{this.props.metrics.ports_count}</Statistic.Value>
            <Statistic.Label>Open ports</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );
  }
}

MetricsComponent.displayName = 'HomeMetricsComponent';

// Uncomment properties you need
// MetricsComponent.propTypes = {};
// MetricsComponent.defaultProps = {};

export default MetricsComponent;
