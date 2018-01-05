'use strict';

import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react'

require('styles/settings/Pluginlist.css');

class PluginlistComponent extends React.Component {


  render() {
    if (this.props.pluginsisLoading) {

      const content = <p>Loading...</p>;
      return content;
    }

    return (
      <div className="pluginlist-component">
        <Table celled striped selectable compact='very' size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Version</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.plugins.results.map((plugin) => (
              <Table.Row key={plugin.name}>
                <Table.Cell >
                  <Icon name='check circle outline' color='green' /> {plugin.name}
                </Table.Cell>
                <Table.Cell >
                  Scanner
                </Table.Cell>
                <Table.Cell >
                  {plugin.version}
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button size='mini' positive>Enable</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

PluginlistComponent.displayName = 'SettingsPluginlistComponent';

// Uncomment properties you need
// PluginlistComponent.propTypes = {};
// PluginlistComponent.defaultProps = {};

export default PluginlistComponent;
