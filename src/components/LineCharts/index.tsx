import { ChartContext } from '@/store';
import ReactEcharts from 'echarts-for-react';
import { useContext, useMemo } from 'react';

import style from './index.module.less';

const option: any = {
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
    boundaryGap: false,
    data: [],
    //data就是分类的一些名字，比如我图例中的 一月、二月、三月
  },
  yAxis: {
    type: 'value',
  },
  series: [],
};

export default function (props: any) {
  const context = useContext(ChartContext);
  const chartOption = useMemo(() => {
    if (!props?.params) return option;
    let copy = { ...option };
    // 添加 legend
    copy.legend.data = Object.keys(props?.params).filter(
      (i) => i != 'versions',
    );
    // 添加横坐标
    copy.xAxis.data = props.params?.versions || [];
    // 添加纵坐标的值
    copy.series = [];
    copy.legend.data?.forEach((item: any) => {
      copy.series.push({
        name: item,
        type: 'line',
        stack: 'Total',
        data: props.params[item] || [],
      });
    });
    return copy;
  }, [props.params]);

  return (
    <div className={style.ecahrts} style={{ width: '100%' }}>
      {props.params || context.loading ? (
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
