<template>
  <div class="orderdishes">
    <!--<Tabs value="name1">
      <template v-for="item in mainTabs">
        <TabPane :label="item.name" :name="item.name">
          <template>
              
          </template>
        </TabPane>
      </template>
    </Tabs>-->
    <el-tabs
      type="border-card"
      :value="mainTabs[0].categoryId.toString()"
      :class="tabssty?'tabssty':''"
    >
      <template v-for="item in mainTabs">
        <el-tab-pane :label="item.categoryName" :name="item.categoryId.toString()">
          <el-row :gutter="70">
            <template v-for="food in foods">
              <el-col :span="4" v-if="food.categoryId == item.categoryId" class="colfood">
                <div
                  @click="cardclick(food)"
                  @mouseenter="mover(food.menusId)"
                  @mouseleave="mout(0)"
                >
                  <el-card
                    class="box-card foods"
                    :class="cardst==food.menusId?'mover_card':''"
                    :key="food.menusId"
                    shadow="hover"
                    style="border-radius: 4px;"
                  >
                    <div slot="header" class="clearfix">
                      <span>{{food.foodName}}</span>
                    </div>价格:￥
                    <div class="text item">{{food.price}}</div>
                  </el-card>
                </div>
              </el-col>
            </template>
          </el-row>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import store from "store";
import Cookies from "js-cookie";
export default {
  name: "orderdishes",

  methods: {
    updeskid(){
      var s = this.deskid
      this.$emit("upd", s);
    },
    cardclick(food) {
      var s = jQuery.extend({}, food);
      s.num = 1;
      this.$emit("setfood", s);
    },
    mover(categoryId) {
      this.cardst = categoryId;
    },
    mout(categoryId) {
      this.cardst = categoryId;
    },
    initdata() {
      store.dispatch("MenusInit").then(re => {
        this.mainTabs = re.result.categorys;
        this.foods = re.result.menuss;
      });
    }
  },
  mounted() {
    this.initdata();
  },
  data() {
    var validatenull = (rule, value, callback) => {
      if (this.formInline.foodName === "") {
        callback(new Error("菜名不能为空"));
      } else if (this.formInline.foodName.length > 10) {
        callback(new Error("超过最大字符数"));
      } else {
        callback();
      }
    };
    var validatenumber = (rule, value, callback) => {
      var ss = this.formInline.price;
      var s = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
      if (this.formInline.price === 0 || this.formInline.price === undefined) {
        callback(new Error("    售价不能为空"));
      } else if (!s.test(this.formInline.price)) {
        callback(new Error("    不合法的字符"));
      } else {
        callback();
      }
    };
    return {
      deskid:"",
      value: "",
      cardst: "",
      tabssty: false,
      mainTabs: [{ categoryId: "" }],
      foods: [],
      formInline: {
        categoryId: 0,
        categoryName: "",
        createStaffId: 0,
        createTime: "",
        foodName: "",
        menusId: 0,
        price: "",
        storeId: 0,
        usable: 0
      },
      foodorder: {
        staff: "",
        deskid: 0,
        orderid: "",
        foods: []
      }
    };
  }
};
</script>

<style lang="" scoped>
.colfood {
  margin-bottom: 40px;
}
.foods {
  background: #ee7600;
}
.mover_card {
  background: #eead0e;
}
.spantext {
  font-family: "PingFang SC";
}
.tabssty {
  width: 80%;
}
.orfood {
  height: 750px;
}
</style>