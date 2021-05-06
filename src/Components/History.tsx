// import lodash from 'lodash';
import React, { useRef, useState } from 'react';
import { ChartWithHook, ChartRef } from './ChartComponent';
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

  const [options, setOptions] = useState([
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]);
  const [selectedOptiont, setSelectOption] = useState<string | undefined>(
    options[0].value,
  );

  const loadDates = async () => {
    await fetch('https://localhost:5001/History/Edit')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOptions(
          data.map((d: any) => {
            return { value: d, label: d };
          }),
        );
      });
  };

  const loadData = async () => {
    await fetch('https://localhost:5001/History/Create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([selectedOptiont]),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, data.data[0]);
        temp.current.data.datasets[0].data = data.data[0];
        temp.current.data.labels = new Array(
          temp.current.data.datasets[0].data.length,
        ).fill('0');
        mychart && mychart.current?.update();
      });
  };

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
        onClick={async () => {
          const result = await fetch('https://localhost:5001/History/Index');
          const data = await result.json();
          console.log(data);
          temp.current.data.datasets[0].data = data;
          temp.current.data.labels = new Array(
            temp.current.data.datasets[0].data.length,
          ).fill('0');
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
            onChange={(selectedOption) => {
              console.log('rarara', selectedOption);
              setSelectOption(selectedOption?.value);
              console.log(selectedOptiont);
            }}
            className="col-6 mx-auto"
          ></Select>
          <div className="align-self-end">
            <button onClick={loadData}>load</button>
          </div>
        </div>
        <div>
          <Switch
            onChange={(c) => {
              setChecked(c);
              console.log(checked);
            }}
            checked={checked}
          ></Switch>
          <button onClick={loadDates}>rarararar</button>
        </div>
      </div>
    </div>
  );
};
