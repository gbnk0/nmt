'use strict';

import React from 'react';
import Graph from 'react-graph-vis';

require('styles//Graph.css');


const options = {
  nodes: {
      shape: 'dot',
      size: 10,
      font: {
          size: 10
      },
      shapeProperties: {
        interpolation: false
      },
      shadow:true
  },
  edges: {
    width: 1,
    shadow:true
  },
  physics:{
    stabilization: false
  },
  autoResize: true
};

const events = {
  // select: function(event) {
  //   // var { nodes, edges } = event;
  //   // console.log('Selected nodes:');
  //   // console.log(nodes);
  //   // console.log('Selected edges:');
  //   // console.log(edges);
  // }

};

class GraphComponent extends React.Component {

  componentDidMount(){
    this.network.fit();

  }
  
  setNetworkInstance = nw => {
    this.network = nw;
  }

  render() {
    return (
      <div className="graph-component">
        <Graph
          graph={this.props.graph}
          options={options}
          events={events}
          style={{ height: this.props.height }}
          getNetwork={this.setNetworkInstance}
          />
      </div>
    );
  }
}

GraphComponent.displayName = 'GraphComponent';


export default GraphComponent;
