const themes = [
    {
        header_background: "rgba(0,0,0,0.5)",
        header_border_bottom: "1px solid #333",
        footer_background: "rgba(0,0,0,0.5)",
        footer_border_top: "1px solid #333",
        player_process: "#58B4FB",
        player_mark: "#fff"
    },
    {
        header_background: "#58B4FB",
        header_border_bottom: "1px solid #fff",
        footer_background: "#fff",
        footer_border_top: "1px solid #fff",
        player_process: "#58B4FB",
        player_mark: "#fff"
    }
]

export default {
    state: {
        currentTheme: 0,
        header_background: "rgba(0,0,0,0.5)",
        header_border_bottom: "1px solid #333",
        footer_background: "rgba(0,0,0,0.5)",
        footer_border_top: "1px solid #333",
        player_process: "#58B4FB",
        player_mark: "#fff"
    },
    mutations: {
        CHANGE_THEME(state) {
            if (state.currentTheme < themes.length - 1) {
                state.currentTheme++;
            } else {
                state.currentTheme = 0;
            }
            let newTheme = themes[state.currentTheme];
            for (let x in newTheme) {
                state[x] = newTheme[x];
            }
        }
    }
}