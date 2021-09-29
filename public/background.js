/*global chrome*/

chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    chrome.storage.local.set({ shotImage: dataUrl }, function () {
      chrome.tabs.create({
        url: chrome.runtime.getURL("index.html"),
      });
    });
  });
});

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    chrome.storage.local.set({ shotImage: dataUrl }, function () {
      chrome.tabs.create({
        url: chrome.runtime.getURL("index.html"),
      });
    });
  });
});
