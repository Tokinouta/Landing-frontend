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
  const [showBox] = useState<boolean>(false);
  return (
    <div className="row row-col-3">
      <div className="col-4">
        <HeadingIndicator heading={props.data.heading} showBox={showBox} />
      </div>
      <div className="col-4">
        <Airspeed speed={props.data.speed} showBox={showBox} />
      </div>
      <div className="col-4">
        <Altimeter
          altitude={props.data.altitude}
          pressure={props.data.pressure}
          showBox={showBox}
        />
      </div>
      <div className="col-4">
        <AttitudeIndicator
          roll={props.data.roll}
          pitch={props.data.pitch}
          showBox={showBox}
        />
      </div>
      <div className="col-4">
        <TurnCoordinator turn={props.data.turn} showBox={showBox} />
      </div>
      <div className="col-4">
        <Variometer vario={props.data.vario} showBox={showBox} />
      </div>
    </div>
  );
};
