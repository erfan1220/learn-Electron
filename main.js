const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: { nodeIntegration: false },
  });

  win.loadURL("http://localhost:4200");
}

app.on("ready", createWindow);