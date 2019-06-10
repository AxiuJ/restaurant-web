<template>
  <Row>
    <Col :span="24">
      <chart :options="option" class="echarts"></chart>
    </Col>
  </Row>
</template>

<style scoped>
.echarts {
  height: 500px;
  width: 100%;
  border-radius: 25px;
}
</style>

<script>
import store from "store";
var xData = (function() {
  var data = [];
  for (var i = 1; i < 32; i++) {
    data.push(i + "号");
  }
  return data;
})();
var topdata =[];
export default {
  methods: {
    judata() {
      var data = [];
      var resultdata = {};
      store.dispatch("GetChartData").then(re => {
        if (re.code == 200) {
          re.result.forEach(element => {
            data.push(this.adddata(element));
          });
        }
      });
      return data;
    },
    adddata(element) {
      var item = {
        name: "",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        itemStyle: {
          normal: {
            barBorderRadius: 0,
            label: {
              show: true,
              position: "top",
              formatter: function(p) {
                return p.value > 0 ? p.value : "";
              }
            }
          }
        },
        data: []
      };
      item.name = element.name;
      topdata.push(element.name);
      item.data = element.totals;
      return item;
    }
  },
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      option: {
        backgroundColor: "#344b58", //背景
        color: [
          "#c23531",
          "#FFF",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        title: {
          text: "工作统计", //标题
          x: "4%", //位置

          textStyle: {
            color: "#fff", //标题颜色
            fontSize: "22"
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          x: "4%",
          top: "11%",
          textStyle: {
            color: "#90979c"
          },
          data: topdata //数据类型 需要从后台获取
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: this.judata()
      }
    };
  }
};
</script>