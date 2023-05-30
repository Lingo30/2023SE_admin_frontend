<template>
  <div class="full">
    <Header></Header>

    <div class="nav">
      <Nav></Nav>
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
</style>
