<template>
  <div class="player" v-if="song && album">
    <div class="player-cover">
      <img class="player-cover-img" :src="album.data.cover" />
      <div class="player-cover-max" @click="max">
        <img class="player-cover-maxicon" src="../assets/max.png" />
      </div>
    </div>
    <div class="player-info">
      <div class="player-name">{{song.name}}</div>
      <div class="player-singer">{{formatSinger(song.singer)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebarplayer',
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
  methods: {
    formatSinger(singers) {
      let str = "";
      singers.forEach(singer => {
        str = "/" + singer.name;
      });
      return str.substring(1);
    },
    max() {
      if (this.$router.history.path != "/player") {
        this.$router.push("player");
      }
    }
  }
}
</script>

<style scoped>
.player {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(0, 0, 0, 0.5);
  color: #ccc;
}

.player-cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  width: 70px;
  cursor: pointer;
}

.player-cover-img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.player-cover-max {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  opacity: 0;
  transition: opacity .3s;
}

.player-cover:hover .player-cover-max {
  opacity: 1;
}

.player-cover-maxicon {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 30px;
  margin-left: -15px;
  margin-top: -15px;
}

.player-info {
  margin-left: 70px;
  padding: 5px;
}

.player-name {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-singer {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: 999;
}
</style>
