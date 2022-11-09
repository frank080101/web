import FilterForm from '@/components/FilterForm';

import style from './index.module.less';

import LineCharts from '@/components/LineCharts';
import { useEffect, useReducer, useState } from 'react';
import { ChartContext, reducer, store } from '@/store';
import { Table } from 'antd';
import { getTableData } from '@/api';

const columns: any[] = [
  {
    title: 'ID',
    key: 'ID',
    render: (_: any, __: any, index: number) => `${index + 1}`,
  },
  {
    title: 'version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'reason',
    dataIndex: 'reason',
    key: 'reason',
  },
];

export default function () {
  const [params, setParams] = useState(null);

  const [state, dispatch] = useReducer(reducer, store);

  const [tableData, setTableData] = useState([]);

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
            type="fusion"
            onSubmit={(val: any) => onFinish(val)}
            setLoading={(val: boolean) => setLoading(val)}
          />
        </div>
        <div className={style.right}>
          <LineCharts params={params} />
          <div style={{ marginTop: '20px' }}>
            <Table
              dataSource={tableData}
              columns={columns}
              loading={state.loading}
            />
          </div>
        </div>
      </div>
    </ChartContext.Provider>
  );
}
