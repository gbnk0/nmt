'use strict';

import React from 'react';
import { Grid, Card, Tab, Icon } from 'semantic-ui-react'
import ServicesComponent from './hostdetail/ServicesComponent'
import { formatDate, renderOs } from '../lib/tools';

require('styles//HostDetail.css');

class HostDetailComponent extends React.Component {
  renderpanes(props) {
    const panes = [
      {
        menuItem: { key: 'services', icon: 'tasks', content: 'Services' },
        render: () => <Tab.Pane loading={props.isLoading}><ServicesComponent {...props}/></Tab.Pane>
      },
      {
        menuItem: { key: 'history', icon: 'browser', content: 'History' },
        render: () => <Tab.Pane loading={props.isLoading}>No history</Tab.Pane>
      }
    ]
    return panes;
  }

  render() {

    if (this.props.isLoading) {
        const content = <p>Loading...</p>;
        return content;
    }
    return (
      <div className="hostdetail-component">
        <Grid >
          <Grid.Column width={4}>
              <Card className="card-h" fluid>
                <Card.Content>
                  
                  <Card.Header>
                    <Icon name='sitemap' />
                    Network
                  </Card.Header>
                  <Card.Meta>
                    {this.props.host.host.ip_addr}
                  </Card.Meta>
                  <Card.Description>
                    {this.props.host.host.mac_addr}
                  </Card.Description>

                  <Card.Content extra>

                  </Card.Content>

                </Card.Content>
              </Card>

              <Card className="card-h" fluid>
                <Card.Content>
                  
                  <Card.Header>
                  <Icon name='circle outline' /> Last seen
                  </Card.Header>
                  <Card.Meta>
                    {formatDate(this.props.host.host.last_seen)}
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card className="card-h" fluid>
                <Card.Content>
                  
                  <Card.Header>
                  <Icon name='hashtag' /> DNS
                  </Card.Header>
                  <Card.Meta>
                  {this.props.host.host.dns_names}
                  </Card.Meta>
                </Card.Content>
              </Card>
            
            <Card className="card-h" fluid>
              <Card.Content>

                <Card.Header>
                  <Icon name='block layout' /> Operating system
                  </Card.Header>
                <Card.Meta>
                    {renderOs(this.props.host)}
                </Card.Meta>
              </Card.Content>
            </Card>
            
          </Grid.Column>
          <Grid.Column width={12}>
            <Tab panes={this.renderpanes(this.props)} />
          </Grid.Column>
        </Grid>
        



        


      </div>
    );
  }
}

HostDetailComponent.displayName = 'HostDetailComponent';

// Uncomment properties you need
// HostDetailComponent.propTypes = {};
// HostDetailComponent.defaultProps = {};

export default HostDetailComponent;
