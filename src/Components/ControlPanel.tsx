import React from 'react';
import Chart from 'chart.js/auto';

interface Props {
  data: [];
}

export const ControlPanel = ({ data }: Props) => {
  //   data

  return (
    <div>
      <canvas id="chart"></canvas>
    </div>
  );
};
