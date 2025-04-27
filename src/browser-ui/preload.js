const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    createTab: (url) => ipcRenderer.send('create-tab', url),
    switchTab: (index) => ipcRenderer.send('switch-tab', index),
    closeTab: (index) => ipcRenderer.send('close-tab', index),
    togglePrivate: () => ipcRenderer.send('toggle-private')
});