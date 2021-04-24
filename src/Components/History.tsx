// import lodash from 'lodash';
import React, { useRef, useState } from 'react';
import { ChartWithHook, Ref } from './ChartComponent';
import { ChartProps } from './types';

export const History = (props: any) => {
  const [ra, setRa] = useState<number>(0);
  //   const chartConfig = useRef<ChartProps>({
  //     type: 'line',
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [],
  //           fill: false,
  //           backgroundColor: 'rgb(255, 99, 132)',
  //           borderColor: 'rgba(255, 99, 132, 0.2)',
  //         },
  //       ],
  //     },
  //     options: {
  //       // scales: {
  //       //   y: {
  //       //     beginAtZero: true,
  //       //   },
  //       // },
  //       responsive: true,
  //       animation: false,
  //       legend: false,
  //     },
  //   });
  //   const historyChart = React.createRef<ChartComponent>();
  const mychart = useRef<Ref>(null);

  const temp = useRef<ChartProps>({
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
      responsive: true,
      animation: false,
      legend: false,
    },
  });

  return (
    <div>
      <div>rarara</div>
      {/* <ChartComponent
        data={chartConfig.current.data}
        type={chartConfig.current.type}
        options={chartConfig.current.options}
        ref={historyChart}
      ></ChartComponent> */}
      <button
        onClick={() => {
          temp.current.data.datasets[0].data.push(Math.random());
          temp.current.data.labels.push('0');
          mychart && mychart.current?.update();
          //   console.log(mychart, temp.current.data);
          //   setra
        }}
      >
        rararararararaar
      </button>
      <button onClick={() => setRa(ra + 1)}>rarara</button>
      <div>{ra}</div>
      <ChartWithHook
        data={temp.current.data}
        type={temp.current.type}
        options={temp.current.options}
        ref={mychart}
      ></ChartWithHook>
    </div>
  );
};
