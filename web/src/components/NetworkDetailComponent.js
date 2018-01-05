'use strict';

import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

import { formatDate, renderOs } from '../lib/tools';
import PropTypes from 'prop-types';

require('styles//NetworkDetail.css');

class NetworkDetailComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
       super(props, context);
  }
  navigate(route) {
    this.props.history.push('/hosts/' + route);
  }

  handleClick = (e, { key }) => this.navigate(key)

  render() {
    let content;
    
    if (this.props.hasErrored) {
        content = <p>API Unavailable</p>;
        return content;
    }
    return (
      <div className="networkdetail-component">

            <Table sortable celled striped selectable color='blue' compact='very' size='small'>

              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Hostname</Table.HeaderCell>
                  <Table.HeaderCell>IP Address</Table.HeaderCell>
                  <Table.HeaderCell>MAC</Table.HeaderCell>
                  <Table.HeaderCell>Vendor</Table.HeaderCell>
                  <Table.HeaderCell>OS</Table.HeaderCell>
                  <Table.HeaderCell>Open ports</Table.HeaderCell>
                  <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.hosts.results.map((host) => (
                  
                  <Table.Row
                    key={host.id}
                    >
                    <Table.Cell collapsing>
                      <Icon name='computer' />
                    </Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{host.dns_names}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{host.ip_addr}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{host.mac_addr}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{host.mac_vendor}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{renderOs(host)}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{host.open_ports}</a></Table.Cell>
                    <Table.Cell selectable><a href={'/hosts/' + host.id}>{formatDate(host.last_seen)}</a></Table.Cell>
                  </Table.Row>
                  
                ))}
              </Table.Body>
              <Table.Footer fullWidth>

              </Table.Footer>
            </Table>
      </div>
    );
    
  }
}



NetworkDetailComponent.displayName = 'NetworkDetailComponent';

// Uncomment properties you need
// NetworkDetailComponent.propTypes = {};
// NetworkDetailComponent.defaultProps = {};

export default NetworkDetailComponent;