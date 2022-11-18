import FilterForm from '@/components/FilterForm';

import style from './index.module.less';

import LineCharts from '@/components/LineCharts';
import { useReducer, useState } from 'react';
import { ChartContext, reducer, store } from '@/store';

import ChartTable from '@/components/ChartTable';

export default function () {
  const [params, setParams] = useState(null);

  const [state, dispatch] = useReducer(reducer, store);

  const onFinish = async (val: any) => {
    // paint
    setParams(val);
  };

  const setLoading = (val: boolean) => {
    dispatch({ type: 'loading', value: val });
  };

  return (
    <ChartContext.Provider value={state}>
      <div className={style.container}>
        <div className={style.left}>
          <FilterForm
            type="uoseg"
            onSubmit={(val: any) => onFinish(val)}
            setLoading={(val: boolean) => setLoading(val)}
          />
        </div>
        <div className={style.right}>
          <LineCharts params={params} />
          <div style={{ marginTop: '20px' }}>
            <ChartTable type="uoseg" />
          </div>
        </div>
      </div>
    </ChartContext.Provider>
  );
}
