export default {
    state: {
        keyword: "周杰伦",
        curnum: 0,
        curpage: 0,
        totalnum: 0,
        songList: []
    },
    mutations: {
        KEYWORD_CHANGE(state, w) {
            state.keyword = w;
        },
        QQ_SEARCH(state, data) {
            if (data) {
                state.curnum = data.song.curnum;
                state.curpage = data.song.curpage;
                state.totalnum = data.song.totalnum;
                state.songList = data.song.list;
            }
        },
        SEARCH(state, page) {
            const { ipcRenderer } = window.require('electron');
            if (state.keyword) {
                ipcRenderer.send('load', "QQ_SEARCH", { keyword: state.keyword, page: page });
            }
        }
    }
}