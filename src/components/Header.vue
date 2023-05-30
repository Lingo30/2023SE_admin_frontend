<template>
  <div>
    <div class="head">
      <img
        height="80"
        src="../assets/logo.svg"
        alt="logo"
        style="margin-left: 1rem"
        @click="jump2home"
      />

      <div class="right">
        <t-badge dot count="2" v-if="isNew"> <p></p></t-badge>
        <t-button
          variant="text"
          shape="square"
          style="margin-right: 1rem"
          size="large"
          @click="jump2message"
        >
          <notification-icon slot="icon" />
        </t-button>
        <t-dropdown :options="options" @click="clickHandler">
          <t-button
            variant="text"
            shape="square"
            style="margin-right: 2rem"
            size="large"
          >
            <user-icon slot="icon" />
          </t-button>
        </t-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { NotificationIcon, UserIcon } from "tdesign-icons-vue";

export default {
  components: {
    NotificationIcon,
    UserIcon,
  },
  data() {
    return {
      isNew: false,
      options: [
        {
          content: "退出登录",
          value: 1,
        },
      ],
    };
  },
  created() {
    this.$axios({
      method: "post",
      url: "/admin/init",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {},
    })
      .then((res) => {
        this.isNew = res.data.isNew;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    jump2home() {
      this.$router.replace(
        "/administrator/stulist",
        () => {},
        () => {}
      );
    },
    jump2message() {
      window.open("/administrator/message", "_blank");
    },
    clickHandler(data) {
      if (data.value == 1) {
        localStorage.clear();
        this.$store.dispatch("clearUserInfo");
        this.$router.replace(
          "/administrator/login",
          () => {},
          () => {}
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  background-color: #ffffff;
  height: 3.5rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
}
.right {
  margin-left: auto;
}
</style>
