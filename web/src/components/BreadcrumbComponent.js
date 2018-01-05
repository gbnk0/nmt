'use strict';

import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'
import PropTypes from 'prop-types';

require('styles//Breadcrumb.css');

class BreadcrumbComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
       super(props, context);
  }

  navigate(route) {
    this.context.router.history.push(route);
  }

  handleClick = (e, { name }) => this.navigate(name)

  render() {
    
    return (
      <div className="breadcrumb-component">
        <Breadcrumb size='small'>
          <Breadcrumb.Section name='/home/' onClick={this.handleClick.bind(this)} link>Home</Breadcrumb.Section>
          {this.props.links ?
            (this.props.links.map((link) => (
              [
              <Breadcrumb.Divider icon='right chevron' />,
              <Breadcrumb.Section
                key={link.name}
                active={link.active}
                onClick={this.handleClick.bind(this)}
                name={link.route}>
                {link.name}
              </Breadcrumb.Section>
              ]

              ))) : null
          }
        </Breadcrumb>
      </div>
    );
  }
}

BreadcrumbComponent.displayName = 'BreadcrumbComponent';

// Uncomment properties you need
// BreadcrumbComponent.propTypes = {};
// BreadcrumbComponent.defaultProps = {};

export default BreadcrumbComponent;
