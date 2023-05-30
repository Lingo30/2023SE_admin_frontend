<template>
  <div class="full">
    <Header></Header>

    <div class="row">
      <div class="nav">
        <Nav defaultValue="1-1"></Nav>
      </div>
      <div class="myContent">
        
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
      
    };
  },
  created() {
    
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
.myContent {
  width: 77%;
  height: 80%;
  padding: 2rem;
  background-color: #ffffff;
  margin-top: 2rem;
  margin-left: 2rem;
}
</style>
