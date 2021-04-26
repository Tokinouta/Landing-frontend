import React, { useState } from 'react';
import { ControlPanel } from './ControlPanel';
import { Example, IndicatorProps } from './Indicator';
import { ChartProps } from './types';

export const SimulationControl = () => {
  const [ra, setRa] = useState<number>(0);
  const [chartConfig, setChartConfig] = useState<ChartProps>({
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
  });
  const [indicator, setIndicator] = useState<IndicatorProps>({
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
  });

  const Clicked = () => {
    console.log('clicked triggered', chartConfig);
    setIndicator({
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
    });
    setRa(ra + 1);
    // this.setState(null, () => {
    //   console.log(this.state.chartConfig);
    //   this.state.chartConfig.data.datasets[0].data.push(1);
    //   this.state.chartConfig.data.labels.push('0');
    //   this.ref.current?.updateChart();
    // });
    // this.setState((prev, prop) => ({
    //   ra: prev.ra + 1,
    // })); // this.state.ra = 0;
    // this.setState({
    //   indicator: {
    //     data: {
    //       heading: Math.random() * 360,
    //       speed: Math.random() * 160,
    //       altitude: Math.random() * 28000,
    //       pressure: 1000 + Math.random() * 50,
    //       roll: (Math.random() - 0.5) * 120,
    //       pitch: (Math.random() - 0.5) * 40,
    //       turn: (Math.random() - 0.5) * 120,
    //       vario: (Math.random() - 0.5) * 4000,
    //     },
    //   },
    // });
  };

  return (
    <div>
      <div>
        <ControlPanel></ControlPanel>
      </div>
      <div>{ra}</div>
      <div>
        <Example data={indicator.data}></Example>
        <button onClick={Clicked}>rarara</button>
      </div>
    </div>
  );
};
