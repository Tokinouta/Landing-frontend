// import lodash from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import ChartComponent, { ChartWithHook, ChartRef } from './ChartComponent';
import { ChartProps } from './types';
import Select from 'react-select';
import Switch from 'react-switch';

export const History = (props: any) => {
  const [ra, setRa] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const mychart = useRef<ChartRef>(null);

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

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div>
      <div>{ra}</div>
      <ChartWithHook
        data={temp.current.data}
        type={temp.current.type}
        options={temp.current.options}
        ref={mychart}
      ></ChartWithHook>
      <button
        onClick={() => {
          temp.current.data.datasets[0].data.push(Math.random());
          temp.current.data.labels.push('0');
          mychart && mychart.current?.update();
        }}
      >
        rararararararaar
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setRa(ra + 1);
        }}
      >
        rarara
      </button>
      <div>{ra}</div>
      <div className="container">
        <div className="row">
          <Select
            options={options}
            onChange={(selectedOption) => console.log('rarara', selectedOption)}
            className="col-6 mx-auto"
          ></Select>
          <div className="align-self-end">
            <button>load</button>
          </div>
        </div>
        <div>
          <Switch
            onChange={(c) => {
              setChecked(c);
            }}
            checked={checked}
          ></Switch>
        </div>
      </div>
    </div>
  );
};
