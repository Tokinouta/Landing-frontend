import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select/src/Select';
import { useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const Initialization = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div>
      <div>舰载机初始状态设置</div>
      <div>
        {/* <Select></Select> */}
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="row justify-content-center mb-3">
            <input
              defaultValue="test"
              {...register('example')}
              className="col-4 form-control"
            />
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="row justify-content-center mb-3">
            <input
              {...register('exampleRequired', { required: true })}
              className="col-4 form-control"
            />
          </div>
          {/* errors will return when field validation fails  */}
          {
            <div className="row justify-content-center mb-3">
              <div className="col-4">
                {errors.exampleRequired && 'Example invalid feedback text'}
              </div>
            </div>
          }

          <div className="row justify-content-center mb-3">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};
