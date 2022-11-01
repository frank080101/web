import styles from './index.less';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { useState } from 'react';
import ReactEcharts from 'echarts-for-react';

export default function IndexPage() {
  let [formVisible, changeFormVisible] = useState(false);
  let [echartsVisible, changeEchartsVisible] = useState(false);
  const onFinish = (values: any) => {
    message.success('数据筛选完成');
    // window.location.href='./'
    changeFormVisible(false);
    changeEchartsVisible(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  let getOption = () => {
    let option = {
      title: {
        text: 'Stacked Line', //标题，想必大家都清楚
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        //重点还是在这儿，xAxis 理解为X轴
        //其实，这儿还有一个比较好玩的东东，我们可以试着把X,Y里面的对象属性互换一下
        //可以发现，X,Y的内容相换了一下
        //其实，type: 'category'可以理解为是X轴里的分类，我们试想一下，见下面（一）
        type: 'category', //注意一下，这个value值是固定的。
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //data就是分类的一些名字，比如我图例中的 一月、二月、三月
      },
      yAxis: {
        //对应的，这个就是Y轴理解为X轴
        //而对应的值一般是不在这儿定义的，Y轴主要就是先定义一个它的分类属性
        //值是在下面的 series 的对象中定义的。
        type: 'value',
      },
      series: [
        //就是具体的Y里在里面的值了。
        //需要注意的是，因为是一个坐标系，所以值可能会有很多
        //特别是多个分类套娃的时候，
        //比如我刚说的，一月、二月、三月
        //一月（销量、进货量、损耗数量 ）
        //二月（销量、进货量、损耗数量 ）
        //三月（销量、进货量、损耗数量 ）
        //那么，这种情况下，series 它就会是一个数组，里面就是一个一个的小对象，
        //而对像里面，就定义每个小分类的内容了
        //如下官方的代码
        //name 的属性值，代表销量这些
        //type 就是线型 （在这个案例中为固定值）
        //stack 在这个案例中也是固定值
        //data就是每月的数据，是一个数组 有几个大分类就有几个元素
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    return option;
  };
  return (
    <div style={{ width: '1680px', height: '1000px' }}>
      <Button
        onClick={() => {
          changeFormVisible(!formVisible);
          changeEchartsVisible(false);
        }}
      >
        改变表单状态
      </Button>
      <h3 style={{ marginLeft: '50%' }}>title</h3>
      {formVisible && (
        <Form
          id="formChange"
          style={{ margin: '0 auto' }}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="版本号"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
      {echartsVisible && (
        <div style={{ width: '500px', height: '500px', margin: '0 auto' }}>
          <ReactEcharts option={getOption()} />
        </div>
      )}
    </div>
  );
}
