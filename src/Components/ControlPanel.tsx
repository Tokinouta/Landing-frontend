import React from 'react';
import ChartComponent from './ChartComponent';
import { ChartProps } from './types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ControlPanel.css';
import _ from 'lodash';
interface MyState {
  chartConfig: ChartProps[];
  ra: number;
  simulationHub: HubConnection;
}

export class ControlPanel extends React.Component<any, MyState> {
  chartrefs: Array<React.RefObject<ChartComponent>>;

  constructor(props: any) {
    super(props);
    // this.r = ;
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
      chartConfig: [
        _.cloneDeep(temp),
        _.cloneDeep(temp),
        _.cloneDeep(temp),
        _.cloneDeep(temp),
      ],
      simulationHub: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/simulationHub')
        // .configureLogging(signalR.LogLevel.Information)
        .build(),
    };
    this.chartrefs = [
      React.createRef<ChartComponent>(),
      React.createRef<ChartComponent>(),
      React.createRef<ChartComponent>(),
      React.createRef<ChartComponent>(),
    ];
    // new Array(4).fill(React.createRef<ChartComponent>());
    // this.state.chartConfig = this.state.chartConfig.map(() =>
    //   _.cloneDeep(temp),
    // );
    console.log(
      // this.state.chartConfig,
      this.state.chartConfig[1].data === this.state.chartConfig[0].data,
      this.state.chartConfig[2].data === this.state.chartConfig[0].data,
      this.state.chartConfig[3].data === this.state.chartConfig[0].data,
    );
  }

  componentDidMount() {
    // const hubConnection =
    this.setState({}, () => {
      this.state.simulationHub
        .start()
        .then(() => console.log('Connection started!'))
        .catch((err) => console.log('Error while establishing connection :('));

      this.state.simulationHub.on('SendSimulationData', (user, data) => {
        console.log(data);
        // console.log(this.state.values);
        this.setState(null, () => {
          this.state.chartConfig[0].data.datasets[0].data.push(data);
          //values.shift();
          this.state.chartConfig[0].data.labels.push('0');
          this.chartrefs[0].current?.updateChart();

          // setTimeout(() => {
          // }, 2000);
        });
        setTimeout(() => {}, 500);
        // this.setState(this.state.chart.update());
        //       setTimeout(() => {
        //     // this.state.chart.update();
        // let p = new Promise((resolve, reject) => {
        //     // console.log(data);
        //     // // console.log(this.state.values);
        //     // this.state.values.push(data);
        //     // //values.shift();
        //     // this.state.labels.push(0);
        //     // // this.state.chart.update();
        //     setTimeout(() => {
        //         this.setState(this.state.chart.update())
        //     }, 100);
        // });
        // p.then(console.log("rarara"));
        // }, 100);
        // this.setState({ chart }, () => this.state.chart.update());
      });
    });
  }

  render() {
    return (
      <div className="row" style={{ height: '80vh' }}>
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
                    this.chartrefs[ind].current?.updateChart();
                    console.log(ind);
                  });
                  //
                });
              }}
            >
              rararararara
            </button>
          </div>
          <div className="row justify-content-center align-control-button">
            <button className="btn btn-primary">开始仿真</button>
          </div>
          <div className="row justify-content-center align-control-button">
            <button className="btn btn-primary">暂停仿真</button>
          </div>
        </div>
        <div className="col">
          <div className="row row-cols-2" style={{ margin: '0 auto' }}>
            {this.chartrefs.map((ref, ind) => {
              console.log(ind);
              return (
                <div className="col" key={ind}>
                  <ChartComponent
                    data={this.state.chartConfig[ind].data}
                    type={this.state.chartConfig[ind].type}
                    options={this.state.chartConfig[ind].options}
                    ref={ref}
                  ></ChartComponent>
                  {this.state.ra}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
