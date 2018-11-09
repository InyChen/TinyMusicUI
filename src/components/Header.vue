<template>
  <div class="header" :style="{background:header_background,borderBottom:header_border_bottom}">
    <div class="band">TinyMusic</div>

    <div class="nav">
      <div @click="goBack" class="nav-back nav-active"></div>
      <div @click="goForward" class="nav-forward nav-active"></div>
    </div>

    <div class="search">
      <input class="input" @input="onInput" placeholder="搜索音乐,歌手,歌词" />
      <img @click="search" class="search-icon" src="../assets/search.png" />
    </div>

    <div class="tools">
      <div class="tools-themes" @click="changeTheme">
        <img class="tools-themes-icon" src="../assets/theme.png" />
      </div>

      <div class="tools-split"></div>
      
      <div @click="min" class="tools-min"></div>
      <div @click="max" class="tools-max"></div>
      <div @click="close" class="tools-close"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {};
  },
  computed: {
    header_background() {
      return this.$store.state.Colors.header_background;
    },
    header_border_bottom() {
      return this.$store.state.Colors.header_border_bottom;
    }
  },
  methods: {
    onInput(e) {
      this.$store.commit("KEYWORD_CHANGE", e.target.value);
    },
    search() {
      if (this.$router.history.path != "/search") {
        this.$router.push("search");
      }
      this.$store.commit("SEARCH");
    },
    min() {
      const remote = window.require("electron").remote;
      let win = remote.getCurrentWindow();
      win.minimize();
    },
    max() {
      const remote = window.require("electron").remote;
      let win = remote.getCurrentWindow();
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    },
    close() {
      const remote = window.require("electron").remote;
      let win = remote.getCurrentWindow();
      win.close();
    },
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    changeTheme() {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("lrc-unlock");
      // this.$store.commit("CHANGE_THEME");
    }
  },
  created() {}
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  -webkit-app-region: drag;
  user-select: none;
  border-bottom: 1px solid #333;
  color: #fff;
  transition: all 0.5s;
}

.band {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  color: #fff;
  padding: 0 10px;
}

.nav {
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;
  border: 1px solid #111;
  margin-left: 50px;
  border-radius: 3px;
  font-size: 0;
}

.nav-back,
.nav-forward {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;
  text-align: center;
  width: 30px;
  -webkit-app-region: no-drag;
}

.nav-back {
  border-right: 1px solid #111;
}

.nav-back:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -3px;
  margin-top: -5px;
  transform: rotate(45deg);
  display: block;
  height: 8px;
  width: 8px;
  border-bottom: 2px solid #666;
  border-left: 2px solid #666;
}

.nav-forward:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -6px;
  margin-top: -5px;
  transform: rotate(45deg);
  display: block;
  height: 8px;
  width: 8px;
  border-top: 2px solid #666;
  border-right: 2px solid #666;
}

.nav-active {
  cursor: pointer;
}

.nav-active:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-active:after {
  border-color: #fff;
}

.search {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;
  margin-left: 20px;
}

.search-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  opacity: 0.7;
  cursor: pointer;
  border-top: 5px solid transparent;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 5px solid transparent;
}

.search-icon:hover {
  opacity: 1;
}

.input {
  border: none;
  height: 24px;
  line-height: 24px;
  width: 200px;
  padding: 0 20px;
  -webkit-app-region: no-drag;
  outline: none;
  color: #fff;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  font-size: 12px;
}

.input:focus {
  background: rgba(0, 0, 0, 0.5);
}

.tools {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 0;
  padding-right: 10px;
}

.tools-split {
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  margin: 0 10px;
  border-right: 1px solid #000;
}

.tools-themes {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 30px;
  font-size: 0;
}

.tools-themes-icon {
  display: block;
  margin: 2px auto;
  width: 16px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  opacity: 0.7;
}

.tools-themes-icon:hover {
  opacity: 1;
}

.tools-min,
.tools-max,
.tools-close {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  width: 30px;
  color: #999;
  -webkit-app-region: no-drag;
  cursor: pointer;
}

.tools-min:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 10px;
  display: block;
  height: 10px;
  width: 10px;
  border-top: 1px solid;
}

.tools-max:after {
  content: " ";
  position: absolute;
  top: 16px;
  left: 50%;
  margin-top: -5px;
  margin-left: -5px;
  display: block;
  height: 8px;
  width: 10px;
  border: 1px solid;
}

.tools-close:after,
.tools-close:before {
  content: " ";
  position: absolute;
  display: block;
  height: 14px;
  width: 14px;
  border-top: 1px solid;
}

.tools-close:after {
  top: 13px;
  left: 4px;
  transform: rotate(45deg);
}

.tools-close::before {
  top: 13px;
  left: 14px;
  transform: rotate(-45deg);
}

.tools-min:hover,
.tools-max:hover,
.tools-close:hover {
  color: #fff;
}
</style>
