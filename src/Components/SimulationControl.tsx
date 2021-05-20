import { useContext, useEffect } from 'react';
import { ControlPanel } from './ControlPanelHook';
import { simulationContext } from '../App';

export const SimulationControl = () => {
  const cont = useContext(simulationContext);

  useEffect(() => {
    cont.controlComponentRef?.current?.updateCharts();
  }, [cont.controlComponentRef]);

  return (
    <ControlPanel
      chartProps={cont.chartConfig}
      newdata={cont.indicator}
      isSimulating={cont.isSimulating}
      toggleIsSimulating={cont.toggleIsSimulating}
      ref={cont.controlComponentRef}
    ></ControlPanel>
  );
};
