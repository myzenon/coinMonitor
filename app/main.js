const electron = require('electron');
const EventEmitter = require('events');
const { app, BrowserWindow, ipcMain } = electron;
let win;

const isDev = process.argv.indexOf('dev') === -1 ? false : true;

const mainEvent = new EventEmitter();
app.on('ready', () => {
  require('./prices.js')(mainEvent);
});

mainEvent.on('open-program', () => {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    resizable: false,
    frame: true,
    autoHideMenuBar: true
  });
  if(isDev) {
    win.loadURL('http://localhost:8080/index-dev.html');
  }
  else {
    win.loadURL(`file://${__dirname}/index.html`);
  }
});

app.on('window-all-closed', () => {
  app.quit();
});