<template>
  <div class="menus">
    <div class="menu-group" v-for="group in menuGroups" :key="group.name">
      <div class="menu-group-name">{{group.name}}</div>
      <div class="menu-group-item" v-for="menu in group.menus" :key="menu.name">
        {{menu.name}}
      </div>
    </div>
    <SideBarPlayer></SideBarPlayer>
  </div>
</template>

<script>
import SideBarPlayer from './SideBarPlayer'

export default {
  name: 'sidebar',
  data() {
    return {
    }
  },
  computed: {
    menuGroups() {
      return this.$store.state.SideBar.menuGroups
    }
  },
  components: {
    SideBarPlayer
  }
}
</script>

<style scoped>
.menus {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  overflow: auto;
  box-sizing: border-box;
  border-right: 1px solid #333;
}

.menu-group {
  padding: 10px;
}

.menu-group-name {
  color: #999;
  line-height: 30px;
  font-size: 12px;
}

.menu-group-item {
  line-height: 30px;
  font-size: 12px;
  color: #bbb;
  padding: 0 10px;
  cursor: pointer;
}

.menu-group-item:hover {
  color: #ddd;
}

.menu-group-item-active {
  color: #eee;
  background: #666;
}
</style>
