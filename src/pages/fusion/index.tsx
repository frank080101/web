import FilterForm from '@/components/FilterForm';

import style from './index.module.less';

import LineCharts from '@/components/LineCharts';
import { useEffect, useReducer, useState } from 'react';
import { ChartContext, reducer, store } from '@/store';
import { Table, Checkbox } from 'antd';
import { getTableData } from '@/api';

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

const columns: any[] = [
  {
    title: 'ID',
    key: 'ID',
    render: (_: any, __: any, index: number) => `${index + 1}`,
  },
  {
    title: 'version',
    dataIndex: 'version',
  },
  {
    title: 'reason',
    dataIndex: 'reason',
  },
  {
    title: 'predictable',
    dataIndex: 'predictable',
    render: (text: boolean | null, record: any, index: number) => {
      let selected = [record];
      const onChange = (val: any) => {
        selected = [val];
      };
      return (
        <Checkbox.Group
          value={selected}
          options={optionsWithDisabled}
          onChange={onChange}
        ></Checkbox.Group>
      );
    },
  },
];

export default function () {
  const [params, setParams] = useState(null);

  const [state, dispatch] = useReducer(reducer, store);

  const [tableData, setTableData] = useState([]);

  const onFinish = async (val: any) => {
    // paint
    setParams(val);
    // 获取表格数据
    const res = await getTableData();
    setTableData(res);
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
              rowKey="version"
            />
          </div>
        </div>
      </div>
    </ChartContext.Provider>
  );
}
