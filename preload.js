// preload.js
// Can expose APIs to renderer later
// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // For future IPC or native APIs if you want
});
