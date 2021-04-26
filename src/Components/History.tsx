// import lodash from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import ChartComponent, { ChartWithHook, Ref } from './ChartComponent';
import { ChartProps } from './types';
import Select from 'react-select';
import Switch from 'react-switch';

export const History = (props: any) => {
  const [ra, setRa] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const chartrefs = React.createRef<ChartComponent>();
  //   const [scrollPosition, setScrollPosition] = useState<number>(0);
  //   const scrollY = useRef<number>(window.scrollY);
  //   const handleScroll = () => {
  //     const position = window.pageYOffset;
  //     console.log('position: ', position);
  //     setScrollPosition(() => {
  //       //   window.scrollTo(0, position);
  //       return position;
  //     });
  //     scrollY.current = position;
  //   };

  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll, { passive: true });
  //     console.log('inside useeffect', scrollY.current);
  //     // window.scrollTo(0, );
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     console.log(
  //       'inside useEffect, ref scrollY: ',
  //       scrollY.current,
  //       'scrollPosition: ',
  //       scrollPosition,
  //     );
  //     window.scrollTo(0, scrollPosition);
  //   }, [scrollPosition]);
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
      {/* <div>Lorem ipsum dolor</div>
      <div>b</div> */}
      {/* <div className="row">
        <div className="col">
          <button>选择变量</button>
        </div>
        <div className="col">
          <button>选择变量</button>
        </div>
        <div className="col">
          <button>选择变量</button>
        </div>
      </div>
      <div>rarara</div> */}
      {/* <ChartComponent
        data={temp.current.data}
        type={temp.current.type}
        options={temp.current.options}
        ref={chartrefs}
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
      <button
        onClick={(e) => {
          e.preventDefault();
          setRa(ra + 1);
          //   console.log(window.pageYOffset);
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
