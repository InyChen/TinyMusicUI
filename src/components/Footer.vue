<template>
  <div class="footer" :style="{background:footer_background,borderTop:footer_border_top}">
    <audio id="__player" v-show="false"></audio>
    <div class="control-left">
      <div class="controll-prev"></div>
      <div class="controll-play" @click="play" v-show="!playing"></div>
      <div class="controll-pause" @click="pause" v-show="playing"></div>
      <div class="controll-next" @click="next"></div>
    </div>
    <div class="range">
      <div class="range-now">{{formatTime(playedTime)}}</div>
      <div class="range-input-box">
        <input class="range-input" @mousedown="isDrag=true" @mouseup="finishDrag" :style="{background:'-webkit-linear-gradient('+player_process+', '+player_process+') no-repeat, #333',backgroundSize:percent+'% 100%'}" v-model="percent" type="range" />
      </div>
      <div class="range-total">{{formatTime(totalTime)}}</div>
    </div>
    <div class="control-right">
      <div class="volumn">
        <div class="volumn-icon" @click="mute" :class="{'volumn-icon-muted':muted}"></div>
        <input class="volumn-input" :style="{background:'-webkit-linear-gradient('+player_process+', '+player_process+') no-repeat, #333',backgroundSize:volumn+'% 100%'}" @input="volumnChange" value="50" type="range" />
      </div>
      <div class="mode" @click="changeMode">
        <div :class="'mode-icon-'+playMode"></div>
      </div>
      <div class="playlist">
        <img class="playlist-icon" @click="showPlayList=!showPlayList" src="../assets/playlist.png" />
        <div class="playlist-num">{{playList.length}}</div>
        <div class="playlist-list" v-show="showPlayList">
          <div class="playlist-title">
            <img @click="showPlayList=false" class="playlist-close" src="../assets/close.png" />
          </div>
          <div class="playlist-empty" v-if="!playList||playList.length==0">
            播放列表是空的,快去添加吧~
          </div>
          <div class="playlist-item" :class="{'playlist-item-playing':song==item}" @click="playSong(item)" v-for="item in playList" :key="item.mid">
            <img class="playlist-item-icon" src="../assets/playing.png" />
            <div class="playlist-item-name">{{item.name}}</div>
            <div class="playlist-item-singer">{{item.album.name}}</div>
            <div class="playlist-item-time">{{formatSinger(item.singer)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'footer',
  data() {
    return {
      playing: false,
      playedTime: 0,
      totalTime: 0,
      isDrag: false,
      percent: 0,
      volumn: 50,
      muted: false,
      playMode: "single",
      playModes: ["normal", "random", "loop", "single"],
      showPlayList: false,
      songNameText: "",
      titleSplashNum: 0,
      splashIndex: null
    }
  },
  computed: mapState({
    playList: state => state.Player.playList,
    song: state => state.Player.song,
    lrc: state => state.Player.lrc,
    album: state => state.Player.album,
    url: state => state.Player.url,
    player_process: state => state.Colors.player_process,
    player_mark: state => state.Colors.player_mark,
    footer_background: state => state.Colors.footer_background,
    footer_border_top: state => state.Colors.footer_border_top
  }),
  watch: {
    song(val, oldVal) {
      this.songNameText = val.name + "-" + val.album.name;
      val.singer.forEach(s => {
        this.songNameText = this.songNameText + "-" + s.name;
      });
      this.splash();
    },
    url(val) {
      if (!this.$audio.paused) {
        this.$audio.pause();
      }
      this.$audio.src = val;
      this.$audio.play();
    }
  },
  methods: {
    splash() {
      if (this.splashIndex) {
        clearTimeout(this.splashIndex);
      }
      if (this.songNameText) {
        if (this.songNameText.length <= this.titleSplashNum) {
          this.titleSplashNum = 0;
        } else {
          this.titleSplashNum++;
        }
        let title = this.songNameText.substring(this.titleSplashNum);
        title = title + "........." + this.songNameText;
        document.title = title;
        this.splashIndex = setTimeout(this.splash, 500);
      } else {
        document.title = "TinyMusic";
        this.splashIndex = null;
      }
    },
    formatTime(time) {
      let minute = parseInt(time / 60) + "";
      let second = parseInt(time - (60 * minute)) + "";
      return minute.padStart(2, '0') + ":" + second.padStart(2, '0');
    },
    formatSinger(singers) {
      let str = "";
      singers.forEach(singer => {
        str = "/" + singer.name;
      });
      return str.substring(1);
    },
    play() {
      if (this.$audio.src) {
        this.$audio.play();
      }
    },
    next() {
      this.$audio.pause();
      if (this.playMode == "single") {
        this.$store.commit("PLAY", this.song);
      } else if (this.playMode == "normal") {
        let index = this.playList.indexOf(this.song);
        if (index < this.playList.length - 1) {
          this.$store.commit("PLAY", this.playList[index + 1]);
        }
      } else if (this.playMode == "loop") {
        let index = this.playList.indexOf(this.song);
        if (index < this.playList.length - 1) {
          this.$store.commit("PLAY", this.playList[index + 1]);
        } else {
          this.$store.commit("PLAY", this.playList[0]);
        }
      } else if (this.playMode == "random") {
        let index = parseInt(Math.random() * this.playList.length);
        this.$store.commit("PLAY", this.playList[index]);
      }
    },
    playSong(song) {
      this.$store.commit("PLAY", song);
    },
    pause() {
      this.$audio.pause();
    },
    mute() {
      this.muted = !this.muted;
      this.$audio.muted = this.muted;
    },
    volumnChange(e) {
      let vol = e.target.value / 100;
      this.$audio.volume = vol;
      this.volumn = e.target.value;
    },
    finishDrag() {
      this.$audio.currentTime = this.totalTime * this.percent / 100;
      this.isDrag = false;
    },
    changeMode() {
      let index = this.playModes.indexOf(this.playMode);
      if (index >= this.playModes.length - 1) {
        index = 0;
      } else {
        index++;
      }
      this.playMode = this.playModes[index];
    }
  },
  mounted() {
    this.$audio = document.getElementById("__player");
    this.$audio.addEventListener("play", e => {
      this.playing = true;
    });
    this.$audio.addEventListener("pause", e => {
      this.playing = false;
    });
    this.$audio.addEventListener("ended", e => {
      this.playing = false;
      this.next();
    });
    this.$audio.addEventListener("loadedmetadata", e => {
      if (e.target.duration) {
        this.totalTime = e.target.duration;
      }
    });
    this.$audio.addEventListener("timeupdate", e => {
      if (e.target.currentTime) {
        this.$store.commit("ON_PLAY", {
          currentTime: e.target.currentTime,
          totalTime: this.totalTime
        });
        this.playedTime = e.target.currentTime;
        if (!this.isDrag) {
          this.percent = 100 * this.playedTime / this.totalTime
        }
      }
    });
  },
  beforeDestroy() {
    if (this.splashIndex) {
      clearTimeout(this.splashIndex);
    }
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-top: 1px solid #333;
  transition: all .5s;
  user-select: none;
}

.control-left {
  position: absolute;
  left: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-size: 0;
}

.control-right {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
  font-size: 0;
}

.controll-prev,
.controll-play,
.controll-pause,
.controll-next {
  display: inline-block;
  vertical-align: middle;
  background: url(../assets/player.png) no-repeat;
  background-size: auto 1000px;
  margin-right: 15px;
  cursor: pointer;
  opacity: 0.5;
}

.controll-prev:hover,
.controll-play:hover,
.controll-pause:hover,
.controll-next:hover {
  opacity: 1;
}

.controll-prev {
  height: 20px;
  width: 20px;
  background-position: 0 -30px;
  transform: scale(0.75, 0.75);
}

.controll-play {
  height: 30px;
  width: 30px;
  background-position: 5px 1px;
}

.controll-pause {
  height: 30px;
  width: 30px;
  background-position: -24px 1px;
}

.controll-next {
  height: 20px;
  width: 20px;
  background-position: 0 -52px;
  transform: scale(0.75, 0.75);
}

.range {
  position: relative;
  margin-left: 140px;
  margin-right: 250px;
  height: 50px;
  line-height: 50px;
  user-select: none;
}

.range-now {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  font-size: 12px;
  color: #fff;
}

.range-input-box {
  margin: 0 50px;
  height: 50px;
  line-height: 50px;
}

.range-input {
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-appearance: none;
  height: 4px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  outline: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 99px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.range-total {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  font-size: 12px;
  color: #fff;
}

.volumn {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  user-select: none;
}

.volumn-icon {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  width: 30px;
  background: url(../assets/volumn.png) no-repeat center;
  background-size: 60% auto;
  opacity: .7;
  cursor: pointer;
}

.volumn-icon-muted {
  background: url(../assets/muted.png) no-repeat center;
  background-size: 60% auto;
}

.volumn-icon:hover {
  opacity: 1;
}

.volumn-input {
  display: inline-block;
  vertical-align: middle;
  -webkit-appearance: none;
  height: 4px;
  width: 100px;
  background: rgba(0, 0, 0, 0.5);
  outline: none;
}

.volumn-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 99px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.mode {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  margin: 0 10px;
}

.mode-icon-normal,
.mode-icon-random,
.mode-icon-loop,
.mode-icon-single {
  height: 20px;
  width: 30px;
  margin: 0 auto;
  background: url(../assets/player.png) no-repeat;
  background-size: 132px auto;
  transform: scale(0.75, 0.75);
  opacity: .7;
  cursor: pointer;
}

.mode-icon-normal:hover,
.mode-icon-random:hover,
.mode-icon-loop:hover,
.mode-icon-single:hover {
  opacity: 1;
}

.mode-icon-normal {
  width: 20px;
  background-position: 0 -260px;
}

.mode-icon-random {
  height: 20px;
  background-position: 0 -73px;
}

.mode-icon-loop {
  height: 28px;
  background-position: 0 -202px;
}

.mode-icon-single {
  height: 28px;
  background-position: 0 -229px;
}

.playlist {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  padding: 5px;
  margin-right: 20px;
  font-size: 0;
}

.playlist-icon {
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  margin-top: 2px;
  opacity: .7;
  cursor: pointer;
}

.playlist-num {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  margin-top: 2px;
  color: #fff;
  opacity: .7;
  cursor: pointer;
}

.playlist:hover .playlist-icon,
.playlist:hover .playlist-num {
  opacity: 1;
}

.playlist-list {
  position: absolute;
  z-index: 2;
  bottom: 50px;
  right: 0;
  max-height: 80vh;
  overflow: auto;
  width: 500px;
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.playlist-title {
  position: relative;
  height: 30px;
  background: rgba(50, 50, 50, .9);
}

.playlist-close {
  position: absolute;
  top: 7px;
  right: 7px;
  height: 16px;
  opacity: .7;
  cursor: pointer;
}

.playlist-close:hover {
  opacity: 1;
}

.playlist-empty {
  line-height: 200px;
  text-align: center;
  background: #323438;
  font-size: 12px;
  color: #999;
}

.playlist-item {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  padding-left: 20px;
  overflow: hidden;
  font-size: 12px;
  color: #ddd;
  background: #323438;
}

.playlist-item:nth-child(2n) {
  background: #2D2D31;
}

.playlist-item:hover {
  color: #fff;
  background: #424448;
}

@keyframes playing {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  50% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-10px, -10px);
    opacity: 0;
  }
}

.playlist-item-icon {
  display: none;
  position: absolute;
  top: 10px;
  left: 4px;
  height: 12px;
}

.playlist-item-playing .playlist-item-icon {
  display: block;
  animation: playing 2s ease infinite;
}

.playlist-item-name {
  margin-right: 220px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.playlist-item-singer {
  position: absolute;
  top: 0;
  right: 60px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 5px;
}

.playlist-item-time {
  position: absolute;
  top: 0;
  right: 10px;
  height: 30px;
  line-height: 30px;
  width: 50px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 5px;
}
</style>
