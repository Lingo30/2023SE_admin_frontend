<template>
  <div class="full">
    <Header></Header>
    <div class="row">
      <div class="nav">
        <Nav defaultValue="1-1"></Nav>
      </div>
      <div class="myContent column">
        <div class="row" style="justify-content: space-between; width: 100%">
          <h1>{{ username }}</h1>
          <div class="column" style="margin-left: 10rem">
            <div class="row" style="align-items: center">
              <h3 class="info">院校：</h3>
              <h4>{{ university }}</h4>
            </div>
            <div class="row" style="align-items: center">
              <h3 class="info">专业：</h3>
              <h4>{{ department }}</h4>
            </div>
            <div class="row" style="align-items: center">
              <h3 class="info">Email：</h3>
              <h4>{{ email }}</h4>
            </div>
          </div>
          <div class="row" style="align-items: center; margin-left: auto">
            <t-tooltip
              content="当审核认为该用户冒用他人邮箱注册时可注销该用户，请谨慎使用本功能！"
            >
              <t-button theme="danger" size="large" @click="visible = true"
                >注销该用户</t-button
              ></t-tooltip
            >
            <t-dialog :visible.sync="visible" @confirm="removeUser">
              <p>请问是否确认注销该用户？确认注销后该用户全部信息会被清空</p>
            </t-dialog>
          </div>
        </div>
        <t-divider></t-divider>
        <h2>个人简历</h2>
        <h3>学业成绩</h3>
        <p>{{ grades }}</p>
        <h3>科研经历</h3>
        <p>{{ labExperience }}</p>
        <h3>竞赛获奖</h3>
        <p>{{ awards }}</p>
        <h3>擅长技能</h3>
        <p>{{ skills }}</p>
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
      userId: this.$route.query.userId,
      username: "",
      university: "",
      department: "",
      email: "",
      grades: "-",
      labExperience: "-",
      awards: "-",
      skills: "-",
      visible: false,
    };
  },
  created() {
    this.userId = this.$route.query.userId;
    this.$axios({
      method: "post",
      url: "/admin/user",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        useId: true,
        id: this.userId,
      },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.username = res.data.username;
          this.university = res.data.university;
          this.department = res.data.department;
          this.email = res.data.email;
          this.grades = res.data.grades;
          this.labExperience = res.data.labExperience;
          this.awards = res.data.awards;
          this.skills = res.data.skills;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    removeUser() {
      this.$axios({
        method: "post",
        url: "/admin/removeUser",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          userId: this.userId,
          type: "student",
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            /* this.$axios({
              method: "post",
              url: "https://console.tim.qq.com/v4/im_open_login_svc/account_delete?sdkappid=1400807644&identifier=administrator&usersig=eJwtzEsLgkAUBeD-MltDrjrjC1oYRYseUFaDS2PGuJivcTAp*u*ZujzfOZwPuexjs5OKhMQ2gSzGjEKWGjMcORUFlthqlepKzYNW5GldoyChRQF88FxKp0b2NSo5OGPMBoBJNRZ-c33H8llAnfkFH8P-YRPxvFpH4kgtmZ3Ea8WN65k-gy42*m1TvXfyljT3THvJknx-V4I1Mw__&random=99999999&contenttype=json",
              data: {
                DeleteItem: [
                  {
                    UserID: this.email,
                  },
                ],
              },
            }).then((res) => {
              console.log(res);
            }); */
            this.visible = false;
            this.$router.replace(
              "/administrator/stulist",
              () => {},
              () => {}
            );
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
