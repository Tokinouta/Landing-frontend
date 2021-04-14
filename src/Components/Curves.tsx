import React, { forwardRef } from 'react';
import Chart from 'chart.js/auto';
import ChartComponent from './ChartComponent';
import { Props } from './types';
// interface Props {
//   data: [];
// }

export const Curves = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type="line" ref={ref} />
));
