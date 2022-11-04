import { ChartContext, store } from '@/store';
import { Form, Select, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { submit, getCalculate, getCases, getMetrics, getVersions } from '@/api';
interface FormProps {
  ref?: any;
  onSubmit: Function;
  setLoading: Function;
}

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export default function (props: FormProps) {
  const [form] = Form.useForm();

  const [versions, setVersions] = useState([]);
  const [calculate, setCalculate] = useState([]);
  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const { loading } = useContext(ChartContext);

  const getVersionsList = async () => {
    const res = await getVersions();
    setVersions(res);
  };
  const getCalculateList = async () => {
    const res = await getCalculate();
    setCalculate(res);
  };
  const getCasesList = async () => {
    const res = await getCases();
    setCases(res);
  };
  const getMetricsList = async () => {
    const res = await getMetrics();
    setMetrics(res);
  };

  // 获取列表
  useEffect(() => {
    getVersionsList();
    getCalculateList();
    getCasesList();
    getMetricsList();
  }, []);

  const onSubmit = async (values: any) => {
    props.setLoading(true);
    // 请求接口
    const res = await submit(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    props.onSubmit(res);
    props.setLoading(false);
  };

  return (
    <>
      <h1>You Title</h1>
      <Form {...formLayout} form={form} onFinish={onSubmit}>
        <Form.Item name="versions" label="versions">
          <Select mode="multiple" allowClear placeholder="Please select">
            {versions.map((item: any, index: number) => {
              return <Select.Option key={index}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="metrics" label="metrics">
          <Select mode="multiple" allowClear placeholder="Please select">
            {metrics.map((item: any, index: number) => {
              return <Select.Option key={index}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="cases" label="cases">
          <Select mode="multiple" allowClear placeholder="Please select">
            {cases.map((item: any, index: number) => {
              return <Select.Option key={index}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="calculate" label="calculate">
          <Select mode="multiple" allowClear placeholder="Please select">
            {calculate?.map((item: any, index: number) => {
              return <Select.Option key={index}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
