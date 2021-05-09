import React, { createRef, useEffect, useState } from 'react';
import { ControlPanel } from './ControlPanel';
import { IndicatorProps } from './Indicator';
import { ChartProps } from './types';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [simulationHub, setSimulationHub] = useState<HubConnection>(
    new HubConnectionBuilder()
      .withUrl('https://localhost:5001/simulationHub')
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.Information)
      .build(),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ra, setRa] = useState<number>(0);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chartConfig, setChartConfig] = useState<ChartProps[]>([
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
    lodash.cloneDeep(temp),
  ]);
  const [isReady, setIsReady] = useState<boolean>(false);
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
  };

  useEffect(() => {
    if (simulationHub.state !== HubConnectionState.Connected) {
      simulationHub
        .start()
        .then(() => {
          controlComponentRef.current?.setConnectionReady();
          console.log('Connection started!');
          chartConfig[0].data.datasets[0].label = 'alpha';
          chartConfig[1].data.datasets[0].label = 'x';
          chartConfig[2].data.datasets[0].label = 'psi';
          chartConfig[3].data.datasets[0].label = 'p';
          controlComponentRef?.current?.updateCharts();

          simulationHub.on('SendSimulationData', (user, data: DataToPlot) => {
            console.log(data);
            chartConfig[0].data.datasets[0].data.push(data.alpha);
            chartConfig[0].data.labels.push(data.time.toString());
            chartConfig[1].data.datasets[0].data.push(data.x);
            chartConfig[1].data.labels.push(data.time.toString());
            chartConfig[2].data.datasets[0].data.push(data.psi);
            chartConfig[2].data.labels.push(data.time.toString());
            chartConfig[3].data.datasets[0].data.push(data.p);
            chartConfig[3].data.labels.push(data.time.toString());
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
          });
        })
        .catch((err) =>
          console.log('Error while establishing connection :(', err),
        );
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (simulationHub.state === HubConnectionState.Connected) {
  //     console.log('called');
  //     setIsReady(true);
  //   }
  // }, [simulationHub.state]);

  return (
    <div>
      <div>
        <ControlPanel
          chartProps={chartConfig}
          newdata={indicator}
          isConnectionReady={isReady}
          ref={controlComponentRef}
        ></ControlPanel>
      </div>
      <div>{ra}</div>
      <div>
        <button onClick={Clicked}>rarara</button>
      </div>
    </div>
  );
};
