import { ChartContext, store } from '@/store';
import { Form, Select, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { submit, getCases, getMetrics, getVersions } from '@/api';


const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export default function (props: any) {
  const [form] = Form.useForm();

  const [versions, setVersions] = useState([]);
  const [calculate, setCalculate] = useState([]);
  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const { loading } = useContext(ChartContext);

  const getVersionsList = async () => {
    const res = (await getVersions({type: props.type})) || [];
    setVersions(res);
    form.setFieldValue('versions', res.slice(-10))
  };
  // const getCalculateList = async () => {
  //   const res = await getCalculate() || [];
  //   setCalculate(res);
  // };
  const getCasesList = async () => {
    const res = await getCases({type: props.type}) || [];
    let tmp:any = res;
    setCases(res);
    if(props.type==="segmentation"){
      tmp = res.filter((item: any, index: number)=>{
        return item.indexOf("total")!=-1
      })
    }
    else if(props.type==="fusion"){
      // tmp = JSON.parse(JSON.stringify(["total"]));
      tmp = ["total"]
    }
    form.setFieldValue('cases', tmp)
  };
  const getMetricsList = async () => {
    const res = await getMetrics({type: props.type}) || [];
    let tmp:any = res
    setMetrics(res);
    if(props.type==="fusion"){
      tmp = res.filter((item: any, index: number)=>{
        return index!=1&&index!=2&&index!=3
      })
    }
    form.setFieldValue('metrics', tmp)
  };


  // 获取列表
  useEffect(() => {
    getVersionsList();
    // getCalculateList();
    getCasesList();
    getMetricsList();
  }, []);

  const onSubmit = async (values: any) => {
    props.setLoading(true);
    // 请求接口
    values.type = props.type
    try {
      const res = await submit(values);
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      props.onSubmit(res);
      props.setLoading(false);
    } catch(e) {
      props.setLoading(false);
    }
    
    
  };

  return (
    <>
      <h1>Perception</h1>
      <Form {...formLayout} form={form} onFinish={onSubmit}>
        <Form.Item name="versions" label="versions">
          <Select mode="multiple" allowClear placeholder="Please select" showSearch>
            {versions?.map((item: any, index: number) => {
              return <Select.Option key={item}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="metrics" label="metrics">
          <Select mode="multiple" allowClear placeholder="Please select"showSearch>
            {metrics?.map((item: any, index: number) => {
              return <Select.Option key={item}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="cases" label="cases">
          <Select mode="multiple" allowClear placeholder="Please select"showSearch>
            {cases?.map((item: any, index: number) => {
              return <Select.Option key={item}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        {/* <Form.Item name="calculate" label="calculate">
          <Select mode="multiple" allowClear placeholder="Please select"showSearch>
            {calculate?.map((item: any, index: number) => {
              return <Select.Option key={item}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item> */}
        <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
