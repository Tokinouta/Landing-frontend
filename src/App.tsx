import React, { createRef, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { BrowserRouter } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Curves } from './Components/Curves';
import { ChartCom } from './Components/ChartComponent';
import { Props } from './Components/types';
// import { Curves } from './Components/Curves';

function App() {
  let dataIni = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        // label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        // fill: false,
        // backgroundColor: 'rgb(255, 99, 132)',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  let optionsIni = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  // let rr: Props = null;
  let [data, setData] = useState(dataIni);
  let [option, setOption] = useState(optionsIni);
  useEffect(() => {
    new Chart(document.getElementById('chart'), {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);
  let ref = createRef<typeof Curves>();
  const [ra, setRa] = useState<number>(0);

  let r: Props = {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const Clicked = () => {
    // let t = {
    //   ...data.current,
    //   datasets: [],
    //   labels: [],
    // };
    // console.log(Object.is(t, data.current));
    // data.current.datasets[0].data.push(0);
    // data.current.labels.push('0');
    setData((prev) => {
      prev.datasets[0].data.push(0);
      prev.labels.push('0');
      return prev;
    });
    setRa((prev) => prev + 1);
    console.log(r);
    r.data.datasets[0].data.push(0);
    r.data.labels.push('0');
    // console.log(ref.current.current);
    // 如何触发重绘
  };
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header></Header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React {ra}
          </a>
        </header>
        <canvas id="chart"></canvas>
        <button onClick={Clicked}>rarara</button>
        <ChartCom data={r.data} type={r.type} options={r.options}></ChartCom>
        {/* <Curves data={data} options={option} type="line" ref={ref}></Curves> */}
      </div>
    </BrowserRouter>
  );
}

interface MyState {
  ra: number;
  chartConfig: Props;
}
export class Ass extends React.Component<any, MyState> {
  ref: React.RefObject<ChartCom>;
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
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    };
    this.ref = React.createRef<ChartCom>();
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

    // console.log(ref.current.current);
    // 如何触发重绘
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Header></Header>
            <img src={logo} className="App-logo" alt="logo" />
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
            </a>
          </header>
          <canvas id="chart"></canvas>
          <button onClick={this.Clicked}>rarara</button>
          <ChartCom
            data={this.state.chartConfig.data}
            type={this.state.chartConfig.type}
            options={this.state.chartConfig.options}
            ref={this.ref}
          ></ChartCom>
          {/* <Curves data={data} options={option} type="line" ref={ref}></Curves> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
