export default {
    state: {
        topList: [
            { topid: 4, name: "流行指数", dateType: "date", songList: [] },
            { topid: 26, name: "热歌", dateType: "week", songList: [] },
            { topid: 27, name: "新歌", dateType: "week", songList: [] }
        ]
    },
    mutations: {
        GET_TOP(state, params) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('load', "QQ_TOP", params);
        },
        QQ_TOP(state, data) {
            if (data.topid && data.songlist) {
                state.topList.forEach(top => {
                    if (top.topid == data.topid) {
                        top.songList = data.songlist;
                    }
                });
            }
        }
    }
}