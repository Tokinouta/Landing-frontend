import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocalStorage } from '../useLocalStorage';

export const FailureDetection = () => {
  const [category, setCategory] = useState<string[]>([
    '方向舵卡死',
    '方向舵饱和',
    '方向舵漂移',
    '方向舵失效',
    '升降舵卡死',
    '升降舵饱和',
    '升降舵漂移',
    '升降舵失效',
    '副翼卡死',
    '副翼饱和',
    '副翼漂移',
    '副翼失效',
    '传感器卡死',
    '传感器饱和',
    '传感器漂移',
    '传感器失效',
    '机体受损',
    '单发停车',
  ]);
  const [failureState, setFailureState] = useLocalStorage<boolean[]>(
    'failureState',
    new Array(18).fill(false),
  );
  const [decision, setDecision] = useState<string>('可以着舰');

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('destroyed');
    };
  }, []);

  return (
    <div className="container">
      <div className="row row-col-4">
        {category?.map((s, ind) => (
          <div className="col-2" key={ind}>
            <div className="row justify-content-center  align-items-center">
              <div className="col-sm" id={s}>
                {s}
              </div>
              <div className="col-sm">
                <Switch
                  onChange={(c) =>
                    setFailureState({ ...failureState, [ind.toString()]: c })
                  }
                  checked={failureState[ind]}
                  aria-labelledby={s}
                ></Switch>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1>{decision}</h1>
    </div>
  );
};
