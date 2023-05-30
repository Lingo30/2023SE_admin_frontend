<template>
  <div class="full">
    <Header></Header>

    <div class="row">
      <div class="nav">
        <Nav defaultValue="1-2"></Nav>
      </div>
      <div class="table">
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
        total: 1
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
        type: "teacher",
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
  methods: {},
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
.table {
  width: 77%;
  height: 80%;
  padding: 2rem;
  background-color: #ffffff;
  margin-top: 2rem;
  margin-left: 2rem;
}
</style>
