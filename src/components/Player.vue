<template>
  <transition name="fade">
    <div class="player">
      <div class="player-header" v-if="album">
        <div class="player-cd">
          <img :src="album.data.cover" />
        </div>
        <img @click="min" class="player-min" src="../assets/min.png" />
        <div class="player-lrc">
          <Lrc></Lrc>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Lrc from './Lrc';

export default {
  name: 'player',
  data() {
    return {
    }
  },
  computed: {
    album() {
      return this.$store.state.Player.album
    },
    song() {
      return this.$store.state.Player.song
    }
  },
  components: {
    Lrc
  },
  methods: {
    min() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform .5s
}

.fade-enter,
.fade-leave-to {
  transform: translate(-100%, 100%);
  transform-origin: 0 100%;
}


.player {
  position: relative;
}

.player-header {
  position: relative;
  height: 400px;
}

.player-min {
  position: absolute;
  top: 5px;
  right: 10px;
  height: 30px;
  opacity: .7;
  cursor: pointer;
}

.player-min:hover {
  opacity: 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.player-cd {
  position: absolute;
  top: 40px;
  left: 40px;
  height: 300px;
  widows: 300px;
  overflow: hidden;
  border-radius: 9999px;
  border: 10px solid rgba(0, 0, 0, 0.5);
  animation: rotate 30s infinite linear;
}

.player-lrc {
  position: absolute;
  top: 40px;
  left: 400px;
  bottom: 0;
  right: 40px;
  overflow: hidden;
}
</style>
