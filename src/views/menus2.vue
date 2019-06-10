<template>
  <div class="menus2">
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
      editable
      @tab-remove="tabremoce"
      @tab-add="tabadd"
    >
      <template v-for="item in mainTabs">
        <el-tab-pane :label="item.categoryName" :name="item.categoryId.toString()">
          <el-row :gutter="70">
            <template v-for="food in foods">
              <el-col :span="4" v-if="food.categoryId == item.categoryId">
                <div
                  @click="cardclick(food)"
                  @mouseenter="mover(food.menusId)"
                  @mouseleave="mout(0)"
                >
                  <el-card
                    class="box-card"
                    :class="cardst==food.menusId?'mover_card':''"
                    :key="food.menusId"
                    shadow="hover"
                    style="border-radius: 4px;"
                  >
                    <div slot="header" class="clearfix">
                      <div @click.stop="remove(food)">
                        <el-button
                          icon="el-icon-delete"
                          style="float: right; padding: 3px 0"
                          type="text"
                        ></el-button>
                      </div>

                      <span>{{food.foodName}}</span>
                    </div>价格:￥
                    <div class="text item">{{food.price}}</div>
                  </el-card>
                </div>
              </el-col>
            </template>
            <ElCol :span="4">
              <div @click="addclick(item)" @mouseenter="mover(1)" @mouseleave="mout(0)">
                <el-card class="box-card" v-bind:class="cardst==1?'mover_card':''" shadow="hover">
                  <div slot="header" class="clearfix">
                    <p style="float: right; padding: 3px 0">&nbsp</p>
                    <span class="spantext">添加</span>
                  </div>
                  <div class="text item">
                    <p>&nbsp</p>
                    <p>&nbsp</p>
                  </div>
                </el-card>
              </div>
            </ElCol>
          </el-row>
        </el-tab-pane>
      </template>
    </el-tabs>
    <Modal v-model="model3" :title="titletext" @on-cancel="cancel">
      <template>
        <el-form ref="formInline" :model="formInline" label-width="80px" :rules="menusrules">
          <el-form-item label="种类；">
            <el-select v-model="formInline.categoryName" @change="changecategory">
              <el-option
                v-for="item in mainTabs"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜名：" prop="foodName">
            <el-input v-model="formInline.foodName" placeholder></el-input>
          </el-form-item>
          <el-form-item label="价格：" prop="price">￥
            <el-input-number
              :controls="false"
              v-model="formInline.price"
              :precision="2"
              :step="0.1"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button v-if="!ifbutton" type="primary" size="large" @click="updatamenus">修改</Button>
        <Button v-if="ifbutton" type="primary" size="large" @click="addmenus">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import store from "store";
export default {
  name: "menus2",

  methods: {
    tabadd() {
      this.$prompt("请输入名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{2,8}$/,
        inputErrorMessage: "命名应该在2~8个字之间"
      })
        .then(({ value }) => {
          store.dispatch("AddCategory", value).then(re => {
            if (re.code === 502) {
              this.$message({
                type: "error",
                message: "名称已存在"
              });
            } else {
              this.$message({
                type: "success",
                message: "成功"
              });
              this.mainTabs=re.result;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    remove(food) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          store.dispatch("DeleteMenus", food.menusId).then(re => {
            if (re.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initdata();
            } else {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
              this.initdata();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          this.initdata();
        });
    },
    addmenus() {
      this.$refs["formInline"].validate(valid => {
        if (valid) {
           store.dispatch("AddMenus", this.formInline).then(re => {
          if (re.code === 200) {
            this.model3 = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.initdata();
          } else {
            this.$message("添加失败");
          }
        });
        }
       
      });
    },
    cancel() {
      this.$refs["formInline"].resetFields();
      this.initdata();
      this.model3 = false;
    },
    addclick(item) {
      this.titletext = "添加";
      (this.ifbutton = true),
        (this.formInline = {
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          createStaffId: 0,
          createTime: "",
          foodName: "",
          menusId: 0,
          price: "",
          storeId: 0,
          usable: 0
        });
      this.model3 = true;
    },
    changecategory(food) {
      this.formInline.categoryName = food.categoryName;
      this.formInline.categoryId = food.categoryId;
    },
    updatamenus() {
      this.$refs["formInline"].validate(valid => {
        if (valid) {
          store.dispatch("UpdataMenus", this.formInline).then(re => {
          if (re.code === 200) {
            this.model3 = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.initdata();
          } else {
            this.$message("修改失败");
          }
        });
        }
        
      });
    },
    mover(categoryId) {
      this.cardst = categoryId;
    },
    mout(categoryId) {
      this.cardst = categoryId;
    },
    cardclick(food) {
      this.titletext = "修改";
      (this.ifbutton = false), (this.formInline = food);
      this.model3 = true;
    },
    tabremoce(CategoryId) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        store.dispatch("DeleteCategoryId", CategoryId).then(re => {
          if (re.code === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.initdata();
          } else if (re.code === 500) {
            this.$message({
              message: "删除失败: 该类下存在菜品",
              type: "success"
            });
          }
        });
      });
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
      ifbutton: false,
      titletext: "",
      value: "",
      model3: false,
      cardst: "",
      cardmover: false,
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
      menusrules: {
        foodName: [{ validator: validatenull, trigger: "blur" }],
        price: [{ validator: validatenumber, trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang="" scoped>
.el-col {
  margin-bottom: 40px;
}
.box-card {
  background: #ee7600;
}
.mover_card {
  background: #eead0e;
}
.spantext {
  font-family: "PingFang SC";
}
</style>