import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}

export const SimulationConfig = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: IFormInput) => console.log(data);
  return (
    <div>
      <div>仿真配置设置</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3 justify-content-center">
          <div className="col-6">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-6">
            <Controller
              name="iceCreamType"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' },
                  ]}
                />
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
