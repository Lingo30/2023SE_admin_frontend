<template>
  <div class="full">
    <Header></Header>
    <div style="width: 94%; margin-top: 2rem; margin-left: 3%">
      <div class="row">
        <h2>系统通知</h2>
      </div>
      <t-list
        style="width: 100%"
        :split="true"
        v-for="item in notifications"
        :key="item"
      >
        <t-list-item style="height: 3rem">
          <t-badge dot count="2" v-if="item.isNew"> <p></p></t-badge>
          {{ item.brief }}
          <template #action>
            <t-link
              theme="primary"
              hover="color"
              style="margin-left: 16px"
              @click="openDialog(item)"
            >
              查看详情
            </t-link>
            <t-link
              theme="primary"
              hover="color"
              style="margin-left: 16px"
              @click="removeNotification(item.id)"
            >
              删除通知
            </t-link>
          </template>
          <t-dialog
            theme="danger"
            :header="dTitle"
            :body="dContent"
            :visible.sync="visible"
            @confirm="jump2link(item.link)"
            :onClose="close"
            confirmBtn="查看待审核内容"
            :cancelBtn="null"
          />
        </t-list-item>
      </t-list>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import { NotificationIcon } from "tdesign-icons-vue";

export default {
  components: {
    Header,
    Nav,
    NotificationIcon,
  },
  data() {
    return {
      visible: false,
      dTitle: "",
      dContent: "",
      notifications: [
        {
          id: "1",
          isNew: true,
          brief: "【疑似违规帖子】标题为“软工课好垃圾1”的帖子疑似违规",
          title: "【疑似违规帖子】",
          content: "标题为“软工课好垃圾”的帖子疑似违规，请点击下方按钮处理。",
          link: "/administrator/stulist",
        },
        {
          id: "2",
          isNew: true,
          brief: "【疑似违规帖子】标题为“软工课好垃圾2”的帖子疑似违规",
          title: "【疑似违规帖子】",
          content: "标题为“软工课好垃圾”的帖子疑似违规，请点击下方按钮处理。",
          link: "/administrator/stulist",
        },
        {
          id: "3",
          isNew: true,
          brief: "【疑似违规帖子】标题为“软工课好垃圾3”的帖子疑似违规",
          title: "【疑似违规帖子】",
          content: "标题为“软工课好垃圾”的帖子疑似违规，请点击下方按钮处理。",
          link: "/administrator/stulist",
        },
      ],
    };
  },
  created() {
    this.$axios({
      method: "post",
      url: "/admin/notification",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {},
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.notifications = res.data.notifications;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    close() {
      this.visible = false;
    },
    openDialog(item) {
      this.visible = true;
      this.dTitle = item.title;
      this.dContent = item.content;
      item.isNew = false;
      this.seen(item.id);
    },
    jump2link(link) {
      window.open(link, "_blank");
      this.visible = false;
    },
    seen(id) {
      this.$axios({
        method: "post",
        url: "/admin/notification/seen",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          id: id,
        },
      });
    },
    removeNotification(id) {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id == id) {
          this.notifications.splice(i, 1);
          break;
        }
      }
      this.$axios({
        method: "post",
        url: "/admin/notification/remove",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          id: id,
        },
      });
    },
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
}
.myContent {
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  margin-top: 2rem;
  margin-left: 2rem;
}
h2 {
  word-break: break-all;
  border-left: 7px solid #0052d9;
  padding-left: 10px;
}
</style>
