const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    createTab: (url) => ipcRenderer.send('create-tab', url),
    switchTab: (index) => ipcRenderer.send('switch-tab', index),
    closeTab: (index) => ipcRenderer.send('close-tab', index),
    togglePrivate: () => ipcRenderer.send('toggle-private'),
    onHighlightTab: (callback) => ipcRenderer.on('highlight-tab', (event, index) => callback(index)),
    duplicateTab: (index) => ipcRenderer.send('duplicate-tab', index)
});
