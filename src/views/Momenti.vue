<template>
  <div class="full">
    <Header></Header>
    <div class="row">
      <div class="nav">
        <Nav defaultValue="2-2"></Nav>
      </div>
      <div class="myContent column">
        <div class="row" style="justify-content: space-between; width: 100%">
          <h1>{{ title }}</h1>
          <div class="column" style="margin-left: 10rem">
            <div class="row" style="align-items: center">
              <h3 class="info">发帖人：</h3>
              <h4>{{ username }}</h4>
            </div>
            <div class="row" style="align-items: center">
              <h3 class="info">院校：</h3>
              <h4>{{ university }}</h4>
            </div>
            <div class="row" style="align-items: center">
              <h3 class="info">Email：</h3>
              <h4>{{ email }}</h4>
            </div>
          </div>
          <div class="row" style="align-items: center; margin-left: auto">
            <t-tooltip
              content="当审核认为该帖子违规时可直接删除，请谨慎使用本功能！"
            >
              <t-button theme="danger" size="large" @click="visible = true"
                >删除帖子</t-button
              ></t-tooltip
            >
            <t-dialog :visible.sync="visible" @confirm="removeMoment">
              <p>请问是否确认删除该帖子？</p>
            </t-dialog>
          </div>
        </div>
        <t-divider></t-divider>
        <h2>帖子内容</h2>
        <p>{{ content }}</p>
        <h2 v-if="hasComment">评论区</h2>
        <t-list v-if="hasComment" style="width: 100%">
          <div v-for="item in comments" :key="item.id" style="width: 100%">
            <div
              class="row"
              style="
                justify-content: space-between;
                align-items: center;
                width: 100%;
              "
            >
              <div class="column">
                <h3>{{ item.commentUser }}</h3>
                <p>{{ item.commentContent }}</p>
              </div>
              <div style="margin-left: auto">
                <t-tooltip
                  content="当审核认为该评论违规时可直接删除，请谨慎使用本功能！"
                >
                  <t-button theme="danger" size="large" @click="visible = true"
                    >删除评论</t-button
                  ></t-tooltip
                >
                <t-dialog
                  :visible.sync="visible"
                  @confirm="removeComment(item.id)"
                >
                  <p>请问是否确认删除该评论？</p>
                </t-dialog>
              </div>
            </div>
          </div>
        </t-list>
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
      momentId: this.$route.query.momentId,
      title: "-",
      username: "-",
      university: "-",
      email: "-",
      content: "-",
      hasComment: false,
      comments: [],
      visible: false,
    };
  },
  created() {
    this.momentId = this.$route.query.momentId;
    this.$axios({
      method: "post",
      url: "/admin/community/detail",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        momentId: this.momentId,
      },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.title = res.data.title;
          this.content = res.data.content;
          this.username = res.data.username;
          this.university = res.data.university;
          this.email = res.data.email;
          this.hasComment = res.data.hasComment;
          this.comments = res.data.comments;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    removeMoment() {
      this.$axios({
        method: "post",
        url: "/admin/removeMoment",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          momentId: this.momentId,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.visible = false;
            this.$router.replace(
              "/administrator/moments",
              () => {},
              () => {}
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeComment(commentId) {
      this.$axios({
        method: "post",
        url: "/admin/removeComment",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          commentId: commentId,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.visible = false;
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
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
  align-items: flex-start;
}
.myContent {
  width: 77vw;
  height: 80%;
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
.info {
  word-break: break-all;
  border-left: 7px solid #0052d9;
  padding-left: 10px;
}
</style>
