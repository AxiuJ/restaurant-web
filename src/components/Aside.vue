<template>
  <aside class="aside-menu px-4">
    <div class="aside-options">
      <div class="clearfix mt-4">
        <h6>
          <b>订单：</b>
        </h6>
      </div>
    </div>
    <br>
    <div>
      <el-input placeholder="请输入内容" v-model="deskid" size="mini">
        <template slot="prepend">桌号</template>
      </el-input>
    </div>
    <br>
    <h6>点单员:&nbsp&nbsp{{name}}</h6>
    <hr>
    <Scroll :height="600">
      <div v-for="(food,index) in foods">
        <el-button
          type="success"
          class="el-icon-delete weizi"
          @click="deletefood(food,index)"
          title="删除一份"
        ></el-button>
        <h6 class="text-muted">
          <b v-text="food.foodName"></b>
        </h6>
        <h7>
          数量:
          <b v-text="food.num"></b>&nbsp&nbsp&nbsp&nbsp价格:&nbsp
          <b v-text="food.price*food.num"></b>元
        </h7>
        <hr>
      </div>
    </Scroll>
    <hr>
    <br>
    <H4>总价:&nbsp&nbsp{{totel}}</H4>
    <br>
    <el-button type="primary" @click="quxiao">取消订单</el-button>
    <el-button type="primary" @click="xiadan">下单</el-button>
  </aside>
</template>

<script>
import store from "store";
import Cookies from "js-cookie";
export default {
  name: "#app",
  methods: {
    deletefood(food, index) {
      food.num--;
      if (food.num !== 0) {
        this.foods.splice(index, 1, food);
      }
      if (food.num === 0) {
        this.foods.splice(index, 1);
      }
    },
    quxiao() {
      this.foods.splice(0);
      this.$message({
        type: "ifo",
        message: "订单已取消"
      });
      this.deskid=""
    },

    xiadan() {
      var foods = this.foods;
      var price = this.totel;
      var deskid = this.deskid;
      if (deskid !== "" && foods.length !== 0) {
        store.dispatch("AddOrder", { foods, price, deskid }).then(re => {
          if (re.code === 200) {
            this.$message({
              type: "success",
              message: "下单成功：单号 " + re.result
            });
            this.foods.splice(0);
            this.deskid=""
          } else {
            this.$message({
              type: "error",
              message: "下单失败"
            });
            this.foods.splice(0);
            this.deskid=""
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "没填桌号？还是没有点菜？"
        });
        
      }
    }
  },
  watch: {
    foods(newfoods, oldfoods) {
      var o = 0;
      this.foods.forEach(element => {
        o = element.num * element.price + o;
      });
      this.totel = o;
    }
  },
  data() {
    return {
      deskid:"",
      totel: 0,
      name: Cookies.get("name")
    };
  },
  props: [ "foods"]
};
</script>
<style type="text/css">
.wz-progress-show-info .wz-progress-outer {
  padding-right: 0px;
  margin-right: 0px;
}
.weizi {
  border-radius: 7000px;
  float: right;
  padding: 3px 0;
}
</style>


<style scoped>
.text-muted {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.demo-i-circle-custom h1 {
  color: #3f414d;
  font-size: 28px;
  font-weight: normal;
}
.demo-i-circle-custom p {
  color: #657180;
  font-size: 14px;
  margin: 10px 0 15px;
}
.demo-i-circle-custom span {
  display: block;
  padding-top: 15px;
  color: #657180;
  font-size: 14px;
}
/*  .demo-i-circle-custom:before{
                content: '';
                display: block;
                width: 80px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: 100px;
            };*/
.demo-i-circle-custom span i {
  font-style: normal;
  color: #3f414d;
}
</style>
