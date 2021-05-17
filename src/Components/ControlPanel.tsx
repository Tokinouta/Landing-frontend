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
  dataDisplay: IndicatorProps;
  isStartDisabled: boolean;
  isResetDisabled: boolean;
  simulationState: string;
}

export class ControlPanel extends React.Component<ChartPropsArray, MyState> {
  chartrefs: Array<React.RefObject<ChartRef>>;

  constructor(props: ChartPropsArray) {
    super(props);

    this.state = {
      ra: 0,
      chartConfig: props.chartProps,
      newData: props.newdata,
      dataDisplay: {
        data: {
          heading: 0,
          speed: 0,
          altitude: 0,
          roll: 0,
          pitch: 0,
          vario: 0,
        },
      },
      isStartDisabled: true,
      isResetDisabled: true,
      simulationState: '已停止',
    };
    this.chartrefs = [
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
    ];
  }

  updateCharts() {
    this.updateInternalCharts();
    this.setState({ newData: this.props.newdata });
  }

  updateInternalCharts() {
    this.chartrefs[0].current?.update();
    this.chartrefs[1].current?.update();
    this.chartrefs[2].current?.update();
    this.chartrefs[3].current?.update();
  }

  setConnectionReady() {
    this.setState({ isStartDisabled: false });
  }

  setDataDisplay(data: IndicatorProps) {
    this.setState({ dataDisplay: data });
  }

  async reset() {
    await fetch('https://localhost:5001/WeatherForecast/reset');
    this.state.chartConfig[0].data.datasets[0].data = [];
    this.state.chartConfig[0].data.labels = [];
    this.state.chartConfig[1].data.datasets[0].data = [];
    this.state.chartConfig[1].data.labels = [];
    this.state.chartConfig[2].data.datasets[0].data = [];
    this.state.chartConfig[2].data.labels = [];
    this.state.chartConfig[3].data.datasets[0].data = [];
    this.state.chartConfig[3].data.labels = [];
    this.updateInternalCharts();
    this.setState({
      isResetDisabled: true,
      isStartDisabled: false,
      simulationState: '已停止',
      newData: {
        data: {
          heading: 0,
          speed: 0,
          altitude: 0,
          roll: 0,
          pitch: 0,
          vario: 0,
        },
      },
      dataDisplay: {
        data: {
          heading: 0,
          speed: 0,
          altitude: 0,
          roll: 0,
          pitch: 0,
          vario: 0,
        },
      },
    });
  }

  async startSimulation() {
    this.setState({
      isResetDisabled: false,
      isStartDisabled: true,
      simulationState: '仿真中',
    });
    await fetch('https://localhost:5001/WeatherForecast/startSimulation');
  }

  render() {
    // console.log('controlPanel render called');
    console.log(this.state.isStartDisabled);

    return (
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col-3">
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

            <div className="row justify-content-center align-control-button">
              仿真状态：{this.state.simulationState}
            </div>
          </div>
          <div className="col">
            <div
              className="row row-cols-2"
              style={{ margin: '0 auto', height: '42vh' }}
            >
              {this.chartrefs.map((ref, ind) => {
                return (
                  <div className="col" key={ind} style={{ height: '100%' }}>
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
          </div>
          <div className="col">
            <Example data={this.state.newData.data} size={'100%'} />
            <div className="row row-col-4">
              <div className="col-6">高度</div>
              <div className="col-6">{this.state.newData.data.altitude}</div>
              <div className="col-6">航向</div>
              <div className="col-6">{this.state.newData.data.heading}</div>
              <div className="col-6">俯仰</div>
              <div className="col-6">{this.state.newData.data.pitch}</div>
              <div className="col-6">滚转</div>
              <div className="col-6">{this.state.newData.data.roll}</div>
              <div className="col-6">空速</div>
              <div className="col-6">{this.state.newData.data.speed}</div>
              <div className="col-6">垂直速度</div>
              <div className="col-6">{this.state.newData.data.vario}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
