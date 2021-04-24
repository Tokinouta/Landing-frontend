import {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer,
} from '../FlightIndicator/FlightIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export interface IndicatorProps {
  data: {
    heading: number;
    speed: number;
    altitude: number;
    pressure?: number;
    roll: number;
    pitch: number;
    turn?: number;
    vario: number;
  };
}

export const Example = (props: IndicatorProps) => {
  const [showBox, setShowBox] = useState<boolean>(false);
  return (
    <div className="row row-col-3">
      <div className="col-4">
        <HeadingIndicator heading={Math.random() * 360} showBox={showBox} />
      </div>
      <div className="col-4">
        <Airspeed speed={Math.random() * 160} showBox={showBox} />
      </div>
      <div className="col-4">
        <Altimeter
          altitude={Math.random() * 28000}
          pressure={1000 + Math.random() * 50}
          showBox={showBox}
        />
      </div>
      <div className="col-4">
        <AttitudeIndicator
          roll={(Math.random() - 0.5) * 120}
          pitch={(Math.random() - 0.5) * 40}
          showBox={showBox}
        />
      </div>
      <div className="col-4">
        <TurnCoordinator turn={(Math.random() - 0.5) * 120} showBox={showBox} />
      </div>
      <div className="col-4">
        <Variometer vario={(Math.random() - 0.5) * 4000} showBox={showBox} />
      </div>
    </div>
  );
};
