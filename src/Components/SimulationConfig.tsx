import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: number };
  GuidanceController: { label: string; value: number };
  AttitudeController: { label: string; value: number };
  AngularRateController: { label: string; value: number };
  DisturbanceObserver: { label: string; value: number };

  // 导数滤波器配置参数
  GuidanceFilter: { label: string; value: number };
  AttitudeFilter: { label: string; value: number };
  UseAttitudeTrackingDifferentiator: { label: string; value: boolean };

  // 轨迹配置
  TrajactoryConfig: { label: string; value: number };

  // 扰动类型配置
  UseDisturbanceTypeI: { label: string; value: boolean }; // 1 典型舰尾流扰动

  // 是否使能风场扰动 0:不使能 1:使能
  IsWindEnabled: { label: string; value: boolean };
  // 是否使能甲板运动补偿 0:不使能 1:使能
  IsDeckCompensationEnabled: { label: string; value: boolean };

  UseL1Adaptive: { label: string; value: boolean };
}

export const SimulationConfig = () => {
  const { control, handleSubmit } = useForm();
  const [GuidanceControllerOptions, setGuidanceControllerOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [AttitudeControllerOptions, setAttitudeControllerOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [AngularRateControllerOptions, setAngularRateControllerOptions] =
    useState([
      { value: 1, label: 'Chocolate' },
      { value: 2, label: 'Strawberry' },
      { value: 3, label: 'Vanilla' },
    ]);
  const [DisturbanceObserverOptions, setDisturbanceObserverOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [GuidanceFilterOptions, setGuidanceFilterOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [AttitudeFilterOptions, setAttitudeFilterOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [
    UseAttitudeTrackingDifferentiatorOptions,
    setUseAttitudeTrackingDifferentiatorOptions,
  ] = useState([{ value: true, label: 'Chocolate' }]);
  const [TrajactoryConfigOptions, setTrajactoryConfigOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [UseDisturbanceTypeIOptions, setUseDisturbanceTypeIOptions] = useState([
    { value: true, label: 'Chocolate' },
  ]);
  const [IsWindEnabledOptions, setIsWindEnabledOptions] = useState([
    { value: true, label: 'Chocolate' },
  ]);
  const [
    IsDeckCompensationEnabledOptions,
    setIsDeckCompensationEnabledOptions,
  ] = useState([{ value: true, label: 'Chocolate' }]);
  const [UseL1AdaptiveOptions, setUseL1AdaptiveOptions] = useState([
    { value: true, label: 'Chocolate' },
  ]);

  const [GuidanceController, setGuidanceController] = useState<number>(0);
  const [AttitudeController, setAttitudeController] = useState<number>(0);
  const [AngularRateController, setAngularRateController] = useState<number>(0);
  const [DisturbanceObserver, setDisturbanceObserver] = useState<number>(0);
  const [GuidanceFilter, setGuidanceFilter] = useState<number>(0);
  const [AttitudeFilter, setAttitudeFilter] = useState<number>(0);
  const [
    UseAttitudeTrackingDifferentiator,
    setUseAttitudeTrackingDifferentiator,
  ] = useState<number>(0);
  const [TrajactoryConfig, setTrajactoryConfig] = useState<number>(0);
  const [UseDisturbanceTypeI, setUseDisturbanceTypeI] = useState<number>(0);
  const [IsWindEnabled, setIsWindEnabled] = useState<number>(0);
  const [IsDeckCompensationEnabled, setIsDeckCompensationEnabled] =
    useState<number>(0);
  const [UseL1Adaptive, setUseL1Adaptive] = useState<number>(0);

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    let newConfig = {
      Id: 0,
      GuidanceController: GuidanceControllerOptions[GuidanceController].value,
      AttitudeController: AttitudeControllerOptions[AttitudeController].value,
      AngularRateController:
        AngularRateControllerOptions[AngularRateController].value,
      DisturbanceObserver:
        DisturbanceObserverOptions[DisturbanceObserver].value,
      GuidanceFilter: GuidanceFilterOptions[GuidanceFilter].value,
      AttitudeFilter: AttitudeFilterOptions[AttitudeFilter].value,
      UseAttitudeTrackingDifferentiator:
        UseAttitudeTrackingDifferentiatorOptions[
          UseAttitudeTrackingDifferentiator
        ].value,
      TrajactoryConfig: TrajactoryConfigOptions[TrajactoryConfig].value,
      UseDisturbanceTypeI:
        UseDisturbanceTypeIOptions[UseDisturbanceTypeI].value,
      IsWindEnabled: IsWindEnabledOptions[IsWindEnabled].value,
      IsDeckCompensationEnabled:
        IsDeckCompensationEnabledOptions[IsDeckCompensationEnabled].value,
      UseL1Adaptive: UseL1AdaptiveOptions[UseL1Adaptive].value,
    };
    console.log(newConfig);
    // https://metabox.io/send-get-post-request-with-javascript-fetch-api/
    await fetch('https://localhost:5001/WeatherForecast/config', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConfig),
    });
  };
  const t = useRef({
    id: 0,
    guidanceController: 5,
    attitudeController: 1,
    angularRateController: 1,
    disturbanceObserver: 4,
    guidanceFilter: 0,
    attitudeFilter: 0,
    useAttitudeTrackingDifferentiator: false,
    trajactoryConfig: 1,
    useDisturbanceTypeI: true,
    isWindEnabled: false,
    isDeckCompensationEnabled: false,
    useL1Adaptive: true,
  });
  useEffect(() => {
    (async () => {
      t.current = await fetch(
        'https://localhost:5001/WeatherForecast/loadConfig',
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(Object.keys(data));

          let temp = Object.keys(data)
            .slice(1)
            .map((s) => {
              // console.log(s);
              return data[s].value.map((ele: any, ind: number) => {
                return {
                  value: ele,
                  label: data[s].label[ind],
                };
              });
            });
          console.log(temp);
          setGuidanceControllerOptions(temp[0]);
          setAttitudeControllerOptions(temp[1]);
          setAngularRateControllerOptions(temp[2]);
          setDisturbanceObserverOptions(temp[3]);
          setGuidanceFilterOptions(temp[4]);
          setAttitudeFilterOptions(temp[5]);
          setUseAttitudeTrackingDifferentiatorOptions(temp[6]);
          setTrajactoryConfigOptions(temp[7]);
          setUseDisturbanceTypeIOptions(temp[8]);
          setIsWindEnabledOptions(temp[9]);
          setIsDeckCompensationEnabledOptions(temp[10]);
          setUseL1AdaptiveOptions(temp[11]);
          return data.configuration;
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ((data) => {
      let config = data;
      setGuidanceController(config.guidanceController);
      setAttitudeController(config.attitudeController);
      setAngularRateController(config.angularRateController);
      setDisturbanceObserver(config.disturbanceObserver);
      setGuidanceFilter(config.guidanceFilter);
      setAttitudeFilter(config.attitudeFilter);
      setTrajactoryConfig(config.trajactoryConfig);
      setUseAttitudeTrackingDifferentiator(
        UseAttitudeTrackingDifferentiatorOptions.findIndex((p) => {
          // console.log(p.value === config.useAttitudeTrackingDifferentiator);
          return p.value === config.useAttitudeTrackingDifferentiator;
        }),
      );
      setUseDisturbanceTypeI(
        UseDisturbanceTypeIOptions.findIndex(
          (p) => p.value === config.useDisturbanceTypeI,
        ),
      );
      setIsWindEnabled(
        IsWindEnabledOptions.findIndex((p) => p.value === config.isWindEnabled),
      );
      setIsDeckCompensationEnabled(
        IsDeckCompensationEnabledOptions.findIndex(
          (p) => p.value === config.isDeckCompensationEnabled,
        ),
      );
      setUseL1Adaptive(
        UseL1AdaptiveOptions.findIndex((p) => p.value === config.useL1Adaptive),
      );
    })(t.current);
  }, [
    IsDeckCompensationEnabledOptions,
    IsWindEnabledOptions,
    UseAttitudeTrackingDifferentiatorOptions,
    UseDisturbanceTypeIOptions,
    UseL1AdaptiveOptions,
  ]);

  return (
    <div>
      <h1 style={{ padding: '2em 0.5em 0.5em 0.5em' }}>仿真配置设置</h1>
      {/* <button
        onClick={() => {
          console.log(UseAttitudeTrackingDifferentiator);
          console.log(TrajactoryConfig);
          console.log(
            UseAttitudeTrackingDifferentiatorOptions,

            TrajactoryConfigOptions,
            IsWindEnabledOptions,
          );
          setTrajactoryConfig(TrajactoryConfig);
        }}
      >
        rarara
      </button> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row row-col-6">
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">导航控制器</div>
                <div className="col-6">
                  <Controller
                    name="GuidanceController"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={GuidanceControllerOptions}
                        value={GuidanceControllerOptions[GuidanceController]}
                        onChange={(r) => {
                          setGuidanceController(
                            GuidanceControllerOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">姿态控制器</div>
                <div className="col-6">
                  <Controller
                    name="AttitudeController"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={AttitudeControllerOptions}
                        value={AttitudeControllerOptions[AttitudeController]}
                        onChange={(r) => {
                          setAttitudeController(
                            AttitudeControllerOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">角速度控制器</div>
                <div className="col-6">
                  <Controller
                    name="AngularRateController"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={AngularRateControllerOptions}
                        value={
                          AngularRateControllerOptions[AngularRateController]
                        }
                        onChange={(r) => {
                          setAngularRateController(
                            AngularRateControllerOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">扰动观测器</div>
                <div className="col-6">
                  <Controller
                    name="DisturbanceObserver"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={DisturbanceObserverOptions}
                        value={DisturbanceObserverOptions[DisturbanceObserver]}
                        onChange={(r) => {
                          setDisturbanceObserver(
                            DisturbanceObserverOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">导航滤波器</div>
                <div className="col-6">
                  <Controller
                    name="GuidanceFilter"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={GuidanceFilterOptions}
                        value={GuidanceFilterOptions[GuidanceFilter]}
                        onChange={(r) => {
                          setGuidanceFilter(
                            GuidanceFilterOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">姿态滤波器</div>
                <div className="col-6">
                  <Controller
                    name="AttitudeFilter"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={AttitudeFilterOptions}
                        value={AttitudeFilterOptions[AttitudeFilter]}
                        onChange={(r) => {
                          setAttitudeFilter(
                            AttitudeFilterOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">使用姿态追踪微分</div>
                <div className="col-6">
                  <Controller
                    name="UseAttitudeTrackingDifferentiator"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={UseAttitudeTrackingDifferentiatorOptions}
                        value={
                          UseAttitudeTrackingDifferentiatorOptions[
                            UseAttitudeTrackingDifferentiator
                          ]
                        }
                        onChange={(r) => {
                          setUseAttitudeTrackingDifferentiator(
                            UseAttitudeTrackingDifferentiatorOptions.findIndex(
                              (p) => Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">轨迹配置</div>
                <div className="col-6">
                  <Controller
                    name="TrajactoryConfig"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={TrajactoryConfigOptions}
                        value={TrajactoryConfigOptions[TrajactoryConfig]}
                        onChange={(r) => {
                          setTrajactoryConfig(
                            TrajactoryConfigOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">使用第一型扰动</div>
                <div className="col-6">
                  <Controller
                    name="UseDisturbanceTypeI"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={UseDisturbanceTypeIOptions}
                        value={UseDisturbanceTypeIOptions[UseDisturbanceTypeI]}
                        onChange={(r) => {
                          setUseDisturbanceTypeI(
                            UseDisturbanceTypeIOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">启用风场扰动</div>
                <div className="col-6">
                  <Controller
                    name="IsWindEnabled"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={IsWindEnabledOptions}
                        value={IsWindEnabledOptions[IsWindEnabled]}
                        onChange={(r) => {
                          setIsWindEnabled(
                            IsWindEnabledOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">启用甲板补偿</div>
                <div className="col-6">
                  <Controller
                    name="IsDeckCompensationEnabled"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={IsDeckCompensationEnabledOptions}
                        value={
                          IsDeckCompensationEnabledOptions[
                            IsDeckCompensationEnabled
                          ]
                        }
                        onChange={(r) => {
                          setIsDeckCompensationEnabled(
                            IsDeckCompensationEnabledOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mb-3 justify-content-center">
                <div className="col-4 align-self-center">使用L1自适应控制</div>
                <div className="col-6">
                  <Controller
                    name="UseL1Adaptive"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={UseL1AdaptiveOptions}
                        value={UseL1AdaptiveOptions[UseL1Adaptive]}
                        onChange={(r) => {
                          setUseL1Adaptive(
                            UseL1AdaptiveOptions.findIndex((p) =>
                              Object.is(p, r),
                            ),
                          );
                        }}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <div className="col-6">
              <input type="submit" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
