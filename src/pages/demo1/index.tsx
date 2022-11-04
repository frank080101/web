import FilterForm from '@/components/FilterForm';

import style from './index.module.less';

import LineCharts from '@/components/LineCharts';
import { useEffect, useReducer, useState } from 'react';
import { ChartContext, reducer, store } from '@/store';

// import { getCalculate, getCases, getMetrics, getVersions } from '@/api';

export default function () {
  const [params, setParams] = useState(null);

  const [state, dispatch] = useReducer(reducer, store);

  // useEffect(() => {
  //   getVersionsList()
  //   getCalculateList()
  //   getCasesList()
  //   getMetricsList()
  // }, [])

  // const getVersionsList = async () => {
  //   const res = await getVersions()
  //   dispatch({type: 'versions', value: res})
  // }
  // const getCalculateList = async () => {
  //   const res = await getCalculate()
  //   dispatch({type: 'calculate', value: res})
  // }
  // const getCasesList = async () => {
  //   const res = await getCases()
  //   dispatch({type: 'cases', value: res})
  // }
  // const getMetricsList = async () => {
  //   const res = await getMetrics()
  //   dispatch({type: 'metrics', value: res})
  // }

  const onFinish = (val: any) => {
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
            onSubmit={(val: any) => onFinish(val)}
            setLoading={(val: boolean) => setLoading(val)}
          />
        </div>
        <div className={style.right}>
          <LineCharts params={params} />
        </div>
      </div>
    </ChartContext.Provider>
  );
}
