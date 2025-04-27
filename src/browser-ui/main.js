const { app, BrowserWindow, BrowserView, ipcMain, session } = require('electron');
const path = require('path');
const { configureSession } = require('../core/session-config');

let mainWindow;
let views = [];
let activeViewIndex = -1;
let privateMode = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'startpage.html'));

    ipcMain.on('create-tab', (event, url) => {
        const view = new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                partition: privateMode ? 'persist:private' : undefined
            }
        });

        views.push(view);
        activeViewIndex = views.length - 1;
        mainWindow.addBrowserView(view);
        setViewBounds(view);
        view.webContents.loadURL(url);
        setActiveView();
    });

    ipcMain.on('switch-tab', (event, index) => {
        if (index >= 0 && index < views.length) {
            activeViewIndex = index;
            setActiveView();
        }
    });

    ipcMain.on('close-tab', (event, index) => {
        if (index >= 0 && index < views.length) {
            const view = views[index];
            if (view) {
                mainWindow.removeBrowserView(view);
                view.webContents.destroy();
                views.splice(index, 1);

                if (views.length === 0) {
                    app.quit();
                } else {
                    if (activeViewIndex >= views.length) {
                        activeViewIndex = views.length - 1;
                    }
                    setActiveView();
                }
            }
        }
    });

    ipcMain.on('toggle-private', () => {
        privateMode = !privateMode;
        console.log('Private mode now:', privateMode ? 'ON' : 'OFF');
        configureSession(session.defaultSession, privateMode);
    });


    ipcMain.on('duplicate-tab', (event, index) => {
        if (index >= 0 && index < views.length) {
            const originalView = views[index];
            const newView = new BrowserView({
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                }
            });

            mainWindow.addBrowserView(newView);
            setViewBounds(newView);

            const url = originalView.webContents.getURL();
            newView.webContents.loadURL(url);

            views.push(newView);
            activeViewIndex = views.length - 1;
            setActiveView();
        }
    });


}



function setViewBounds(view) {
    const windowBounds = mainWindow.getBounds();
    view.setBounds({
        x: 0,
        y: 85, // 40px for tabs + 40px for search bar
        width: windowBounds.width,
        height: windowBounds.height - 60
    });
    view.setAutoResize({ width: true, height: true });
}

function setActiveView() {
    if (views.length > 0) {
        views.forEach(view => mainWindow.removeBrowserView(view));
        const activeView = views[activeViewIndex];
        if (activeView) {
            mainWindow.addBrowserView(activeView);
            setViewBounds(activeView);
            mainWindow.webContents.send('highlight-tab', activeViewIndex);
        }
    }
}

app.whenReady().then(() => {
    configureSession(session.defaultSession);
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
