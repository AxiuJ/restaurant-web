<style scoped>
.el-row {
  margin-bottom: 10px;
}
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <el-row>
      <el-col :span="8">
        <center>
          <h2>菜品名称</h2>
        </center>
      </el-col>
      <el-col :span="8">
        <center>
          <h2>菜品数量</h2>
        </center>
      </el-col>
      <el-col :span="8">
        <center>
          <h2>价格</h2>
        </center>
      </el-col>
    </el-row>
    <br>
    <Scroll :height="200">
      <div v-for="(orderitem,index) in orderitems">
        <el-row class="orderrow" v-if="orderitem.num!==0">
          <el-col :span="8">
            <center>
              <h6 v-text="orderitem.foodName" style="border:1px"></h6>
            </center>
          </el-col>
          <center>
            <el-col :span="8">
              <el-input-number
                v-model="orderitem.num"
                @change="handleChange(orderitem)"
                label="数量"
                size="mini"
              ></el-input-number>
            </el-col>
          </center>
          <center>
            <el-col :span="8">
              <h6 v-text="orderitem.totalfee"></h6>
            </el-col>
          </center>
        </el-row>
      </div>
    </Scroll>
    <el-row>
      <el-col :span="8">
        <center>
          <el-button type="primary" @click="savenum">保存</el-button>
        </center>
      </el-col>
      <el-col :span="1">
        <center>
          <el-button type="primary" @click="cancelnum">取消</el-button>
        </center>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import store from "store";
export default {
  methods: {
    savenum() {
      store.dispatch("Uporder", this.orderitems).then(re => {
        if (re.code === 200) {
          this.$emit("Upor");
        } else {
          this.$message({
            type: "error",
            message: re.msg
          });
        }
      });
    },
    cancelnum() {
      this.$emit("Upor");
    },
    handleChange(orderitem) {
      orderitem.totalfee = orderitem.num * orderitem.price;
      console.log(orderitem);
    }
  },
  props: {
    totel: 0,
    orderitems: []
  }
};
</script>
