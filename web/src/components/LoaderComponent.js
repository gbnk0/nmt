'use strict';

import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

require('styles//Loader.css');

class LoaderComponent extends React.Component {
  render() {
    return (
      <div className="loader-component">

        <Segment>
          <Dimmer active inverted>
            <Loader inverted size='big' />
          </Dimmer>

        </Segment>
      </div>
    );
  }
}

LoaderComponent.displayName = 'LoaderComponent';

// Uncomment properties you need
// LoaderComponent.propTypes = {};
// LoaderComponent.defaultProps = {};

export default LoaderComponent;
