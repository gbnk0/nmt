'use strict';

import React from 'react';
import { Card, Button, Table } from 'semantic-ui-react';

require('styles/settings/SensorList.css');

class SensorListComponent extends React.Component {
  render() {
    if (this.props.isLoading) {
        return null;
    }
    return (
      <div className="sensorlist-component">
        <Card.Group>
            {this.props.sensors.results.map((sensor) => (
                <Card key={sensor.id}>
                  <Card.Content>
                    
                    <Card.Header>
                      {sensor.name}
                    </Card.Header>
                    <Card.Meta>
                      {sensor.dns_names}
                    </Card.Meta>
                    <Card.Description>
                      {sensor.version}
                      {sensor.ip_addr}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>

                    <Table compact='very' celled selectable size='small'>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>iFace</Table.HeaderCell>
                          <Table.HeaderCell>IP Address</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {sensor.interfaces.map((iface) => (
                          <Table.Row key={iface.name}>
                            <Table.Cell>{iface.name}</Table.Cell>
                            <Table.Cell>{iface.ip_addr}</Table.Cell>
                          </Table.Row>
                        ))}

                      </Table.Body>
                    </Table>

                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='red'>Delete</Button>
                    </div>
                  </Card.Content>
                </Card>
            ))}
        </Card.Group>
      </div>
    );
  }
}

SensorListComponent.displayName = 'SensorListComponent';

// Uncomment properties you need
// SensorListComponent.propTypes = {};
// SensorListComponent.defaultProps = {};

export default SensorListComponent;
