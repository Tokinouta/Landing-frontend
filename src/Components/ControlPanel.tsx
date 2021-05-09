import React from 'react';
import { ChartRef, ChartWithHook } from './ChartComponent';
import { ChartProps, ChartPropsArray } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ControlPanel.css';
import { Example, IndicatorProps } from './Indicator';
interface MyState {
  chartConfig: ChartProps[];
  ra: number;
  newData: IndicatorProps;
  isStartDisabled: boolean;
  isResetDisabled: boolean;
}

export class ControlPanel extends React.Component<ChartPropsArray, MyState> {
  chartrefs: Array<React.RefObject<ChartRef>>;

  constructor(props: ChartPropsArray) {
    super(props);

    this.state = {
      ra: 0,
      chartConfig: props.chartProps,
      newData: props.newdata,
      isStartDisabled: true,
      isResetDisabled: true,
    };
    this.chartrefs = [
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
    ];
    // console.log(
    //   this.state.chartConfig[1].data === this.state.chartConfig[0].data,
    //   this.state.chartConfig[2].data === this.state.chartConfig[0].data,
    //   this.state.chartConfig[3].data === this.state.chartConfig[0].data,
    // );
  }
  // forceUpdate() {
  //   console.log(this.props.isConnectionReady);
  // }

  // componentDidUpdate() {
  //   console.log(this.props.isConnectionReady);
  //   this.setState({ isConnectionReady: this.props.isConnectionReady });
  //   console.log(this.props.isConnectionReady);
  // }

  updateCharts() {
    this.chartrefs[0].current?.update();
    this.chartrefs[1].current?.update();
    this.chartrefs[2].current?.update();
    this.chartrefs[3].current?.update();
    this.setState({ newData: this.props.newdata });
  }

  setConnectionReady() {
    this.setState({ isStartDisabled: false });
  }

  async reset() {
    this.setState({ isResetDisabled: true, isStartDisabled: false });
    await fetch('https://localhost:5001/WeatherForecast/reset');
    this.state.chartConfig[0].data.datasets[0].data = [];
    this.state.chartConfig[0].data.labels = [];
    this.state.chartConfig[1].data.datasets[0].data = [];
    this.state.chartConfig[1].data.labels = [];
    this.state.chartConfig[2].data.datasets[0].data = [];
    this.state.chartConfig[2].data.labels = [];
    this.state.chartConfig[3].data.datasets[0].data = [];
    this.state.chartConfig[3].data.labels = [];
    this.updateCharts();
  }

  async startSimulation() {
    this.setState({ isResetDisabled: false, isStartDisabled: true });
    await fetch('https://localhost:5001/WeatherForecast/startSimulation');
  }

  render() {
    // console.log('controlPanel render called');
    console.log(this.state.isStartDisabled);

    return (
      <div>
        <div className="row">
          <div className="col-3">
            {/* <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState((prev, prop) => ({
                    ra: prev.ra + 1,
                  }));

                  this.setState(null, () => {
                    // this.state.chartConfig[0].data.datasets[0].data.push(1);
                    // this.state.chartConfig[0].data.labels.push('0');
                    // this.chartrefs[0].current?.updateChart();
                    this.state.chartConfig.forEach((ele, ind) => {
                      ele.data.datasets[0].data.push(1);
                      ele.data.labels.push('0');
                      this.chartrefs[ind].current?.update();
                      // console.log(ind);
                    });
                    //
                  });
                  console.log(this.state.isStartDisabled);
                }}
              >
                rararararara
              </button>
            </div> */}
            <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => this.startSimulation()}
                disabled={this.state.isStartDisabled}
              >
                开始仿真
              </button>
            </div>
            <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => this.reset()}
                disabled={this.state.isResetDisabled}
              >
                停止仿真
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-cols-2" style={{ margin: '0 auto' }}>
              {this.chartrefs.map((ref, ind) => {
                return (
                  <div className="col" key={ind}>
                    <ChartWithHook
                      data={this.state.chartConfig[ind].data}
                      type={this.state.chartConfig[ind].type}
                      options={this.state.chartConfig[ind].options}
                      ref={ref}
                    ></ChartWithHook>
                    {/* {this.state.ra} */}
                  </div>
                );
              })}
            </div>
            {/* <div>{JSON.stringify(this.state.newData.data)}</div> */}
            <Example data={this.props.newdata.data} />
          </div>
        </div>
      </div>
    );
  }
}
