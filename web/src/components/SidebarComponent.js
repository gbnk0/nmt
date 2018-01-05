'use strict';

import React from 'react';
import { Menu, Label, Input } from 'semantic-ui-react'


require('styles//SideBar.css');

class SidebarComponent extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state
    return (
      <div className='sidebar-component'>
        <Menu vertical fluid  secondary>
          <Menu.Item name='default' onClick={this.handleItemClick} active>
            <Label color='orange'>{this.props.networks.results.length}</Label>
            Default entity
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

SidebarComponent.displayName = 'SidebarComponent';

// Uncomment properties you need
// SideBarComponent.propTypes = {};
// SideBarComponent.defaultProps = {};

export default SidebarComponent;
