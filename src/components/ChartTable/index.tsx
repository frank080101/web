import { ChartContext } from '@/store';
import { useContext, useEffect, useState } from 'react';
import { Table, Radio, Modal } from 'antd';

import { setTableItemStatus, getTableData } from '@/api';

const optionsWithDisabled = [
  { label: '是', value: true },
  { label: '否', value: false },
];

function TableCheckBox(props: any) {
  const [selected, setSelected] = useState<boolean | null>(null);
  /** 临时选择 */
  const [tempSelected, setTempSelected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(props.value);
  }, []);

  const onOk = async () => {
    console.log(props.type);
    setLoading(true);
    // 调更改状态的接口，tempSelected 就是要传的值
    // 这个接口如果要区分在哪个页面的话，可以和渲染表格一样传多个 type 到后端去判断
    // 页面都是一样的，我帮你复制好了，你改了这个页面另一个页面也要改一下e
    const res = await setTableItemStatus({
      status: tempSelected,
      type: props.type,
    });
    // 接口调用成功时返回一个成功的标志字段，这里用 code 作示例
    if (res.code == 1) {
      // 调用成功就更改表格的状态，并关闭弹框
      setSelected(tempSelected);
      setOpen(false);
      setLoading(false);
    }
    // 失败和取消不作任何操作
    // 无论成功失败，重置临时变量
    setTempSelected(null);
  };

  const onRadioClick = (value: boolean | null) => {
    value = value === selected ? null : value;
    setTempSelected(value);
    setOpen(true);
  };
  return (
    <>
      <Radio.Group value={selected}>
        {optionsWithDisabled.map((item) => (
          <Radio
            value={item.value}
            key={item.value + ''}
            onClick={() => onRadioClick(item.value)}
          >
            {item.label}
          </Radio>
        ))}
      </Radio.Group>

      <Modal
        // title 写弹框的标题，不要就删掉
        title="Modal"
        open={open}
        onOk={onOk}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
        confirmLoading={loading}
      >
        {/* 这里写有要提示的文字 */}
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
}

const columns = (type: string): any[] => {
  return [
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
      render: (text: boolean | null, record: any, index: number) => (
        <TableCheckBox value={text} type={type} />
      ),
    },
  ];
};

export default function (props: any) {
  const context = useContext(ChartContext);
  const [tableData, setTableData] = useState([]);

  const _getTableData = async () => {
    // 获取表格数据
    const res = await getTableData({ type: props.type });
    setTableData(res);
  };

  useEffect(() => {
    _getTableData();
  }, []);

  return (
    <Table
      dataSource={tableData}
      columns={columns(props.type)}
      loading={context.loading}
      rowKey="version"
      style={{ width: '100%' }}
    />
  );
}
