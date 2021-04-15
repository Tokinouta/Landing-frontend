import React from 'react';
import ChartComponent from './ChartComponent';
import { Props } from './types';

interface MyState {
  chartConfig: Props[];
  ra: number;
}

export class ControlPanel extends React.Component<any, MyState> {
  chartrefs: Array<React.RefObject<ChartComponent>>;
  // r: Props;
  constructor(props: any) {
    super(props);
    // this.r = ;
    let temp = {
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
        // },[temp, temp]
        responsive: true,
        animation: false,
        legend: false,
      },
    };

    this.state = {
      ra: 0,
      chartConfig: new Array(4).fill(temp),
    };
    this.chartrefs = new Array(4).fill(React.createRef<ChartComponent>());
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState((prev, prop) => ({
              ra: prev.ra + 1,
            }));
          }}
        >
          rararararara
        </button>
        {this.chartrefs.map((ref, ind) => {
          return (
            <div>
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
    );
  }
}
