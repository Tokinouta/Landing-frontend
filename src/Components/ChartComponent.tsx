import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ChartProps } from './types';
import Chart from 'chart.js/auto';
import lodash from 'lodash';
export default class ChartComponent extends React.Component<
  ChartProps,
  any,
  any
> {
  chartCanvas: React.RefObject<HTMLCanvasElement>;
  chart: Chart;
  config: ChartProps | null;
  constructor(props: ChartProps) {
    super(props);
    this.chartCanvas = React.createRef();
    this.chart = null;
    this.config = null;
  }

  componentDidMount() {
    let configc = { ...this.props };
    if (!this.chart) {
      this.chart = new Chart(this.chartCanvas.current, configc);
    }
    // console.log(this.chart);
    // console.log('finished initializing');
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      //   console.log('destroyed', this.chart);
      //   console.log('destroyed');
    }
  }
  updateChart() {
    if (this.chart) {
      //   console.log('start to update chart');
      this.chart.update('show');
      //   console.log('finished updating chart');
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

// IMPORTANT: MUST USE WITHIN A <div>
export const ChartWithHook = forwardRef<ChartRef, ChartProps>((props, ref) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart>(null);

  useEffect(() => {
    // console.log('useEffectCalled', chartInstance, Date.now().toString());
    if (!chartInstance || !chartInstance.ctx) {
      if (chartContainer && chartContainer.current) {
        // console.log('inside 2 ifs', Date.now().toString());
        const newChartInstance: Chart = new Chart(
          chartContainer.current,
          lodash.clone(props),
        );
        setChartInstance(newChartInstance);
      }
    }
    // console.log('before return', Date.now().toString());
    return () => {
      // console.log('destroy chart', Date.now().toString());
      // console.log(chartInstance);
      chartInstance && chartInstance.destroy();
      // console.log(chartInstance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 上面的dependency用空数组，这样可以避免不必要的rerender
  // props变化的时候会调用上面的useEffect函数，重建一个chart对象，并应用新的数据，
  // 但是暂时还不知道它对性能有多大影响

  useImperativeHandle(ref, () => ({
    update: () => {
      chartInstance.update();
    },
  }));

  return <canvas ref={chartContainer} />;
});

export type ChartRef = {
  update: () => void;
} | null;
