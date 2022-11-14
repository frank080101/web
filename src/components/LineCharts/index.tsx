import { ChartContext } from '@/store';
import ReactEcharts from 'echarts-for-react';
import { useContext, useMemo } from 'react';
import { Spin } from 'antd';
import style from './index.module.less';

const getOption: any = () => ({
  animationDuration: 1000,
  title: {
    text: '', //标题，想必大家都清楚
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [],
  },
  grid: {
    left: '20px',
    right: '5%',
    top: '15%',
    bottom: '10%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 0,
    },
    // max: 10,
    boundaryGap: false,
    data: [],
    //data就是分类的一些名字，比如我图例中的 一月、二月、三月
  },
  yAxis: {
    type: 'value',
  },
  series: [],
});

let echartWidth = '100%';

const MAX_XAXIS_COUNT = 10;

const XAXIS_WIDTH = 120;

export default function (props: any) {
  const context = useContext(ChartContext);
  const chartOption = useMemo(() => {
    let copy = getOption();
    if (!props?.params) return copy;
    // 添加 legend
    copy.legend.data = Object.keys(props?.params).filter(
      (i) => i != 'versions',
    );
    // 添加横坐标
    copy.xAxis.data = props.params?.versions || [];
    if (copy.xAxis.data?.length >= MAX_XAXIS_COUNT) {
      echartWidth = MAX_XAXIS_COUNT * XAXIS_WIDTH + 'px';
    } else {
      echartWidth = '100%';
    }
    // 添加纵坐标的值
    copy.legend.data?.forEach((item: any) => {
      copy.series.push({
        name: item,
        type: 'line',
        data: props.params[item] || [],
      });
    });
    return copy;
  }, [props.params]);

  return (
    <div className={style.ecahrts} style={{ width: echartWidth }}>
      {context.loading ? (
        <Spin
          spinning={true}
          style={{ width: '100%', lineHeight: '500px' }}
        ></Spin>
      ) : props.params ? (
        <ReactEcharts
          option={chartOption}
          loadingOption={{
            text: '加载中...',
          }}
          showLoading={context.loading}
        />
      ) : (
        <div className={style.notData}>请先选择左侧筛选数据</div>
      )}
    </div>
  );
}
