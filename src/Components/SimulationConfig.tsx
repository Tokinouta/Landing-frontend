import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: number };
  GuidanceController: { label: string; value: string };
  AttitudeController: { label: string; value: string };
  AngularRateController: { label: string; value: string };
  DisturbanceObserver: { label: string; value: string };

  // 导数滤波器配置参数
  GuidanceFilter: { label: string; value: string };
  AttitudeFilter: { label: string; value: string };
  // 1 使用tracking_differentiator计算导数
  UseAttitudeTrackingDifferentiator: { label: string; value: string };

  // 轨迹配置
  TrajactoryConfig: { label: string; value: string };

  // 扰动类型配置
  UseDisturbanceTypeI: { label: string; value: string }; // 1 典型舰尾流扰动

  // 是否使能风场扰动 0:不使能 1:使能
  IsWindEnabled: { label: string; value: string };
  // 是否使能甲板运动补偿 0:不使能 1:使能
  IsDeckCompensationEnabled: { label: string; value: string };

  UseL1Adaptive: { label: string; value: string };
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
  const [
    AngularRateControllerOptions,
    setAngularRateControllerOptions,
  ] = useState([
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
  ] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [TrajactoryConfigOptions, setTrajactoryConfigOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [UseDisturbanceTypeIOptions, setUseDisturbanceTypeIOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [IsWindEnabledOptions, setIsWindEnabledOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [
    IsDeckCompensationEnabledOptions,
    setIsDeckCompensationEnabledOptions,
  ] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const [UseL1AdaptiveOptions, setUseL1AdaptiveOptions] = useState([
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
    { value: 3, label: 'Vanilla' },
  ]);
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    let newConfig = {
      Id: 0,
      GuidanceController: Number(data.GuidanceController.value),
      AttitudeController: Number(data.AttitudeController.value),
      AngularRateController: Number(data.AngularRateController.value),
      DisturbanceObserver: Number(data.DisturbanceObserver.value),
      GuidanceFilter: Number(data.GuidanceFilter.value),
      AttitudeFilter: Number(data.AttitudeFilter.value),
      UseAttitudeTrackingDifferentiator: Boolean(
        data.UseAttitudeTrackingDifferentiator.value,
      ),
      TrajactoryConfig: Number(data.TrajactoryConfig.value),
      UseDisturbanceTypeI: Boolean(data.UseDisturbanceTypeI.value), // 1 典型舰尾流扰动
      IsWindEnabled: Boolean(data.IsWindEnabled.value),
      IsDeckCompensationEnabled: Boolean(data.IsDeckCompensationEnabled.value),
      UseL1Adaptive: Boolean(data.UseL1Adaptive.value),
    };
    console.log(newConfig);
    await fetch('https://localhost:5001/WeatherForecast/config', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConfig),
    });
  };

  useEffect(() => {
    (async () => {
      await fetch('https://localhost:5001/WeatherForecast/loadConfig')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(Object.keys(data));
          let temp = Object.keys(data).map((s) => {
            console.log(s);
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
        });
    })();
  }, []);

  return (
    <div>
      <h1>仿真配置设置</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="GuidanceController"
              render={({ field }) => (
                <Select {...field} options={GuidanceControllerOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="AttitudeController"
              render={({ field }) => (
                <Select {...field} options={AttitudeControllerOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="AngularRateController"
              render={({ field }) => (
                <Select {...field} options={AngularRateControllerOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="DisturbanceObserver"
              render={({ field }) => (
                <Select {...field} options={DisturbanceObserverOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="GuidanceFilter"
              render={({ field }) => (
                <Select {...field} options={GuidanceFilterOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="AttitudeFilter"
              render={({ field }) => (
                <Select {...field} options={AttitudeFilterOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="UseAttitudeTrackingDifferentiator"
              render={({ field }) => (
                <Select
                  {...field}
                  options={UseAttitudeTrackingDifferentiatorOptions}
                />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="TrajactoryConfig"
              render={({ field }) => (
                <Select {...field} options={TrajactoryConfigOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="UseDisturbanceTypeI"
              render={({ field }) => (
                <Select {...field} options={UseDisturbanceTypeIOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="IsWindEnabled"
              render={({ field }) => (
                <Select {...field} options={IsWindEnabledOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="IsDeckCompensationEnabled"
              render={({ field }) => (
                <Select {...field} options={IsDeckCompensationEnabledOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-3 align-self-center">导航配置</div>
          <div className="col-6">
            <Controller
              name="UseL1Adaptive"
              render={({ field }) => (
                <Select {...field} options={UseL1AdaptiveOptions} />
              )}
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-6">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};
