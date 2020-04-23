<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="3">
        <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleSelectMunu">
          <el-menu-item v-for="(item, index) in menu" :key="`menu-${index}`" :index="index + ''">
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          name: "demo1"
        },
        {
          name: "demo2"
        }
      ]
    };
  },
  mounted() {
    this.handleSelectMunu(0);
  },
  methods: {
    handleSelectMunu(index) {
      this.$router.push({
        name: this.menu[index].name
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
