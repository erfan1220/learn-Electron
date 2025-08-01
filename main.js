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
//=================================================
// const { app, BrowserWindow } = require("electron");
// const path = require("path");

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   win.loadURL(
//     `file://${path.join(__dirname, "dist/crud_app_ui/browser/index.html")}`
//   );
// }

// app.whenReady().then(createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// "build": "ng build --configuration production",
// "start": "electron .",
// "package": "npm run build && electron-builder"
