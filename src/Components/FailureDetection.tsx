import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocalStorage } from '../useLocalStorage';

export const FailureDetection = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [decision, setDecision] = useState<string>('可以着舰');

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('destroyed');
    };
  }, []);

  return (
    <div className="container">
      <h1 style={{ padding: '2em 0.5em 0.5em 0.5em' }}>故障注入及检测</h1>
      <div className="row row-col-4 " style={{ padding: '2em 0.5em' }}>
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
      <div className="row row-col-4 gy-2" style={{ padding: '2em 0.5em' }}>
        {category?.map((s, ind) => (
          <div className="col-2" key={ind}>
            <div className="row justify-content-center  align-items-center">
              <div className="col-sm" id={s}>
                {s}
              </div>
              <div
                className="col-sm"
                style={{
                  backgroundColor: failureState[ind] ? '#f17916' : '#9ffa28',
                }}
              >
                {failureState[ind] ? '已检出' : '未检出'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 style={{ margin: '0.3em' }}>{decision}</h1>
    </div>
  );
};
