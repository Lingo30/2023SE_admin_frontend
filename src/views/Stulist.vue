<template>
  <div class="full">
    <Header></Header>

    <div class="row">
      <div class="nav">
        <Nav defaultValue="1-1"></Nav>
      </div>
      <div class="table column">
        <!-- <div style="margin-bottom: 2rem">
          <t-upload accept=".xlsx" v-model="file" @change="uploadFile">
            <t-tooltip
              content="支持.xlsx格式文件导入，xlsx仅包含一个sheet且每行从左到右为姓名、院校、邮箱，默认密码为123456"
            >
              <t-button>导入新用户</t-button>
            </t-tooltip>
          </t-upload>
        </div> -->
        <t-table
          rowKey="email"
          :data="table"
          :columns="columns"
          stripe
          bordered
          size="medium"
          :table-layout="tableLayout ? 'auto' : 'fixed'"
          :pagination="pagination"
          showHeader
          cellEmptyContent="-"
          resizable
        ></t-table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Header,
    Nav,
  },
  data() {
    return {
      file: [],
      table: [],
      tableLayout: false,
      columns: [
        { colKey: "username", title: "姓名", width: "100" },
        { colKey: "university", title: "院校", width: "250" },
        { colKey: "email", title: "邮箱地址", ellipsis: true },
        {
          colKey: "link",
          title: "操作",
          width: "200",
          cell: (h, { row }) => (
            <div>
              <t-link theme="primary" href={row.link} target="_blank">
                查看详情
              </t-link>
            </div>
          ),
        },
      ],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        totalContent: false,
        pageSizeOptions: [],
        total: 1,
      },
    };
  },
  created() {
    this.$axios({
      method: "post",
      url: "/admin/user/all",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        type: "student",
      },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.table = res.data.table;
          this.pagination.total = res.data.total;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    uploadFile() {
      console.log("file change")
      console.log(this.file[0])
    }
  },
};
</script>

<style lang="less" scoped>
.full {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.nav {
  height: calc(100vh - 4rem - 10px);
  background-color: #ffffff;
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.table {
  width: 77%;
  height: 80%;
  padding: 2rem;
  background-color: #ffffff;
  margin-top: 2rem;
  margin-left: 2rem;
}
</style>
