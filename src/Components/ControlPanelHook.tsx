import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ChartRef, ChartWithHook } from './ChartComponent';
import { ChartProps, ChartPropsArray } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ControlPanel.css';
import { Example, IndicatorProps } from './Indicator';
import { simulationContext } from '../App';

interface MyState {
  chartConfig: ChartProps[];
  ra: number;
  newData: IndicatorProps;
  dataDisplay: IndicatorProps;
  isStartDisabled: boolean;
  isResetDisabled: boolean;
  simulationState: string;
}

export interface ControlPanelRef {
  updateCharts: () => void;
  setConnectionReady: () => void;
  setDataDisplay: (data: IndicatorProps) => void;
}

export const ControlPanel = forwardRef<ControlPanelRef, ChartPropsArray>(
  (props, refs) => {
    const cont = useContext(simulationContext);
    const [chartConfig, setChartConfig] = useState<ChartProps[]>(
      props.chartProps,
    );
    const [newData, setNewData] = useState<IndicatorProps>(props.newdata);
    const [dataDiaplay, setDataDisplay] = useState<IndicatorProps>({
      data: {
        heading: 0,
        speed: 0,
        altitude: 0,
        roll: 0,
        pitch: 0,
        vario: 0,
      },
    });
    const [isStartDisabled, setIsStartDisabled] = useState<boolean>(true);
    const [isResetDisabled, setIsResetDisabled] = useState<boolean>(true);
    const [simulationState, setSimulationState] = useState<string>('已停止');
    const chartrefs = useRef<React.RefObject<ChartRef>[]>([
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
      React.createRef<ChartRef>(),
    ]);

    useEffect(() => {
      console.log('control panel mounted', props.isSimulating);
      cont.isSimulating ? setIsSimulating() : setIsNotSimulating();
    }, []);

    const setIsSimulating = () => {
      setIsResetDisabled(false);
      setIsStartDisabled(true);
      setSimulationState('仿真中');
    };

    const setIsNotSimulating = () => {
      setIsResetDisabled(true);
      setIsStartDisabled(false);
      setSimulationState('已停止');
    };

    useImperativeHandle(refs, () => ({
      updateCharts: () => {
        updateInternalCharts();
        setNewData(props.newdata);
      },
      setConnectionReady: () => {
        setIsStartDisabled(false);
      },
      setDataDisplay: (data: IndicatorProps) => {
        setDataDisplay(data);
      },
    }));

    const updateInternalCharts = () => {
      chartrefs.current[0]?.current?.update();
      chartrefs.current[1]?.current?.update();
      chartrefs.current[2]?.current?.update();
      chartrefs.current[3]?.current?.update();
    };

    // const setConnectionReady = ;

    // const setDataDisplay1 = ;

    const reset = async () => {
      await fetch('https://localhost:5001/WeatherForecast/reset');
      chartConfig[0].data.datasets[0].data = [];
      chartConfig[0].data.labels = [];
      chartConfig[1].data.datasets[0].data = [];
      chartConfig[1].data.labels = [];
      chartConfig[2].data.datasets[0].data = [];
      chartConfig[2].data.labels = [];
      chartConfig[3].data.datasets[0].data = [];
      chartConfig[3].data.labels = [];
      updateInternalCharts();
      setIsNotSimulating();
      //   cont.toggleIsSimulating();
      cont.isSimulating = false;
      setNewData({
        data: {
          heading: 0,
          speed: 0,
          altitude: 0,
          roll: 0,
          pitch: 0,
          vario: 0,
        },
      });
      setDataDisplay({
        data: {
          heading: 0,
          speed: 0,
          altitude: 0,
          roll: 0,
          pitch: 0,
          vario: 0,
        },
      });
    };

    const startSimulation = async () => {
      setIsSimulating();
      //   cont.toggleIsSimulating();
      cont.isSimulating = true;
      await fetch('https://localhost:5001/WeatherForecast/startSimulation');
    };

    return (
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col-3">
            <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => startSimulation()}
                disabled={isStartDisabled}
              >
                开始仿真
              </button>
            </div>
            <div className="row justify-content-center align-control-button">
              <button
                className="btn btn-primary"
                onClick={() => reset()}
                disabled={isResetDisabled}
              >
                停止仿真
              </button>
            </div>

            <div className="row justify-content-center align-control-button">
              仿真状态：{simulationState}
            </div>
          </div>
          <div className="col">
            <div
              className="row row-cols-2"
              style={{ margin: '0 auto', height: '42vh' }}
            >
              {chartrefs.current.map((ref, ind) => {
                return (
                  <div className="col" key={ind} style={{ height: '100%' }}>
                    <ChartWithHook
                      data={chartConfig[ind].data}
                      type={chartConfig[ind].type}
                      options={chartConfig[ind].options}
                      ref={ref}
                    ></ChartWithHook>
                    {/* {this.state.ra} */}
                  </div>
                );
              })}
            </div>
            {/* <div>{JSON.stringify(this.state.newData.data)}</div> */}
          </div>
          <div className="col">
            <Example data={newData.data} size={'100%'} />
            <div className="row row-col-4">
              <div className="col-6">高度</div>
              <div className="col-6">{newData.data.altitude}</div>
              <div className="col-6">航向</div>
              <div className="col-6">{newData.data.heading}</div>
              <div className="col-6">俯仰</div>
              <div className="col-6">{newData.data.pitch}</div>
              <div className="col-6">滚转</div>
              <div className="col-6">{newData.data.roll}</div>
              <div className="col-6">空速</div>
              <div className="col-6">{newData.data.speed}</div>
              <div className="col-6">垂直速度</div>
              <div className="col-6">{newData.data.vario}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
