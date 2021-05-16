import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
interface IFormInput {
  Id?: number;
  InitialPositionX: string;
  InitialPositionY: string;
  InitialPositionZ: string;
  InitialAttitudePhi: string;
  InitialAttitudePsi: string;
  InitialAttitudeTheta: string;
  P: string;
  Q: string;
  R: string;
  Alpha: string;
  Vk: string;
  XShip: string;
  YShip: string;
  ZShip: string;
  PsiShip: string;
}

export const Initialization = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  // const [InitialPositionXOptions, setInitialPositionXOptions] =
  //   useState<string>('0');
  // const [InitialPositionYOptions, setInitialPositionYOptions] = useState([
  //   { value: 1, label: '0' },
  //   { value: 2, label: '典型数值2' },
  //   { value: 3, label: '典型数值3' },
  // ]);
  // const [InitialPositionZOptions, setInitialPositionZOptions] = useState([
  //   { value: 1, label: '0' },
  //   { value: 2, label: '典型数值2' },
  //   { value: 3, label: '典型数值3' },
  // ]);

  // const [InitialAttitudePhiOptions, setInitialAttitudePhiOptions] = useState([
  //   { value: 1, label: '0' },
  //   { value: 2, label: '典型数值2' },
  //   { value: 3, label: '典型数值3' },
  // ]);
  // const [InitialAttitudePsiOptions, setInitialAttitudePsiOptions] = useState([
  //   { value: 1, label: '0' },
  //   { value: 2, label: '典型数值2' },
  //   { value: 3, label: '典型数值3' },
  // ]);
  // const [InitialAttitudeThetaOptions, setInitialAttitudeThetaOptions] =
  //   useState([
  //     { value: 1, label: '0' },
  //     { value: 2, label: '典型数值2' },
  //     { value: 3, label: '典型数值3' },
  //   ]);

  // const [InitialPositionX, setInitialPositionX] = useState<string>('0');
  // const [InitialPositionY, setInitialPositionY] = useState<string>('0');
  // const [InitialPositionZ, setInitialPositionZ] = useState<string>('0');
  // const [InitialAttitudePhi, setInitialAttitudePhi] = useState<string>('0');
  // const [InitialAttitudePsi, setInitialAttitudePsi] = useState<string>('0');
  // const [InitialAttitudeTheta, setInitialAttitudeTheta] = useState<string>('0');

  const form = React.createRef<HTMLFormElement>();
  const [pattern, setPattern] = useState<RegExp>(
    // /^ *(-?\d+(\.\d+)?)( *, *| +)(-?\d+(\.\d+)?)( *, *| +)(-?\d+(\.\d+)?) *$/,
    /^ *(-?\d+(\.\d+)?) *$/,
  );

  const onSubmit = async (data: IFormInput) => {
    console.log('data', data, data.InitialPositionX);
    let newConfig = {
      Id: 0,
      X: Number(data.InitialPositionX),
      Y: Number(data.InitialPositionY),
      Z: Number(data.InitialPositionZ),
      Phi: Number(data.InitialAttitudePhi),
      Psi: Number(data.InitialAttitudePsi),
      Theta: Number(data.InitialAttitudeTheta),
      P: Number(data.P),
      Q: Number(data.Q),
      R: Number(data.R),
      Vk: Number(data.Vk),
      Alpha: Number(data.Alpha),
      XShip: Number(data.XShip),
      YShip: Number(data.YShip),
      ZShip: Number(data.ZShip),
      PsiShip: Number(data.PsiShip),
    };
    console.log(newConfig);
    await fetch('https://localhost:5001/WeatherForecast/initial', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConfig), //json传输过来
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  // const t = useRef({
  //   id: 0,
  //   initialPositionX: '0',
  //   initialPositionY: '0',
  //   initialPositionZ: '0',
  //   initialAttitudePhi: '0',
  //   initialAttitudePsi: '0',
  //   initialAttitudeTheta: '0',
  // });

  useEffect(() => {
    (async () => {
      await fetch('https://localhost:5001/WeatherForecast/loadInitial')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // console.log(Object.keys(data));

          // let temp = Object.keys(data)
          //   .slice(1)
          //   .map((s) => {
          //     // console.log(s);
          //     return data[s].value.map((ele: any, ind: number) => {
          //       return {
          //         value: ele,
          //         label: data[s].label[ind],
          //       };
          //     });
          //   });
          // console.log(temp);
          // setInitialPositionX(data.x);
          // setInitialPositionY(data.y);
          // setInitialPositionZ(data.z);
          // setInitialAttitudePhi(data.phi);
          // setInitialAttitudePsi(data.psi);
          // setInitialAttitudeTheta(data.theta);

          setValue('InitialPositionX', data.x, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('InitialPositionY', data.y, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('InitialPositionZ', data.z, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('InitialAttitudePhi', data.phi, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('InitialAttitudePsi', data.psi, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('InitialAttitudeTheta', data.theta, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('P', data.p, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('Q', data.q, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('R', data.r, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('Vk', data.vk, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('Alpha', data.alpha, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('XShip', data.xShip, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('YShip', data.yShip, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('ZShip', data.zShip, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('PsiShip', data.psiShip, {
            shouldDirty: true,
            shouldValidate: true,
          });
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   ((data) => {
  //     setInitialPositionX(data.initialPositionX);
  //     setInitialPositionY(data.initialPositionY);
  //     setInitialPositionZ(data.initialPositionZ);
  //     setInitialAttitudePhi(data.initialAttitudePhi);
  //     setInitialAttitudePsi(data.initialAttitudePsi);
  //     setInitialAttitudeTheta(data.initialAttitudePhi);
  //   })(t.current);
  // });
  const renderOption = (prompt: string, name: string, wrongMessage: string) => {
    return (
      <div className="col-6">
        <div className="row mb-3 justify-content-center">
          <div className="col-4 align-self-center">{prompt}</div>
          <div className="col-6">
            <input
              className="form-control"
              {...register(name, {
                pattern: { value: pattern, message: wrongMessage },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 style={{ padding: '2em 0.5em 0.5em 0.5em' }}>初始化配置设置</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        //   , (d) => {
        //   console.log(d);
        //   form.current?.classList.add('was-validated');
        //   d.ref.classList.add('was-invalidated');
        // })}
        ref={form}
        className="needs-validation"
      >
        <div className="row row-col-2">
          {renderOption('初始位置X', 'InitialPositionX', 'wrong x')}
          {renderOption('初始位置Y', 'InitialPositionY', 'wrong y')}
          {renderOption('初始位置Z', 'InitialPositionZ', 'wrong z')}
          {renderOption('初始俯仰角', 'InitialAttitudePhi', 'wrong phi')}
          {renderOption('初始偏航角', 'InitialAttitudePsi', 'wrong psi')}
          {renderOption('初始滚转角', 'InitialAttitudeTheta', 'wrong theta')}
          {renderOption('初始俯仰角速度', 'P', 'wrong theta')}
          {renderOption('初始偏航角速度', 'Q', 'wrong theta')}
          {renderOption('初始滚转角速度', 'R', 'wrong theta')}
          {renderOption('初始空速', 'Vk', 'wrong theta')}
          {renderOption('初始迎角', 'Alpha', 'wrong theta')}
          {renderOption('初始航母位置X', 'XShip', 'wrong theta')}
          {renderOption('初始航母位置Y', 'YShip', 'wrong theta')}
          {renderOption('初始航母位置Z', 'ZShip', 'wrong theta')}
          {renderOption('初始航母偏航角', 'PsiShip', 'wrong theta')}
        </div>
        {/* <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始位置X</div>
          <div className="col-4">
            <input
              className="form-control"
              {...register('InitialPositionX', {
                pattern: { value: pattern, message: 'wrong x' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialPositionX"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始位置Y</div>
          <div className="col-4">
            <input
              className="form-control"
              {...register('InitialPositionY', {
                pattern: { value: pattern, message: 'wrong y' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialPositionY"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始位置Z</div>
          <div className="col-4">
            <input
              className="col-4 form-control"
              {...register('InitialPositionZ', {
                pattern: { value: pattern, message: 'wrong z' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialPositionZ"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始俯仰角</div>
          <div className="col-4">
            <input
              className="col-4 form-control"
              {...register('InitialAttitudePhi', {
                pattern: { value: pattern, message: 'wrong phi' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialAttitudePhi"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始偏航角</div>
          <div className="col-4">
            <input
              className="col-4 form-control"
              {...register('InitialAttitudePsi', {
                pattern: { value: pattern, message: 'wrong psi' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialAttitudePsi"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">初始滚转角</div>
          <div className="col-4">
            <input
              className="col-4 form-control"
              {...register('InitialAttitudeTheta', {
                pattern: { value: pattern, message: 'wrong theta' },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="InitialAttitudeTheta"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div> */}
        <div className="row mb-3 justify-content-center">
          <div className="col-6">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};
