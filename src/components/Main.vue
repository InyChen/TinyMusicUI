<template>
  <div class="page main">
    <div class="top-list">
      <div class="top-item" @click="changeTop(top)" :class="{'top-item-active':currentTop==top}" v-for="top in topList" :key="top.topid">
        {{top.name}}
      </div>
    </div>
    <div class="top-songs">
      <div class="top-song" @click="play(song)" v-for="song in currentTop.songList" :key="song.data.strMediaMid">
        <img class="top-song-icon" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.data.albummid}.jpg?max_age=2592000`" />
        <div class="top-song-name">{{song.data.songname}}</div>
        <div class="top-song-singer">{{formatSinger(song.data.singer)}}</div>
        <div class="top-song-album">{{song.data.albumname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'main',
  data() {
    return {
      currentTop: null
    }
  },
  computed: mapState({
    topList: state => state.Main.topList
  }),
  methods: {
    changeTop(top) {
      this.currentTop = top;
      if (top.songList.length == 0) {
        this.loadTop();
      }
    },
    loadTop() {
      let date = "";
      if (this.currentTop.dateType == "week") {
        date = moment().weeks();
      } else {
        date = moment().subtract(1, "days").format("YYYY-MM-DD");
      }
      this.$store.commit("GET_TOP", {
        topid: this.currentTop.topid,
        date: "",
        song_begin: 0,
        song_num: 10
      });
    },
    formatSinger(singers) {
      let str = "";
      singers.forEach(singer => {
        str = "/" + singer.name;
      });
      return str.substring(1);
    },
    play(song) {
      let s = song.data;
      s.mid = s.songmid;
      s.name = s.songname;
      s.album = {
        name: s.albumname,
        mid: s.albummid,
        albummid: s.albummid
      };
      this.$store.commit("PLAY", s);
    }
  },
  created() {
    this.currentTop = this.topList[0];
    this.loadTop();
  }
}
</script>

<style scoped>
.main {
  color: #fff;
}

.top-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  overflow: auto;
}

.top-item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-family: "MicroSoft YaHei";
  cursor: pointer;
}

.top-item:hover {
  background: #222;
}

.top-item-active,
.top-item-active:hover {
  background: #000;
}

.top-songs {
  position: absolute;
  top: 0;
  left: 100px;
  right: 0;
  bottom: 0;
  overflow: auto;
}

.top-song {
  position: relative;
  padding: 20px;
  height: 100px;
}

.top-song-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 100px;
  width: 100px;
}

.top-song-name {
  height: 20px;
  line-height: 20px;
  margin-left: 120px;
}

.top-song-singer {
  height: 30px;
  line-height: 30px;
  margin-left: 120px;
  color: #999;
  font-size: 14px;
}

.top-song-album {
  height: 50px;
  line-height: 50px;
  margin-left: 120px;
  color: #666;
  font-size: 14px;
}
</style>
