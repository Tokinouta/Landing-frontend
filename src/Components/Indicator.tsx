import {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer,
} from '../FlightIndicator/FlightIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Example = () => {
  return (
    <div className="row row-col-3">
      <div className="col-4">
        <HeadingIndicator heading={Math.random() * 360} showBox={false} />
      </div>
      <div className="col-4">
        <Airspeed speed={Math.random() * 160} showBox={false} />
      </div>
      <div className="col-4">
        <Altimeter
          altitude={Math.random() * 28000}
          pressure={1000 + Math.random() * 50}
          showBox={false}
        />
      </div>
      <div className="col-4">
        <AttitudeIndicator
          roll={(Math.random() - 0.5) * 120}
          pitch={(Math.random() - 0.5) * 40}
          showBox={false}
        />
      </div>
      <div className="col-4">
        <TurnCoordinator turn={(Math.random() - 0.5) * 120} showBox={false} />
      </div>
      <div className="col-4">
        <Variometer vario={(Math.random() - 0.5) * 4000} showBox={false} />
      </div>
    </div>
  );
};
