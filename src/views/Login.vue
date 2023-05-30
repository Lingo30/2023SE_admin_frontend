<template>
  <div class="login">
    <form class="form-box">
      <h1>Lab直聘-admin</h1>
      <label
        ><input
          v-model="username"
          type="text"
          placeholder="用户名"
          class="username"
      /></label>
      <label
        ><input
          v-model="password"
          type="password"
          placeholder="密码"
          class="password"
      /></label>
      <button type="submit" @click.prevent="click_login" class="login">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    click_login() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/admin/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: {
          /* 需要向后端传输的数据，JSON 格式 */
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          if (res.data.result == 1) {
            console.log("登录成功");
            window.alert("登录成功");
            this.$store.dispatch("saveUserInfo", {
              user: {
                token: res.data.token,
              },
            });
            localStorage.setItem("token", res.data.token);
            this.$router.replace(
                "/administrator/stulist",
                () => {},
                () => {}
              );
          } else {
            window.alert(res.data.msg);
          }
          /* switch (res.data.result) {
            case 1:
              window.alert("登录成功！"); */
              /* 将后端返回的 user 信息使用 vuex 存储起来 */
              /* this.$store.dispatch("saveUserInfo", {
                user: {
                  username: res.data.username,
                  token: res.data.token,
                  userId: res.data.user_id,
                },
              });
              localStorage.setItem("token", res.data.token); */

              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("preRoute");
              /* this.$router.replace(
                "/administrator/stulist",
                () => {},
                () => {}
              ); */
              // this.$router.push("/administrator/stulist");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              /* setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/administrator/stulist");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000); */
              /* break;
            case 0:
              window.alert(res.data.msg);
              break;
          } */
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
  },
};
</script>

<style scoped>
.form-box {
  width: 300px;
  padding: 40px; /* 内边界宽度  */
  position: absolute; /* 设置为绝对定位，使下方的top和left生效  */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 作用见后方描述  */
  background: #90b9e5; /* 设置背景颜色  */
  text-align: center; /* 表单中内容居中  */
  border-radius: 10px;
}
.form-box h1 {
  text-transform: uppercase; /* 将字体全部设置成大写字母  */
}
/* 设置用户名输入框和密码输入框样式 */
.form-box .username,
.form-box .password {
  border-radius: 24px; /* 边框四个角的弧度  */
  border: 2px solid #3498db; /* 边框厚度  */
  background: none;
  display: block;
  margin: 20px auto; /* 外边界  */
  text-align: center;
  padding: 14px 10px; /* 内边界  */
  width: 200px;
  outline: none;
  color: white; /* 设置输入框中竖线的颜色 */
  transition: 0.25s; /* 设置元素过渡效果 */
}
/* 设置文本框获得焦点时的样式 */
.form-box .username:focus,
.form-box .password:focus {
  border-color: white;
}
/* 设置提交按钮的样式 */
.form-box .login {
  border-radius: 24px;
  border: 2px solid #0b95f1;
  background: none;
  display: block;
  margin: 20px auto;
  padding: 14px 40px;
  outline: none;
  transition: 0.25s;
  cursor: pointer; /* 设置光标的样式 */
}
</style>