<template>
  <t-menu
    theme="light"
    :value="defaultValue"
    :defaultExpanded="expanded"
    :collapsed="collapsed"
    @change="changeHandler"
    height="550px"
  >
    <t-menu-group>
      <t-submenu title="用户" value="1">
        <template #icon>
          <icon name="user" />
        </template>
        <t-menu-item value="1-1" to="/administrator/stulist">学生用户</t-menu-item>
        <t-menu-item value="1-2" to="/administrator/teacherlist">导师用户</t-menu-item>
      </t-submenu>
      <t-submenu title="帖子" value="2">
        <template #icon>
          <icon name="root-list" />
        </template>
        <t-menu-item value="2-1" to="/administrator/moments">普通帖</t-menu-item>
        <t-menu-item value="2-2" to="/administrator/innermoments">内推帖</t-menu-item>
      </t-submenu>     
    </t-menu-group>
    <template #operations>
      <t-button
        class="t-demo-collapse-btn"
        variant="text"
        shape="square"
        @click.native="changeCollapsed"
      >
        <icon name="view-list" />
      </t-button>
    </template>
  </t-menu>
</template>

<script>
import { Icon } from "tdesign-icons-vue";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: false,
      expanded: ['1', '2']
    };
  },
  props:{
    defaultValue: String
  },
  methods: {
    changeHandler(active) {
      console.log("change", active);
    },
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
