import Vue from 'vue'
import Vuex from 'vuex'
import Main from './modules/Main'
import Colors from './modules/Colors'
import SideBar from './modules/SideBar'
import Search from './modules/Search'
import Player from './modules/Player'

import IpcPlugin from './plugins/IpcPlugin'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
    },
    mutations: {
    },
    modules: {
        Main,
        SideBar,
        Search,
        Player,
        Colors
    },
    plugins: [
        IpcPlugin
    ]
})

export default store;