'use strict';

import React from 'react';
import { Icon, Header, Segment } from 'semantic-ui-react';

class HeaderComponent extends React.Component {
  render() {
    return (
        <Segment size='tiny' color='orange' loading={this.props.isLoading}>
          <Header as='h3'>
            <Icon name={this.props.icon} />
            <Header.Content>
              {this.props.isLoading ? 'LOADING...' :
                this.props.title}
              <Header.Subheader>
                {this.props.subtitle}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>

    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
