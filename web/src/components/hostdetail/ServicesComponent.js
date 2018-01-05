'use strict';

import React from 'react';
import { Label, List, Icon } from 'semantic-ui-react'

require('styles/hostdetail/Services.css');

class ServicesComponent extends React.Component {
  render() {
    return (
      <div className="services-component">
        <List divided selection>
          {this.props.host.host.services.map((proto) => (

            <List.Item key={proto.name}>
              
              <Label horizontal><Icon name='circle' />{proto.name}</Label>
              <List.Content floated='right'>

              {proto.ports.map(port =>
                <Label color='green' horizontal>{port}</Label>
              )}
                
              </List.Content>

            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

ServicesComponent.displayName = 'HostdetailServicesComponent';

// Uncomment properties you need
// ServicesComponent.propTypes = {};
// ServicesComponent.defaultProps = {};

export default ServicesComponent;
