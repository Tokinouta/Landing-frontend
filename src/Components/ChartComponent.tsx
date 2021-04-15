import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  forwardRef,
  useReducer,
} from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';

import Chart from 'chart.js/auto';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';
// import { Chart, Chart } from 'chart.js';
// import { Chart } from 'chart.js';

const ChartComponent = forwardRef<Chart | undefined, Props>((props, ref) => {
  const {
    id,
    height = 150,
    width = 300,
    redraw = false,
    type,
    data,
    options = {},
    plugins = [],
  } = props;

  const canvas = useRef<HTMLCanvasElement | null>(null);

  const computedData = useMemo<Chart.ChartData>(() => data, [data]);
  //   const computedData = Object.assign({}, data);
  console.log(Object.is(computedData, data));
  let [chart, setChart] = useState<Chart>();
  //   const charti :Chart = null;
  const [charti, dispacher] = useReducer(
    (state: Chart, action: { type: string }) => {
      switch (action.type) {
        case 'create':
          console.log('before create', state);
          if (!state) {
            state = new Chart(canvas.current, {
              type,
              data: computedData,
              options,
              plugins,
            });
          }
          console.log('after create', state);
          return state;
        case 'update':
          console.log('before update', state);
          if (!state) return;
          else {
            state.update();
            console.log('chart updated');
            return { ...state };
            // return state;
          }
        case 'destroy':
          console.log('started destroying');
          console.log(state);
          if (state) state.destroy();
          return;
        default:
          throw new Error();
      }
      //   return state.update();
    },
    null,
  );
  // new Chart(canvas.current, {
  //   type,
  //   data: computedData,
  //   options,
  //   plugins,
  // }),
  //   let chart = useRef<Chart | null>(null);
  let [ra, setRa] = useState<number>(0);
  useImperativeHandle<Chart | undefined, Chart | undefined>(ref, () => chart, [
    chart,
  ]);

  const renderChart = useCallback(() => {
    if (!canvas.current) return;

    setChart((prev: Chart | null | undefined) => {
      console.log(prev);
      if (prev) return;
      prev = new Chart(canvas.current, {
        type,
        data: computedData,
        options,
        plugins,
      });
      return prev;
    });
    console.log(chart);
    // setChart(temp);
    // console.log(Object.is(temp, chart));
    console.log('chart set');
  }, [chart, computedData, options, plugins, type]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chart) return;

    const { getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } = props;

    getDatasetAtEvent && getDatasetAtEvent(chart.getDatasetAtEvent(e), e);
    getElementAtEvent && getElementAtEvent(chart.getElementAtEvent(e), e);
    getElementsAtEvent && getElementsAtEvent(chart.getElementsAtEvent(e), e);
  };

  const updateChart = useCallback(() => {
    setChart((prev: Chart) => {
      if (!chart) return;

      if (options) {
        chart.options = options;
      }

      if (!chart.config.data) {
        chart.config.data = computedData;
        chart.update();
        return;
      }

      chart.config.dataset = computedData;
      // const { datasets: newDataSets = [], ...newChartData } = computedData;
      // const { datasets: currentDataSets = [] } = chart.config.data;

      // copy values
      // assign(chart.config.data, newChartData);
      // chart.config.datasets
      // chart.config.data.datasets = newDataSets.map(
      //   (newDataSet: { label: any; type: any; data: string | any[] }) => {
      //     // given the new set, find it's current match
      //     console.log(newDataSet);
      //     const currentDataSet = find(
      //       currentDataSets,
      //       (d: { label: any; type: any }) =>
      //         d.label === newDataSet.label && d.type === newDataSet.type,
      //     );

      //     // There is no original to update, so simply add new one
      //     if (!currentDataSet || !newDataSet.data) return newDataSet;

      //     console.log(currentDataSet);
      //     if (!currentDataSet.data) {
      //       currentDataSet.data = [];
      //     }
      //     // } else {
      //     //   console.log(newDataSet.data.length);
      //     //   currentDataSet.data.splice(newDataSet.data.length - 1);
      //     // }

      //     // copy in values
      //     assign(currentDataSet.data, newDataSet.data);

      //     // apply dataset changes, but keep copied data
      //     const obj = {
      //       ...currentDataSet,
      //       ...newDataSet,
      //       data: currentDataSet.data,
      //     };
      //     console.log(obj);
      //     return obj;
      //   },
      // );
      console.log(chart.config.data.datasets);
      console.log(chart.data);
      chart.update();
      console.log('chart updated');
    });
  }, [chart, computedData, options]);

  const destroyChart = useCallback(() => {
    console.log('destroy called');
    console.log(chart);
    // if (chart) {
    //   }
    setChart((prev: Chart) => {
      console.log('started destroying');
      console.log(prev);
      if (prev) prev.destroy();
      return prev;
    });
  }, [chart]);

  useEffect(() => {
    console.log('first useEffect');
    // renderChart();
    dispacher({ type: 'create' });
    console.log(charti);
    return () => {
      //   destroyChart();
      dispacher({ type: 'destroy' });
      console.log('destroyed');
    };
  }, []);

  useEffect(() => {
    console.log('second useEffect');
    if (redraw) {
      //   destroyChart();
      //   renderChart();
      dispacher({ type: 'destroy' });
      dispacher({ type: 'create' });
      console.log('redrew');
    } else {
      //   updateChart();
      console.log('ready to dispatch');
      dispacher({ type: 'update' });
      console.log('ra');
      //   setRa(1);
      //   if (!chart) return;

      //   if (options) {
      //     chart.options = options;
      //   }

      //   if (!chart.config.data) {
      //     chart.config.data = computedData;
      //     chart.update();
      //     return;
      //   }

      //   chart.config.dataset = computedData;

      //   console.log(chart.config.data.datasets);
      //   console.log(chart.data);
      //   chart.update();
      //   console.log('chart updated');
      //   console.log('updated');
    }
  });

  return (
    <canvas
      height={height}
      width={width}
      ref={canvas}
      id={id}
      onClick={onClick}
      data-testid="canvas"
    />
  );
});

export class ChartCom extends React.Component<Props, any, any> {
  chartCanvas: React.RefObject<HTMLCanvasElement>;
  chart: Chart;
  config: Props | null;
  constructor(props: Props) {
    super(props);
    this.chartCanvas = React.createRef();
    this.chart = null;
    this.config = null;
  }

  componentDidMount() {
    //   this.props.
    let configc = { ...this.props };

    if (!this.chart) {
      this.chart = new Chart(this.chartCanvas.current, configc);
    }
    console.log(this.chart);
    console.log('finished initializing');
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      console.log('destroyed', this.chart);
      console.log('destroyed');
    }
  }
  updateChart() {
    if (this.chart) {
      console.log('start to update chart');
      //   console.log(this.chart, prev);
      //   let configc = { ...this.props };
      //   this.chart.config = prev;
      this.chart.update('show');
      //   this.chart.update('show');
      //   this.chart.update('show');
      console.log('finished updating chart');
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartCanvas}></canvas>
      </div>
    );
  }
}

export default ChartComponent;
