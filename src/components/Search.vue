<template>
  <div class="page">
    <div class="search-title">
      查询"{{keyword}}"相关结果:{{totalnum}}条,当前第{{curpage}}页,当前页:{{curnum}}条
      <a @click="prevPage">上一页</a>
      <a @click="nextPage">下一页</a>
    </div>
    <div class="search-rs">
      <div class="search-item" @click="play(song)" v-for="song in songList" :key="song.mid">
        <div class="song-name">{{song.title}}</div>
        <div class="song-album">{{song.album.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
    }
  },
  computed: mapState({
    keyword: state => state.Search.keyword,
    curnum: state => state.Search.curnum,
    curpage: state => state.Search.curpage,
    totalnum: state => state.Search.totalnum,
    songList: state => state.Search.songList
  }),
  methods: {
    prevPage() {
      if (this.curpage >= 1) {
        this.$store.commit("SEARCH", this.curpage - 1);
      }
    },
    nextPage() {
      if (this.curnum > 0) {
        this.$store.commit("SEARCH", this.curpage + 1);
      }
    },
    play(song) {
      this.$store.commit("PLAY", song);
    }
  },
  created() {
  }
}
</script>

<style scoped>
.search-title {
  line-height: 30px;
  font-size: 12px;
  color: #ddd;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.5);
}

.search-rs {
  color: #fff;
}

.search-item {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-item:hover {
  background: rgba(0, 0, 0, 0.1);
}

.song-name {
  line-height: 20px;
  font-size: 12px;
  color: #ddd;
}

.song-album {
  line-height: 20px;
  font-size: 12px;
  color: #aaa;
}
</style>
