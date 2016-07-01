const electron = require('electron');
const { app, BrowserWindow } = electron;
let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    resizable: false,
    frame: false
  });
  // win.loadURL(`file://${__dirname}/index.html`);
  win.loadURL('http://localhost:8080');
});

app.on('window-all-closed', () => {
  app.quit();
});

require('./prices.js');