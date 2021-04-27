import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
// import Chart from 'chart.js/auto';
import ChartComponent from './Components/ChartComponent';
import { ChartProps } from './Components/types';
import { ControlPanel } from './Components/ControlPanel';
import { Example, IndicatorProps } from './Components/Indicator';
import { History } from './Components/History';
import { SimulationControl } from './Components/SimulationControl';
import { Initialization } from './Components/Initialization';
import { SimulationConfig } from './Components/SimulationConfig';
import { FailureDetection } from './Components/FailureDetection';

interface MyState {
  ra: number;
  chartConfig: ChartProps;
  indicator: IndicatorProps;
}
export default class App extends React.Component<any, MyState> {
  ref: React.RefObject<ChartComponent>;
  // r: Props;
  constructor(props: any) {
    super(props);
    // this.r = ;
    this.state = {
      ra: 0,
      chartConfig: {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: '# of Votes',
              data: [],
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
          // },
          responsive: true,
          animation: false,
          legend: false,
        },
      },
      indicator: {
        data: {
          heading: Math.random() * 360,
          speed: Math.random() * 160,
          altitude: Math.random() * 28000,
          pressure: 1000 + Math.random() * 50,
          roll: (Math.random() - 0.5) * 120,
          pitch: (Math.random() - 0.5) * 40,
          turn: (Math.random() - 0.5) * 120,
          vario: (Math.random() - 0.5) * 4000,
        },
      },
    };
    this.ref = React.createRef<ChartComponent>();
  }

  componentDidMount() {
    console.log('this.componentDidMount');
  }

  Clicked = () => {
    console.log('clicked triggered', this.state.chartConfig);

    this.setState(null, () => {
      console.log(this.state.chartConfig);
      this.state.chartConfig.data.datasets[0].data.push(1);
      this.state.chartConfig.data.labels.push('0');
      this.ref.current?.updateChart();
    });
    this.setState((prev, prop) => ({
      ra: prev.ra + 1,
    })); // this.state.ra = 0;
    this.setState({
      indicator: {
        data: {
          heading: Math.random() * 360,
          speed: Math.random() * 160,
          altitude: Math.random() * 28000,
          pressure: 1000 + Math.random() * 50,
          roll: (Math.random() - 0.5) * 120,
          pitch: (Math.random() - 0.5) * 40,
          turn: (Math.random() - 0.5) * 120,
          vario: (Math.random() - 0.5) * 4000,
        },
      },
    });

    // console.log(ref.current.current);
    // 如何触发重绘
  };

  render() {
    return (
      <BrowserRouter>
        <div
          className="App"
          // style={{ display: 'flex', flexDirection: 'column' }}
        >
          <header></header>
          <Header></Header>
          {/*  className="App-header"><img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React {this.state.ra}
            </a> */}

          {/*<div style={{ visibility: 'hidden' }}>
            <ChartComponent
              data={this.state.chartConfig.data}
              type={this.state.chartConfig.type}
              options={this.state.chartConfig.options}
              ref={this.ref}
            ></ChartComponent>
          </div> */}
          <Routes>
            <Route path="" element={<SimulationControl />} />
            <Route path="history" element={<History />} />
            <Route path="init" element={<Initialization />} />
            <Route path="config" element={<SimulationConfig />} />
            <Route path="failure" element={<FailureDetection />} />
          </Routes>
          {/* <div>
            <ControlPanel></ControlPanel>
          </div>
          <div>
            <Example data={this.state.indicator.data}></Example>
            <button onClick={this.Clicked}>rarara</button>
          </div> */}
          {/* <SimulationControl></SimulationControl> */}
        </div>
      </BrowserRouter>
    );
  }
}
