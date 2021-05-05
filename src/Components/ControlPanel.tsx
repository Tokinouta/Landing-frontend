import React from 'react';
import ChartComponent, { ChartRef, ChartWithHook } from './ChartComponent';
import { ChartProps, ChartPropsArray } from './types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ControlPanel.css';
import _ from 'lodash';
import { DataToPlot } from './DataToPlot';
import { Example, IndicatorProps } from './Indicator';
interface MyState {
  chartConfig: ChartProps[];
  ra: number;
  simulationHub: HubConnection;
  newData: IndicatorProps;
}

export class ControlPanel extends React.Component<ChartPropsArray, MyState> {
  chartrefs: Array<React.RefObject<ChartRef>>;

  constructor(props: ChartPropsArray) {
    super(props);
    let temp = {
      type: 'line',
      data: {
        labels: ['0'],
        datasets: [
          {
            label: '# of Votes',
            data: [1],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      },
      options: {
        // scales: {
        //   y: {
        //     beginAtZero: true,
        //   },
        // },[temp, temp]
        responsive: true,
        // maintainAspectRatio: false,
        animation: false,
        legend: false,
      },
    };

    this.state = {
      ra: 0,
      chartConfig: props.chartProps,
      newData: props.newdata,
      // [
      //   _.cloneDeep(temp),
      //   _.cloneDeep(temp),
      //   _.cloneDeep(temp),
      //   _.cloneDeep(temp),
      // ],
      simulationHub: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/simulationHub')
        // .configureLogging(signalR.LogLevel.Information)
        .build(),
    };
    this.chartrefs = [
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
    ];
    // new Array(4).fill(React.createRef<ChartComponent>());
    // this.state.chartConfig = this.state.chartConfig.map(() =>
    //   _.cloneDeep(temp),
    // );
    console.log(
      this.state.chartConfig[1].data === this.state.chartConfig[0].data,
      this.state.chartConfig[2].data === this.state.chartConfig[0].data,
      this.state.chartConfig[3].data === this.state.chartConfig[0].data,
    );
  }

  // componentDidMount() {
  //   console.log(this.state.chartConfig);
  //   this.setState({}, () => {
  //     this.state.simulationHub
  //       .start()
  //       .then(() => console.log('Connection started!'))
  //       .catch((err) => console.log('Error while establishing connection :('));

  //     this.state.simulationHub.on(
  //       'SendSimulationData',
  //       (user, data: DataToPlot) => {
  //         console.log(data);
  //         this.setState(null, () => {
  //           this.state.chartConfig[0].data.datasets[0].data.push(data.alpha);
  //           this.state.chartConfig[0].data.labels.push(data.time.toString());
  //           this.chartrefs[0].current?.updateChart();
  //           this.state.chartConfig[1].data.datasets[0].data.push(data.x);
  //           this.state.chartConfig[1].data.labels.push(data.time.toString());
  //           this.chartrefs[1].current?.updateChart();
  //           this.state.chartConfig[2].data.datasets[0].data.push(data.psi);
  //           this.state.chartConfig[2].data.labels.push(data.time.toString());
  //           this.chartrefs[2].current?.updateChart();
  //           this.state.chartConfig[3].data.datasets[0].data.push(data.p);
  //           this.state.chartConfig[3].data.labels.push(data.time.toString());
  //           this.chartrefs[3].current?.updateChart();
  //         });
  //       },
  //     );
  //   });
  // }

  updateCharts() {
    this.chartrefs[0].current?.update();
    this.chartrefs[1].current?.update();
    this.chartrefs[2].current?.update();
    this.chartrefs[3].current?.update();
    this.setState({ newData: this.props.newdata });
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
    this.updateCharts();
  }

  async startSimulation() {
    await fetch('https://localhost:5001/WeatherForecast/startSimulation');
  }

  render() {
    console.log('controlPanel render called');
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <div className="row justify-content-center align-control-button">
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
                }}
              >
                rararararara
              </button>
            </div>
            <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => this.startSimulation()}
              >
                开始仿真
              </button>
            </div>
            <div className="row justify-content-center align-control-button">
              <button className="btn btn-primary" onClick={() => this.reset()}>
                暂停仿真
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-cols-2" style={{ margin: '0 auto' }}>
              {this.chartrefs.map((ref, ind) => {
                // console.log(ind) ;
                return (
                  <div className="col" key={ind}>
                    <ChartWithHook
                      data={this.state.chartConfig[ind].data}
                      type={this.state.chartConfig[ind].type}
                      options={this.state.chartConfig[ind].options}
                      ref={ref}
                    ></ChartWithHook>
                    {this.state.ra}
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
