<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">微人事</div>
      <el-dropdown @command="commandHandler">
  <span class="el-dropdown-link">
    {{ user.name }} <i> <img :src="user.userface" alt=""></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">用户中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <!--左侧导航栏-->
      <el-aside width="200px">
          <el-menu router>
            <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(child,indexj) in item.children" :index="child.path" :key="indexj">{{ child.name }}</el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  methods: {
    menuClick(index, indexPath) {
      this.$router.push(index)
    },
    commandHandler(command) {
      switch (command) {
        case "userInfo":
          alert("command")
          break;
        case "setting":
          alert("setting")
          break;
        case "logout":
          this.$confirm('此操作将退出用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest("/logout");
            window.sessionStorage.removeItem("user")
            this.$router.replace("/")
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
          break;
      }
    }
  }
}
</script>

<style>

.homeHeader {
  /*添加背景色*/
  background-color: #5395ff;
  /*弹性布局*/
  display: flex;
  /*中间对其*/
  align-items: center;
  /*两端对其，项目中的距离都相等*/
  justify-content: space-between;
  /*内边距 上下为0 左右15*/
  padding: 0px 15px;
  /*规定两个并排的带边框的框*/
  box-sizing: border-box;
}

.homeHeader .title {
  margin-left: 15px;
  font-size: 42px;
  font-family: 华文行楷;
  color: #ffffff;
}

.el-dropdown-link img {
  width: 50px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  /*弹性布局*/
  display: flex;
  /*中间对其*/
  align-items: center;
  font-weight: bold;
}


</style>