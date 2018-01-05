'use strict';

import React from 'react';

import { Icon, Table, Button, Confirm } from 'semantic-ui-react';
import NewNetworkComponent from './modals/NewNetworkComponent';

require('styles//NetworkList.css');


class NetworkListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNetworks: [],
      confirmDeleteOpen: false,
      result: ''
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.result == 'confirmed' && this.state.result != 'confirmed') {
      this.props.networksDeleteData('/networks/', this.state.selectedNetworks);
      this.setState({selectedNetworks: []});
      this.props.fetchData('/networks/');
    }
  }

  showConfirm = () => this.setState({ confirmDeleteOpen: true })
  handleConfirm = () => this.setState({ result: 'confirmed', confirmDeleteOpen: false })
  handleConfirmCancel = () => this.setState({ result: 'cancelled', confirmDeleteOpen: false })

  onChange(e) {
    const selectedNetworks = this.state.selectedNetworks
    let index
    if (e.target.checked) {
      
      selectedNetworks.push(e.target.value)
    } else {
      
      index = selectedNetworks.indexOf(e.target.value)
      selectedNetworks.splice(index, 1)
    }
    
    this.setState({ selectedNetworks: selectedNetworks, result: '' })
  }

  selectedNetworksCount() {
    const result = ' Delete selected ( ' + this.state.selectedNetworks.length + ' )';
    return result
  }

  render() {
    let content;

    if (this.props.hasErrored) {
        content = <p>API Unavailable</p>;
        return content;
    }

    return (
      <div className="networklist-component">
          
        <Table sortable celled striped selectable color='blue' compact='very' size='small'>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell><input type='checkbox' value='terms'/></Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Subnet</Table.HeaderCell>
              <Table.HeaderCell>DNS</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Hosts</Table.HeaderCell>
              <Table.HeaderCell>Scan status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.networks.results.map((network) => (
              <Table.Row key={network.id}>
                <Table.Cell collapsing>
                  <input type='checkbox' value={network.id} onChange={this.onChange.bind(this)} />
                </Table.Cell>
                <Table.Cell selectable><a href={'/networks/'+network.id + '/'}>{network.name} </a></Table.Cell>
                <Table.Cell selectable><a href={'/networks/'+network.id + '/'}>{network.ip_addr}</a></Table.Cell>
                <Table.Cell selectable><a href={'/networks/'+network.id + '/'}>{network.dns_names}</a></Table.Cell>
                <Table.Cell selectable><a href={'/networks/'+network.id + '/'}>{network.is_private ? 'Private' : 'Public'}</a></Table.Cell>
                <Table.Cell selectable><a href={'/networks/'+network.id + '/'}>{network.host_count}</a></Table.Cell>
                <Table.Cell selectable>
                  <a href={'/networks/'+network.id}>

                    <Icon
                      size='large'
                      loading={ network.is_scanning }
                      name={ (network.is_scanning == true) ? 'refresh' : 'checkmark' }
                      color={ (network.host_count > 0 & network.is_scanning == false) ? 'green' : 'grey' }
                    />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan='7'>
                    <NewNetworkComponent floated='left' fetchData={this.props.fetchData}/>
                    <Button
                      floated='left'
                      content={this.selectedNetworksCount()}
                      icon='trash'
                      labelPosition='left'
                      negative
                      size='mini'
                      disabled={!this.state.selectedNetworks.length > 0}
                      onClick={this.showConfirm}
                    />
                    <Confirm
                      open={this.state.confirmDeleteOpen}
                      onCancel={this.handleConfirmCancel}
                      onConfirm={this.handleConfirm}
                      content={'You\'\ re going to delete ' + this.state.selectedNetworks.length + ' Network(s), are you sure?'}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
        </Table>
        
      </div>
    );
  }
}

NetworkListComponent.propTypes = {

};


NetworkListComponent.displayName = 'NetworkListComponent';

export default NetworkListComponent;
