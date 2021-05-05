import React, { createRef, useEffect, useState } from 'react';
import { ControlPanel } from './ControlPanel';
import { Example, IndicatorProps } from './Indicator';
import { ChartProps, ChartPropsArray } from './types';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { DataToPlot } from './DataToPlot';
import lodash from 'lodash';

export const SimulationControl = () => {
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
      // maintainAspectRatio: false,
      animation: false,
      legend: false,
    },
  };
  const [simulationHub, setSimulationHub] = useState<HubConnection>(
    new HubConnectionBuilder()
      .withUrl('https://localhost:5001/simulationHub')
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.Information)
      .build(),
  );
  const [ra, setRa] = useState<number>(0);
  // const [chartConfig, setChartConfig] = useState<ChartProps>({
  //   type: 'line',
  //   data: {
  //     labels: [],
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: [],
  //         fill: false,
  //         backgroundColor: 'rgb(255, 99, 132)',
  //         borderColor: 'rgba(255, 99, 132, 0.2)',
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     animation: false,
  //     legend: false,
  //   },
  // });
  const [indicator, setIndicator] = useState<IndicatorProps>({
    data: {
      heading: 0,
      speed: 0,
      altitude: 0,
      pressure: 1013,
      roll: 0,
      pitch: 0,
      turn: 0,
      vario: 0,
    },
  });
  const [chartConfig, setChartConfig] = useState<ChartProps[]>([
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
  ]);

  const controlComponentRef = createRef<ControlPanel>();

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
    // setRa(ra + 1);
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
    // });}
  };

  useEffect(() => {
    // console.log(this.state.chartConfig);
    if (simulationHub.state !== HubConnectionState.Connected) {
      simulationHub
        .start()
        .then(() => {
          console.log('Connection started!');
          simulationHub.on('SendSimulationData', (user, data: DataToPlot) => {
            console.log(data);

            // setIndicator({
            //   data: {
            //     heading: Math.random() * 360,
            //     speed: Math.random() * 160,
            //     altitude: Math.random() * 28000,
            //     pressure: 1000 + Math.random() * 50,
            //     roll: (Math.random() - 0.5) * 120,
            //     pitch: (Math.random() - 0.5) * 40,
            //     turn: (Math.random() - 0.5) * 120,
            //     vario: (Math.random() - 0.5) * 4000,
            //   },
            // });
            chartConfig[0].data.datasets[0].data.push(data.alpha);
            chartConfig[0].data.labels.push(data.time.toString());
            chartConfig[1].data.datasets[0].data.push(data.x);
            chartConfig[1].data.labels.push(data.time.toString());
            chartConfig[2].data.datasets[0].data.push(data.psi);
            chartConfig[2].data.labels.push(data.time.toString());
            chartConfig[3].data.datasets[0].data.push(data.p);
            chartConfig[3].data.labels.push(data.time.toString());
            // console.log(chartConfig[0].data.datasets[0].data);
            controlComponentRef?.current?.updateCharts();
            indicator.data = {
              heading: data.chi * 360,
              speed: data.vk * 160,
              altitude: -data.z,
              pressure: 1013,
              roll: data.miu * 120,
              pitch: data.gamma * 40,
              turn: 0,
              vario: data.vk * Math.sin(data.gamma),
            };
            // setIndicator((r) => {
            //   console.log(r);
            //   controlComponentRef?.current?.updateCharts();
            //   return {
            //     data: {
            //       heading: data.chi * 360,
            //       speed: data.vk * 160,
            //       altitude: -data.z,
            //       pressure: 1013,
            //       roll: data.miu * 120,
            //       pitch: data.gamma * 40,
            //       turn: 0,
            //       vario: data.vk * Math.sin(data.gamma),
            //     },
            //   };
            // }); //  setRa((r) => {
            //   console.log('setRa called', ra);
            //   return ra + 1;
            // });
          });
        })
        .catch((err) =>
          console.log('Error while establishing connection :(', err),
        );
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  // simulationHub.on('SendSimulationData', () => {
  //   setRa(ra + 1);
  // });
  // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   setInterval(() =>, 1000);
  // });

  return (
    <div>
      <div>
        <ControlPanel
          chartProps={chartConfig}
          newdata={indicator}
          ref={controlComponentRef}
        ></ControlPanel>
      </div>
      <div>{ra}</div>
      <div>
        {/* <Example data={indicator.data}></Example> */}
        {/* <div>{JSON.stringify(indicator.data)}</div> */}
        <button onClick={Clicked}>rarara</button>
      </div>
    </div>
  );
};
