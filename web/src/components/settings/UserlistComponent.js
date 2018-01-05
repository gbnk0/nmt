'use strict';

import React from 'react';
import { Table, Icon } from 'semantic-ui-react'

require('styles/settings/Userlist.css');

class UserlistComponent extends React.Component {
  render() {
    return (
      <div className="userlist-component">
        <Table celled striped selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>ID</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.users.results.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell collapsing>
                  <Icon name='user' /> {user.id}
              </Table.Cell>
                <Table.Cell>
                   {user.email}
                </Table.Cell>
            </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

UserlistComponent.displayName = 'SettingsUserlistComponent';

// Uncomment properties you need
// UserlistComponent.propTypes = {};
// UserlistComponent.defaultProps = {};

export default UserlistComponent;
