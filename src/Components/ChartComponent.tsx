import React from 'react';
import { Props } from './types';
import Chart from 'chart.js/auto';

export default class ChartComponent extends React.Component<Props, any, any> {
  chartCanvas: React.RefObject<HTMLCanvasElement>;
  chart: Chart;
  config: Props | null;
  constructor(props: Props) {
    super(props);
    this.chartCanvas = React.createRef();
    this.chart = null;
    this.config = null;
  }

  componentDidMount() {
    let configc = { ...this.props };
    if (!this.chart) {
      this.chart = new Chart(this.chartCanvas.current, configc);
    }
    // console.log(this.chart);
    // console.log('finished initializing');
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      //   console.log('destroyed', this.chart);
      //   console.log('destroyed');
    }
  }
  updateChart() {
    if (this.chart) {
      //   console.log('start to update chart');
      this.chart.update('show');
      //   console.log('finished updating chart');
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartCanvas}></canvas>
      </div>
    );
  }
}
