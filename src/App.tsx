import React, {
  createContext,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChartProps } from './Components/types';
import { IndicatorProps } from './Components/Indicator';
import { History } from './Components/History';
import { SimulationControl } from './Components/SimulationControl';
import { Initialization } from './Components/Initialization';
import { SimulationConfig } from './Components/SimulationConfig';
import { FailureDetection } from './Components/FailureDetection';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import lodash from 'lodash';
import { DataToPlot } from './Components/DataToPlot';
import { ControlPanelRef } from './Components/ControlPanelHook';

interface simContext {
  indicator: IndicatorProps;
  chartConfig: ChartProps[];
  isSimulating: boolean;
  controlComponentRef: React.RefObject<ControlPanelRef>;
  toggleIsSimulating: () => void;
}

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
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: false,
  },
};
export const simulationContext = createContext<simContext>({
  indicator: {
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
  },
  chartConfig: [temp],
  isSimulating: false,
  controlComponentRef: createRef<ControlPanelRef>(),
  toggleIsSimulating: () => {},
});
const METERPS_TO_FEETPMIN = 196.8504;
const METERPS_TO_KNOT = 1.943844;

const App = () => {
  const [simulationHub, setSimulationHub] = useState<HubConnection>(
    new HubConnectionBuilder()
      .withUrl('https://localhost:5001/simulationHub')
      .withAutomaticReconnect()
      .build(),
  );
  const isSimulating = useRef<boolean>(false);
  const [simContext, setSimContext] = useState<simContext>({
    indicator: {
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
    },
    chartConfig: [
      lodash.cloneDeep(temp),
      lodash.cloneDeep(temp),
      lodash.cloneDeep(temp),
      lodash.cloneDeep(temp),
    ],
    isSimulating: false,
    controlComponentRef: createRef<ControlPanelRef>(),
    toggleIsSimulating: () => {
      console.log('toggle called' + isSimulating.current);
      toggle();
    },
  });

  const toggle = () => {
    isSimulating.current = !isSimulating.current;
  };

  useEffect(() => {
    console.log('this.componentDidMount');
    if (simulationHub.state !== HubConnectionState.Connected) {
      simulationHub
        .start()
        .then(() => {
          simContext.controlComponentRef.current?.setConnectionReady();
          console.log('Connection started!');
          simContext.chartConfig[0].data.datasets[0].label = 'alpha';
          simContext.chartConfig[1].data.datasets[0].label = 'x';
          simContext.chartConfig[2].data.datasets[0].label = 'psi';
          simContext.chartConfig[3].data.datasets[0].label = 'p';
          simContext.controlComponentRef?.current?.updateCharts();
          simContext.controlComponentRef?.current?.setDataDisplay({
            data: {
              heading: 0,
              speed: 0,
              altitude: 0,
              roll: 0,
              pitch: 0,
              vario: 0,
            },
          });

          simulationHub.on('SendSimulationData', (user, data: DataToPlot) => {
            console.log(data);
            simContext.chartConfig[0].data.datasets[0].data.push(data.alpha);
            simContext.chartConfig[0].data.labels.push(data.time.toFixed(3));
            simContext.chartConfig[1].data.datasets[0].data.push(data.x);
            simContext.chartConfig[1].data.labels.push(data.time.toFixed(3));
            simContext.chartConfig[2].data.datasets[0].data.push(data.psi);
            simContext.chartConfig[2].data.labels.push(data.time.toFixed(3));
            simContext.chartConfig[3].data.datasets[0].data.push(data.p);
            simContext.chartConfig[3].data.labels.push(data.time.toFixed(3));
            simContext.controlComponentRef?.current?.updateCharts();
            simContext.indicator.data = {
              heading: (data.chi / Math.PI) * 180,
              speed: data.vk * METERPS_TO_KNOT,
              altitude: -data.z,
              roll: (data.miu / Math.PI) * 180,
              pitch: (data.gamma / Math.PI) * 180,
              vario: data.vk * Math.sin(data.gamma) * METERPS_TO_FEETPMIN,
            };
            simContext.controlComponentRef?.current?.setDataDisplay({
              data: {
                heading: (data.chi / Math.PI) * 180,
                speed: data.vk,
                altitude: -data.z,
                roll: (data.miu / Math.PI) * 180,
                pitch: (data.gamma / Math.PI) * 180,
                vario: data.vk * Math.sin(data.gamma),
              },
            });
          });
        })
        .catch((err) =>
          console.log('Error while establishing connection :(', err),
        );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('app useeffect');
  });

  return (
    <simulationContext.Provider
      value={{ ...simContext, isSimulating: isSimulating.current }}
    >
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path="" element={<SimulationControl />} />
            <Route path="history" element={<History />} />
            <Route path="init" element={<Initialization />} />
            <Route path="config" element={<SimulationConfig />} />
            <Route path="failure" element={<FailureDetection />} />
          </Routes>
          <button onClick={() => console.log(simContext.isSimulating)}>
            rara
          </button>
        </div>
      </BrowserRouter>
    </simulationContext.Provider>
  );
};

export default App;
