import React, { forwardRef } from 'react';
import Chart from 'chart.js/auto';
import ChartComponent from './ChartComponent';
import { ChartProps } from './types';
// interface Props {
//   data: [];
// }

export const Curves = forwardRef<Chart | undefined, ChartProps>(
  (props, ref) => <ChartComponent {...props} type="line" ref={ref} />,
);
