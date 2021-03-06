// import lodash from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { ChartWithHook, ChartRef } from './ChartComponent';
import { ChartProps } from './types';
import Select from 'react-select';

const colors = [
  {
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgba(255, 99, 132, 0.2)',
  },
  {
    backgroundColor: 'rgb(135, 31, 219)',
    borderColor: 'rgba(135, 31, 219, 0.2)',
  },
  {
    backgroundColor: 'rgb(51, 22, 212)',
    borderColor: 'rgba(51, 22, 212, 0.2)',
  },
  {
    backgroundColor: 'rgb(14, 184, 14)',
    borderColor: 'rgba(14, 184, 14, 0.2)',
  },
  {
    backgroundColor: 'rgb(25, 205, 236)',
    borderColor: 'rgba(25, 205, 236, 0.2)',
  },
];

export const History = (props: any) => {
  // const [ra, setRa] = useState<number>(0);
  // const [checked, setChecked] = useState<boolean>(false);
  const mychart = useRef<ChartRef>(null);

  const temp = useRef<ChartProps>({
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
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
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '历史记录',
          // padding: {
          //   top: 10,
          //   bottom: 30,
          // },
          font: {
            size: 30,
          },
        },
      },
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [options, setOptions] = useState([
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]);
  // eslint-disable-next-line
  const [dataOption, setDataOption] = useState([
    { value: 'position_record', label: '位置记录' },
    { value: 'Vk_record', label: '空速记录' },
    { value: 'phi_record', label: '俯仰角记录' },
    { value: 'psi_record', label: '偏航角记录' },
    { value: 'theta_record', label: '滚转角记录' },
    { value: 'current_T_record', label: '推力记录' },
    // { value: 'time_record', label: 'time_record' },
  ]);
  const [dataItem, setDataitem] = useState<string>();

  const [selectedOptiont, setSelectOption] = useState<string[] | undefined>([
    options[0].value,
  ]);

  const loadDates = async () => {
    await fetch('https://localhost:5001/History/Edit')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setOptions(
          data.map((d: any) => {
            return { value: d, label: d };
          }),
        );
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadDates();
  }, []);

  const loadData = async () => {
    await fetch('https://localhost:5001/History/Create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataItem, selectedOptiont }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        temp.current.data.datasets = new Array(data.data.length);
        let dataLength = 0;
        data.data.forEach((d: any, ind: number) => {
          temp.current.data.datasets[ind] = {
            label: (selectedOptiont && selectedOptiont[ind]) || '',
            data: d,
            fill: false,
            backgroundColor: colors[ind].backgroundColor,
            borderColor: colors[ind].borderColor,
          };
          dataLength = dataLength > d.length ? dataLength : d.length;
        });
        temp.current.data.labels = new Array(dataLength)
          .fill(0)
          .map((le, ind) => (ind * 0.125).toString());
        mychart && mychart.current?.update();
      });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '80vh' }}>
        <ChartWithHook
          data={temp.current.data}
          type={temp.current.type}
          options={temp.current.options}
          ref={mychart}
        ></ChartWithHook>
      </div>
      <div
        className="row align-items-start fixed-bottom"
        style={{ margin: '1em 0.5em' }}
      >
        <Select
          options={options}
          onChange={(selectedOption) => {
            // console.log('rarara', selectedOption);
            setSelectOption(selectedOption.map((s) => s.value));
            console.log(selectedOptiont);
          }}
          isLoading={isLoading}
          className="col-5 mx-auto"
          isMulti
          menuPlacement="auto"
          placeholder="选择仿真时间"
        ></Select>
        <Select
          options={dataOption}
          onChange={(selectedOption) => {
            // console.log('rarara', selectedOption);
            setDataitem(selectedOption?.value);
            temp.current.options.plugins.title.text = selectedOption?.label;
          }}
          className="col-5 mx-auto"
          menuPlacement="auto"
          placeholder="选择变量"
        ></Select>
        <div className="col ">
          <button onClick={loadData} className="btn btn-primary">
            加载记录
          </button>
        </div>
      </div>
    </div>
  );
};
