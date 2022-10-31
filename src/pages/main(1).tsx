import {
  AutoComplete,
  Button,
  Form,
  Select,
  Modal,
  message,
  Layout,
} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ReactEcharts from 'echarts-for-react';

const { Header, Content } = Layout;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

let resObj: any = {};
const App: React.FC = () => {
  let [modalVisible, changeModalVisible] = useState(false);
  let [echartsVisible, changeEchartsVisible] = useState(false);
  let [buttonVisible, changeButtonVisible] =useState(true);

  const [form] = Form.useForm();

  const cancel = () => {
    changeModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // message.success('数据筛选完成');
    // changeEchartsVisible(true);
  };

  const versions: React.ReactNode[] = [];

  const [versions1, setversions1]: any = useState([]);

  const metrics: React.ReactNode[] = [];

  const [metrics1, setmetrics1]: any = useState([]);

  const cases: React.ReactNode[] = [];

  const [cases1, setcases1]: any = useState([]);

  const calculate: React.ReactNode[] = [];

  const [calculate1, setcalculate1]: any = useState([]);

  function Fn(key: any, setParams: any, arr: any) {
    useEffect(() => {
      const fetchData = async () => {
        axios.get('http://10.64.36.78:5000/' + key).then((res) => {
          if (res.status === 200) {
            console.log(res);

            res.data[key].forEach((element: any, index: any) => {
              arr.push(<Option key={index}>{element}</Option>);
            });
            resObj[key] = res.data[key];
            console.log(resObj, 111232);
            setParams(arr);
          }
        });
      };
      fetchData();
    }, []);
  }

  Fn('versions', setversions1, versions);
  Fn('metrics', setmetrics1, metrics);
  Fn('cases', setcases1, cases);
  Fn('calculate', setcalculate1, calculate);

  // let backObj: any = JSON.parse(JSON.stringify(resObj));
  let backObj: any = {};
  backObj['versions'] = [];
  backObj['metrics'] = [];
  backObj['cases'] = [];
  backObj['calculate'] = [];

  Object.keys(resObj).forEach((val) =>
    resObj[val].forEach((val1, index) => {
      backObj[val].push(index + '');
    }),
  );

  const handleChange = (value: any, arrValue: any) => {
    console.log(`selected ${value}`, arrValue);
    backObj[value] = arrValue;
  };

  let plotObj: any = {};
  let optionCharts: any={};

  function testFn(arr, key) {
    return arr.filter((val, index) => backObj[key].includes('' + index));
  }
  const sendData = async () => {
    let { versions, metrics, cases, calculate } = resObj; // quanji
    axios
      .post('http://10.64.36.78:5000/send', {
        versions: testFn(versions, 'versions'),
        metrics: testFn(metrics, 'metrics'),
        cases: testFn(cases, 'cases'),
        calculate: testFn(calculate, 'calculate'),
      })
      .then(function (response) {
        changeModalVisible(false);
        message.success('数据筛选完成');
        changeEchartsVisible(true);
        changeButtonVisible(false);
        console.log(response);
        plotObj = JSON.parse(JSON.stringify(response.data));
        let legend = Object.keys(plotObj).filter((val, index) => val !== 'versions');
        optionCharts= {
            title: {
              text: '可视化图表格', //标题，想必大家都清楚
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: legend,
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '20%',
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: 'category', //注意一下，这个value值是固定的。
              boundaryGap: false,
              data: plotObj['versions'],
              //data就是分类的一些名字，比如我图例中的 一月、二月、三月
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: legend[0]+"",
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                name: legend[1]+"",
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310],
              },
            ],
          };
      })
      .catch(function (error) {
        return error;
      });
  };

  let legend = Object.keys(plotObj).filter((val, index) => val !== 'versions');



  return (
    <Layout>
      <Header>
        <div
          style={{
            lineHeight: '70px',
            fontSize: '30px',
            color: 'white',
            textAlign: 'left',
          }}
        >
          指标可视化平台
        </div>
      </Header>

      <Content style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
          {buttonVisible&&(<Button
            style={{
              position: 'absolute',
              left: '50%',
              top: '80px',
              width: '150px',
              height: '60px',
            }}
            onClick={() => {
              changeModalVisible(!modalVisible);
              // changeEchartsVisible(false)
            }}
          >
            生成图表
          </Button>)}
          <Modal
            visible={modalVisible}
            title="选择参数"
            okText="应用"
            onOk={sendData}
            style={{ top: 20 }}
            width={850}
            cancelText="取消"
            onCancel={cancel}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item name="versions" label="Version">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={versions1}
                  onChange={handleChange.bind(this, 'versions')}
                >
                  {versions1}
                </Select>
              </Form.Item>
              <Form.Item name="metrics" label="Metric">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={metrics1}
                  onChange={handleChange.bind(this, 'metrics')}
                >
                  {metrics1}
                </Select>
              </Form.Item>
              <Form.Item name="cases" label="Case">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={cases1}
                  onChange={handleChange.bind(this, 'cases')}
                >
                  {cases1}
                </Select>
              </Form.Item>
              <Form.Item name="calculate" label="calculate">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={calculate1}
                  onChange={handleChange.bind(this, 'calculate')}
                >
                  {calculate1}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          {echartsVisible && (
            <div style={{ width: '500px', height: '500px', margin: '0 auto' }}>
              <ReactEcharts option={optionCharts} />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default App;
