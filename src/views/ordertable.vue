<template>
  <div id="tablepage">
    <Row :gutter="16">
      <Col span="5" offset="18">
        <Input v-model="search" placeholder="请输入 订单号/桌号进行查询" @on-change="searchs"></Input>
      </Col>
      <Col span="1">
        <Button type="primary" shape="circle" icon="ios-search" v-on:click="searchs"></Button>
      </Col>
    </Row>
    <BR></BR>

    <Row :gutter="16">
      <Col :span="24">
        <Table
          border="true"
          :columns="columns"
          :data="page_video_list"
          ref="table"
          id="tableorder"
          stripe
          highlight-row
        ></Table>
      </Col>
    </Row>

    <BR></BR>
    <Row :gutter="16">
      <Col :span="7" offset="18">
        <Page
          :total="total"
          class="page"
          :current.sync="current"
          :page-size="pageSize"
          @on-change="handleChange"
        ></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
import store from "store";
import expa from "./table-expa.vue";
export default {
  components: { expa },
  methods: {
    remove(){
      
    },
    checkout(order) {
      this.$Modal.confirm({
        title: "提示",
        content: "结账操作后将无法回退:",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          store.dispatch("Checkout", order.orderform).then(re => {
            if (re.code === 200) {
              this.handleChange();
            } else {
              this.$message({
                type: "error",
                message: re.msg
              });
            }
          });
        }
      });
    },
    searchs() {
      this.handleChange();
    },
    handleChange() {
      const pagedata = {
        current: (this.current - 1) * this.pageSize,
        pagesize: this.pageSize,
        seach: this.search
      };
      store.dispatch("InitOrderTable", pagedata).then(re => {
        if (re.code == 200) {
          this.page_video_list = re.result.list;
          this.total = re.result.tolalCount;
        } else {
          this.page_video_list = [];
          this.total = 0;
        }
      });
    },
    initdata() {
      const pagedata = {
        current: 0,
        pagesize: this.pageSize,
        seach: ""
      };
      store.dispatch("InitOrderTable", pagedata).then(re => {
        this.page_video_list = re.result.list;
        this.total = re.result.tolalCount;
        console.log(this.page_video_list[0].orderform);
      });
    }
  },
  mounted() {
    this.initdata();
  },
  data() {
    return {
      search: "",
      total: 0,
      pageSize: 10,
      page_video_list: [],
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expa, {
              props: {
                orderitems: params.row.orderitems
              },on: {
　　　　　　　　　　'Upor': (val) => {
　　　　　　　　　　　　this.handleChange();
　　　　　　　　　　}}
            });
          }
        },
        {
          title: "订单号",
          align: "center",
          render: (h, params) => params.row.orderform.orderformId
        },
        {
          title: "桌号",
          align: "center",
          render: (h, params) => params.row.orderform.deskId
        },
        {
          title: "订单员",
          align: "center",
          render: (h, params) => params.row.orderform.staffName
        },
        {
          title: "菜金",

          align: "center",
          render: (h, params) => params.row.orderform.price
        },

        {
          title: "Action",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.checkout(params.row);
                    }
                  }
                },
                "结账"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "取消订单"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>

<style lang="css" scoped>
#tableorder .ivu-table th {
  text-align: center;
}
</style>
