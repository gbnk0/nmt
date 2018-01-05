'use strict';

import React from 'react';

import { Icon, Table } from 'semantic-ui-react';



require('styles//Search.css');


class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let content;

    if (this.props.hasErrored) {
        content = <p>API Unavailable</p>;
        return content;
    }

    return (
      <div className="search-component">
        <Table>
          <Table.Body>
          {this.props.search.results.map((result) => (
            <Table.Row key={result.id}>
              <Table.Cell collapsing>
                <Icon name='sitemap' />
              </Table.Cell>
              <Table.Cell selectable><a href={'/hosts/' + result.id}>{result.name} </a></Table.Cell>
              <Table.Cell selectable><a href={'/hosts/' + result.id}>{result.ip_addr}</a></Table.Cell>
              <Table.Cell selectable><a href={'/hosts/' + result.id}>{result.dns_names}</a></Table.Cell>
              
              <Table.Cell>{result.host_count} Hosts</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

SearchComponent.propTypes = {

};


SearchComponent.displayName = 'SearchComponent';

export default SearchComponent;
