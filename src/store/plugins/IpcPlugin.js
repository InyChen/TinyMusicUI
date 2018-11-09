const IpcPlugin = store => {
    // 当 store 初始化后调用
    const { ipcRenderer } = window.require('electron');

    ipcRenderer.on('resLoad', (event, mutation, data) => {
        if (data) {
            store.commit(mutation, data);
        }
    })
}

export default IpcPlugin;