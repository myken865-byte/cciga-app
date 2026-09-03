const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cciga", {
  openPortal: (role) => ipcRenderer.invoke("open-portal", role),
  retryLoad: () => ipcRenderer.invoke("retry-load"),
  goHome: () => ipcRenderer.invoke("go-home"),
});
