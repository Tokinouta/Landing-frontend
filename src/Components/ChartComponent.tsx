import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  forwardRef,
} from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';

import Chart from 'chart.js/auto';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';

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

  const computedData = useMemo<Chart.ChartData>(() => {
    if (typeof data === 'function') {
      return canvas.current ? data(canvas.current) : {};
    } else return data;
  }, [data]);

  //   const [chart, setChart] = useState<Chart>(null);
  let chart = useRef<Chart | null>(null);
  useImperativeHandle<Chart | undefined, Chart | undefined>(
    ref,
    () => chart.current,
    [chart],
  );

  const renderChart = useCallback(() => {
    if (!canvas.current) return;

    chart.current = new Chart(canvas.current, {
      type,
      data: computedData,
      options,
      plugins,
    });
    // setChart(temp);
    // console.log(Object.is(temp, chart));
    console.log('chart set');
  }, [computedData, options, plugins, type]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chart.current) return;

    const { getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } = props;

    getDatasetAtEvent &&
      getDatasetAtEvent(chart.current.getDatasetAtEvent(e), e);
    getElementAtEvent &&
      getElementAtEvent(chart.current.getElementAtEvent(e), e);
    getElementsAtEvent &&
      getElementsAtEvent(chart.current.getElementsAtEvent(e), e);
  };

  const updateChart = useCallback(() => {
    if (!chart) return;

    // if (options) {
    //   chart.current.options = merge(chart.current.options, options);
    // }

    if (!chart.current.config.data) {
      chart.current.config.data = computedData;
      chart.current.update();
      return;
    }

    // const { datasets: newDataSets = [], ...newChartData } = computedData;
    // const { datasets: currentDataSets = [] } = chart.current.config.data;

    // copy values
    // assign(chart.current.config.data, newChartData);
    // chart.current.config.datasets
    // chart.current.config.data.datasets = newDataSets.map(
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
    console.log(chart.current.config.data.datasets);
    console.log(chart.current.data);
    chart.current.update();
    console.log('chart updated');
  }, [chart, computedData, options]);

  const destroyChart = useCallback(() => {
    console.log('destroy called');
    console.log(chart);
    if (chart) {
      console.log('started destroying');
      chart.current.destroy();
    }
  }, [chart]);

  useEffect(() => {
    console.log('first useEffect');
    renderChart();
    console.log(chart);
    return () => {
      destroyChart();
      console.log('destroyed');
    };
  }, [chart, destroyChart, renderChart]);

  useEffect(() => {
    console.log('second useEffect');
    if (redraw) {
      destroyChart();
      renderChart();
      console.log('redrew');
    } else {
      updateChart();
      console.log('updated');
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

export default ChartComponent;
