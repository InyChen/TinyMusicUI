export default {
    state: {
        song: null,
        currentTime: 0,
        totalTime: 0,
        lrcList: [],
        currentLrcLine: null,
        currentLrcIndex: -1,
        album: null,
        url: "",
        playList: []
    },
    mutations: {
        PLAY(state, song) {
            if (!state.playList.includes(song)) {
                state.playList.push(song);
            }
            state.song = song;
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('load', "QQ_PLAY", { mid: song.mid });
            ipcRenderer.send('load', "QQ_Album", { albummid: song.album.mid });
            ipcRenderer.send('load', "QQ_LRC", { mid: song.mid });
        },
        ON_PLAY(state, data) {
            state.currentTime = data.currentTime;
            state.totalTime = data.totalTime;
            for (let i = 0; i < state.lrcList.length; i++) {
                let line = state.lrcList[i];
                if (line.time > state.currentTime && i > 0) {
                    //切换了行才通知
                    if (state.currentLrcIndex != (i - 1)) {
                        const { ipcRenderer } = window.require("electron");
                        ipcRenderer.send("lrc-change", state.currentLrcLine);
                    }
                    state.currentLrcLine = state.lrcList[i - 1];
                    state.currentLrcIndex = i - 1;
                    break;
                }
            }
        },
        QQ_PLAY(state, data) {
            state.url = data;
        },
        QQ_Album(state, data) {
            state.album = data;
            // this.$store.commit("coverChange", album.data.cover);
        },
        QQ_LRC(state, data) {
            //获取到LRC后解析成歌词列表
            if (data) {
                let list = [];
                data.split("\n").forEach(line => {
                    let match = line.match(/\[[a-zA-Z]*:(.*)\]/);
                    if (match) {
                        list.push({
                            time: 0,
                            text: match[1]
                        });
                    } else {
                        match = line.match(/\[([0-9:]*):(.*)\](.*)/);
                        if (match) {
                            let minute = parseInt(match[1]);
                            let second = parseFloat(match[2]);
                            let text = match[3];
                            if (text) {
                                list.push({
                                    time: minute * 60 + second,
                                    text: text
                                });
                            }
                        }
                    }
                });

                if (list) {
                    for (let i = 0; i < list.length; i++) {
                        if (i < list.length - 1) {
                            //计算每行歌词的持续时间
                            list[i].duration = list[i + 1].time - list[i].time;
                        }
                    }
                }

                state.lrcList = list;
            } else {
                state.lrcList = [];
            }
        }
    }
}