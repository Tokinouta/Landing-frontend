import React from 'react';

import fi_box from './fi_box~GsuVzeko.svg';
import heading_yaw from './heading_yaw~bobjMqwT.svg';
import heading_mechanics from './heading_mechanics~LnEXqkNn.svg';
import fi_circle from './fi_circle~UWbONNsy.svg';
import vertical_mechanics from './vertical_mechanics~necSfeyG.svg';
import fi_needle from './fi_needle~xDIrdyew.svg';
import turn_coordinator from './turn_coordinator~AOvMJjuH.svg';
import fi_tc_airplane from './fi_tc_airplane~rlIjNUeF.svg';
import speed_mechanics from './speed_mechanics~bfCIlIYE.svg';
import altitude_pressure from './altitude_pressure~djhxaaFg.svg';
import altitude_ticks from './altitude_ticks~bkaxgnzJ.svg';
import fi_needle_small from './fi_needle_small~boLlQwLq.svg';
import horizon_back from './horizon_back~voMaAEaI.svg';
import horizon_ball from './horizon_ball~bcMjrNsr.svg';
import horizon_circle from './horizon_circle~qRDWUGmQ.svg';
import horizon_mechanics from './horizon_mechanics~rRLTtKVH.svg';

export interface InstrumentProps {
  children?: React.ReactNode;
  showBox?: boolean;
  size?: string;
}

export interface Props {
  showBox?: boolean;
  size?: string;
  heading?: number;
  vario?: number;
  turn?: number;
  speed?: number;
  altitude?: number;
  pressure?: number;
  pitch?: number;
  roll?: number;
}
const constants = {
  pitch_bound: 30,
  vario_bound: 1.95,
  airspeed_bound_l: 0,
  airspeed_bound_h: 160,
};
const box: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
};

const Instrument = (props: InstrumentProps) => {
  const children = props.children;
  const showBox = props.showBox;
  const size = props.size;
  return (
    <div
      className="instrument heading"
      style={{
        height: size != null ? size : '250px',
        width: size != null ? size : '250px',
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
      }}
    >
      {(showBox ?? true) && (
        <img src={fi_box} className="background box" style={box} alt="" />
      )}
      {children}
    </div>
  );
};

const HeadingIndicator = (props: Props) => {
  let heading = -(props.heading ?? 0);
  let newStyle = {
    ...box,
    transform: 'rotate(' + heading + 'deg)',
  };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <div className="heading box" style={newStyle}>
        <img src={heading_yaw} className="box" style={box} alt=""></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={heading_mechanics} className="box" style={box} alt=""></img>
        <img src={fi_circle} className="box" style={box} alt=""></img>
      </div>
    </Instrument>
  );
};
const Variometer = (props: Props) => {
  let vario = (props.vario || 0) / 1000;
  if (vario > constants.vario_bound) vario = constants.vario_bound;
  else if (vario < -constants.vario_bound) vario = -constants.vario_bound;
  vario = vario * 90;
  let newStyle = {
    ...box,
    transform: 'rotate(' + vario + 'deg)',
  };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <img src={vertical_mechanics} className="box" style={box} alt=""></img>
      <div className="heading box" style={newStyle}>
        <img src={fi_needle} className="box" style={box} alt=""></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={fi_circle} className="box" style={box} alt=""></img>
      </div>
    </Instrument>
  );
};
const TurnCoordinator = (props: Props) => {
  let newStyle = {
    ...box,
    transform: 'rotate(' + (props.turn || 0) + 'deg)',
  };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <img src={turn_coordinator} className="box" style={box} alt=""></img>
      <div className="heading box" style={newStyle}>
        <img src={fi_tc_airplane} className="box" style={box} alt=""></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={fi_circle} className="box" style={box} alt=""></img>
      </div>
    </Instrument>
  );
};
const Airspeed = (props: Props) => {
  let speed = props.speed || 0;
  if (speed > constants.airspeed_bound_h) speed = constants.airspeed_bound_h;
  else if (speed < constants.airspeed_bound_l)
    speed = constants.airspeed_bound_l;
  speed = 90 + speed * 2;
  let newStyle = {
    ...box,
    transform: 'rotate(' + speed + 'deg)',
  };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <img src={speed_mechanics} className="box" style={box} alt=""></img>
      <div className="heading box" style={newStyle}>
        <img src={fi_needle} className="box" style={box} alt=""></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={fi_circle} className="box" style={box} alt=""></img>
      </div>
    </Instrument>
  );
};
const Altimeter = (props: Props) => {
  let altitude = props.altitude || 0;
  let needle = 90 + ((altitude % 1000) * 360) / 1000;
  let needleSmall = (altitude / 10000) * 360;
  let pressure = props.pressure || 1013.25;
  pressure = 2 * pressure - 1980;
  let newStyle = {
    ...box,
    transform: 'rotate(' + pressure + 'deg)',
  };
  let newStyle2 = {
    ...box,
    transform: 'rotate(' + needleSmall + 'deg)',
  };
  let newStyle3 = {
    ...box,
    transform: 'rotate(' + needle + 'deg)',
  };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <div className="pressure box" style={newStyle}>
        <img src={altitude_pressure} className="box" style={box} alt=""></img>
      </div>
      <img src={altitude_ticks} className="box" style={box} alt=""></img>
      <div className="needleSmall box" style={newStyle2}>
        <img src={fi_needle_small} className="box" style={box} alt=""></img>
      </div>
      <div className="needle box" style={newStyle3}>
        <img src={fi_needle} className="box" style={box} alt=""></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={fi_circle} className="box" style={box} alt=""></img>
      </div>
    </Instrument>
  );
};
const AttitudeIndicator = (props: Props) => {
  let pitch = props.pitch || 0;
  let roll = props.roll || 0;
  if (pitch > constants.pitch_bound) {
    pitch = constants.pitch_bound;
  } else if (pitch < -constants.pitch_bound) {
    pitch = -constants.pitch_bound;
  }
  let newStyle = {
    ...box,
    top: '0%',
    transform: 'rotate(' + roll + 'deg)',
  };
  let newStyle2 = { ...box, top: pitch * 0.7 + '%' };
  return (
    <Instrument showBox={props.showBox} size={props.size}>
      <div className="roll box" style={newStyle}>
        <img src={horizon_back} className="box" alt="" style={box}></img>
        <div className="pitch box" style={newStyle2}>
          <img src={horizon_ball} className="box" alt="" style={box}></img>
        </div>
        <img src={horizon_circle} className="box" alt="" style={box}></img>
      </div>
      <div className="mechanics box" style={box}>
        <img src={horizon_mechanics} className="box" alt="" style={box}></img>
        <img src={fi_circle} className="box" alt="" style={box}></img>
      </div>
    </Instrument>
  );
};

export {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer,
};
