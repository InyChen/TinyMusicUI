<template>
  <div class="lrc">
    {{totalTime}}-{{currentTime}}
    <div class="lrc-line" :class="{'lrc-line-active':index==currentLineIndex}" v-for="(line,index) in lrcList" :key="line.time">
      {{line.text}}
    </div>
  </div>
</template>

<script>
export default {
  name: "lrc",
  data() {
    return {};
  },
  computed: {
    totalTime() {
      return this.$store.state.Player.totalTime;
    },
    currentTime() {
      return this.$store.state.Player.currentTime;
    },
    lrcList() {
      return this.$store.state.Player.lrcList;
    },
    currentLineIndex() {
      return this.$store.state.Player.currentLrcIndex;
    }
  },
  watch: {
    currentLineIndex(val) {
      if (val > 0) {
        this.$el.style.transform = `translateY(-${val * 30 - 120}px)`;
      }
    }
  }
};
</script>

<style scoped>
.lrc {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #999;
  transition: transform 0.5s;
}

.lrc-line {
  height: 30px;
  line-height: 30px;
  text-align: center;
  transition: transform 0.5s;
}

.lrc-line-active {
  color: #fff;
  transform: scale(1.5, 1.5);
}
</style>
