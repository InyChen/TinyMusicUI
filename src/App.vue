<template>
  <div id="app">
    <MainHeader></MainHeader>
    <div class="body">
      <router-view></router-view>
      <router-view name="sidebar"></router-view>
    </div>
    <MainFooter></MainFooter>
    <div class="cover" v-if="coverList && coverList.length>0">
      <transition-group name="list">
        <img :src="c" v-for="c in coverList" :key="c" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    MainHeader: Header,
    MainFooter: Footer
  },
  data() {
    return {
      coverList: []
    }
  },
  computed: {
    album() {
      return this.$store.state.Player.album
    }
  },
  watch: {
    album(val, oldVal) {
      this.coverList.push(val.data.cover);
      if (this.coverList.length > 1) {
        this.coverList.shift();
      }
    }
  }
}
</script>

<style>
body,
html {
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #16181C;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
  z-index: -1;
}

.cover img {
  position: absolute;
  height: 100%;
  width: 100%;
  filter: blur(50px);
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.body {
  position: absolute;
  top: 51px;
  left: 0;
  right: 0;
  bottom: 51px;
}

.page {
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 4px;
  background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-track {
  font-size: 0;
}

::-webkit-scrollbar-thumb {
  background: #555;
}
</style>
