<template >
  <div id="tablepage">
    <Row :gutter="16">
      <Col span="5">
        <Button type="primary" shape="circle" v-on:click="modal2=true">添加</Button>
      </Col>

      <Col span="5" offset="13">
        <Input v-model="search" placeholder="搜索" @on-change="searchs"></Input>
      </Col>
      <Col span="1">
        <Button type="primary" shape="circle" icon="ios-search" v-on:click="searchs"></Button>
      </Col>
    </Row>
    <BR></BR>
    <Row :gutter="16">
      <Col :span="24">
        <Table :columns="columns" :data="page_video_list" ref="table"></Table>
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

    <Modal
      v-model="modal1"
      title="信息修改"
      width="900"
      ok-text="保存"
      @on-ok="handleSubmit('formInline')"
      @on-cancel="handleChange"
    >
      <Form ref="formInline" :model="formInline" inline :label-width="80">
        <FormItem prop="staffName" label="姓名:">
          <Input type="text" v-model="formInline.staffName" placeholder="staffName"></Input>
        </FormItem>
        <FormItem prop="staffSex" label="性别:">
          <el-select v-model="formInline.staffSex" placeholder="请选择" size="small">
            <el-option
              v-for="item in Sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </FormItem>
        <FormItem prop="contactNumber" label="联系电话:">
          <Input type="text" v-model="formInline.contactNumber" placeholder="contactNumber"></Input>
        </FormItem>
        <FormItem prop="createName" label="创建人姓名:">
          <Input
            type="text"
            v-model="formInline.createName"
            placeholder="createName"
            readonly="readonly"
          ></Input>
        </FormItem>
        <FormItem prop="createTime" label="入职时间:">
          <Input
            type="text"
            v-model="formInline.createTime"
            placeholder="createTime"
            readonly="readonly"
          ></Input>
        </FormItem>
        <FormItem prop="dutyName" label="职务:">
          <el-select
            v-model="formInline.dutyName"
            placeholder="请选择"
            size="small"
            @change="currentSel"
          >
            <el-option v-for="item in duty" :key="item.dutyId" :label="item.dutyName" :value="item"></el-option>
          </el-select>
        </FormItem>
        <FormItem prop="idCardNo" label="证件号:">
          <Input type="text" v-model="formInline.idCardNo" placeholder="idCardNo"></Input>
        </FormItem>
        <FormItem prop="address" label="地址:">
          <Input type="text" v-model="formInline.address" placeholder="address"></Input>
        </FormItem>
        <FormItem prop="dutyStatus" label="在职状态:">
          <el-select v-model="formInline.dutyStatus" placeholder="请选择" size="small">
            <el-option
              v-for="item in dutystatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modal2"
      title="添加信息"
      width="900"
      ok-text="添加"
      @on-ok="addstaff"
      @on-cancel="handleChange    "
    >
      <Form ref="formInline" :model="formInline" inline :label-width="80">
        <FormItem prop="staffName" label="姓名:">
          <Input type="text" v-model="formInline.staffName" placeholder="staffName"></Input>
        </FormItem>
        <FormItem prop="staffSex" label="性别:">
          <el-select v-model="formInline.staffSex" placeholder="请选择" size="small">
            <el-option
              v-for="item in Sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </FormItem>
        <FormItem prop="contactNumber" label="联系电话:">
          <Input type="text" v-model="formInline.contactNumber" placeholder="contactNumber"></Input>
        </FormItem>
        <FormItem prop="dutyName" label="职务:">
          <el-select
            v-model="formInline.dutyName"
            placeholder="请选择"
            size="small"
            @change="currentSel"
          >
            <el-option v-for="item in duty" :key="item.dutyId" :label="item.dutyName" :value="item"></el-option>
          </el-select>
        </FormItem>
        <FormItem prop="idCardNo" label="证件号:">
          <Input type="text" v-model="formInline.idCardNo" placeholder="idCardNo"></Input>
        </FormItem>
        <FormItem prop="address" label="地址:">
          <Input type="text" v-model="formInline.address" placeholder="address"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import store from "store";

export default {
  
  methods: {
    addstaff() {
      store.dispatch("AddStaff", this.formInline).then(re => {
        this.handleChange(this.current);
      });
      this.initf();
    },
    initf() {
      this.formInline = {
        staffName: "",
        contactNumber: "",
        createId: "",
        createName: "",
        createTime: "",
        dutyId: "2",
        dutyName: "店员",
        dutyStatus: "",
        idCardNo: "",
        passWord: "",
        staffId: "",
        staffSex: "男",
        address: "",
        storeId: "",
        storeName: "",
        usable: "",
        userName: ""
      };
    },
    remove(index) {

      this.$Modal.confirm({
        title: "警告",
        content: "确定要删除:" + index.staffName + "？",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.delete(index.staffId);
        }
      });
    },
    delete(staffId) {
      store.dispatch("DeleteStaff", staffId).then(re => {
        this.handleChange(this.current);
      });
    },
    currentSel(selVal) {
      this.formInline.dutyName = selVal.dutyName;
      this.formInline.dutyId = selVal.dutyId;
      this.dialogVisible = true;
    },
    cancel() {},
    handleSubmit() {
      console.log(this.formInline);
      store.dispatch("UpdataStaff", this.formInline).then(re => {
        this.handleChange(this.current);
      });
    },
    show(staff) {
      this.modal1 = true;
      this.formInline = staff;
    },
    searchs() {
      this.current = 1;
      this.handleChange();
    },
    handleChange: function() {
      this.initf();
      const pagedata = {
        current: (this.current - 1) * this.pageSize,
        pagesize: this.pageSize,
        seach: this.search
      };
      store.dispatch("GetListStaff", pagedata).then(re => {
        console.log(this.current);
        this.page_video_list = re.result.list;
        this.total = re.result.tolalCount;
      });
    },
    initdata: function() {
      const pagedata = {
        current: 0,
        pagesize: this.pageSize,
        seach: ""
      };
      store.dispatch("GetDutyName").then(re => {
        this.duty = re.result;
      });
      store.dispatch("GetListStaff", pagedata).then(re => {
        this.page_video_list = re.result.list;
        this.total = re.result.tolalCount;
      });
    }
  },
  mounted() {
    this.initdata();
  },
  data() {
    return {
      current: 1,
      duty: [],
      dutystatus: [
        {
          value: 1,
          label: "在职"
        },
        {
          value: 0,
          label: "离职"
        }
      ],
      Sex: [
        {
          value: "女",
          label: "女"
        },
        {
          value: "男",
          label: "男"
        }
      ],
      modal1: false,
      modal2: false,
      formInline: {
        staffName: "",
        contactNumber: "",
        createId: "",
        createName: "",
        createTime: "",
        dutyId: "2",
        dutyName: "店员",
        dutyStatus: "",
        idCardNo: "",
        passWord: "",
        address: "",
        staffId: "",
        staffSex: "男",
        storeId: "",
        storeName: "",
        usable: "",
        userName: ""
      },
      search: "",
      value: "",
      total: 0,
      pageSize: 10,
      page_video_list: [],
      columns: [
        {
          title: "姓名",
          key: "staffName"
        },
        {
          title: "性别",
          key: "staffSex"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "职务",
          key: "dutyName"
        },
        {
          title: "入职时间",
          key: "createTime"
        },
        {
          title: "所属店铺",
          key: "storeName"
        },

        {
          title: "Action",
          key: "action",
          width: 150,
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
                      this.show(params.row);
                    }
                  }
                },
                "详情"
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
                "离职  "
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
</style>
