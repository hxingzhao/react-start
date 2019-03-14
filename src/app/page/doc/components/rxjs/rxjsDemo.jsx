import React, { Component } from 'react';
import './rxjsDemo.scss';
import G6 from '@antv/g6';
export default class NetToPu extends Component {
    state = {
        netId: 'traceNet' + Date.now()
    };

    componentWillMount() {}

    componentDidMount() {
        this.dom = document.querySelector('#' + this.state.netId);
        if (this.dom) {
            this.initNet();
        }
    }

    initNet() {
        if (this.graph) {
            this.graph.destroy();
        }
        const data = {
            nodes: [{
              id: 'node1',
              x: 100,
              y: 200
            },{
              id: 'node2',
              x: 300,
              y: 200
            }],
            edges: [{
              id: 'edge1',
              target: 'node2',
              source: 'node1'
            }]
          };
          this.graph = new G6.Graph({
            container: this.dom,
            width: 500,
            height: 500
          });
          this.graph.read(data);
    }

    render() {
        const { netId } = this.state;
        return  <div id={netId} className="net-content"/>;
    }
}
