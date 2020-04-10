/* eslint-disable no-undef */

import motivations from '../motivation';
import {
  read,
  syncTempAccess,
  handleTabChange,
  syncStorage,
  notifyMindless,
  notifyRest,
  handleStorageChange,
  handlePageLoad
} from "./API/API"

const ONEMINUTE = 60 * 1000;
const state = {
  tempAccess: undefined,
  timerRest: undefined,
  timerDanger: undefined,
  dangerList: undefined,
  reload: true,
  lastUrl: undefined,
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (state.lastUrl !== tab.url) {
    state.lastUrl = tab.url;
    state.tempAccess = syncTempAccess(state.tempAccess);

    if (typeof handlePageLoad({ url: tab.url }, state) !== 'undefined') {
      chrome.tabs.reload(tabId);
    }
  }
});

syncStorage(motivations, () => {
  read(
    ['restTime', 'dangerTime', 'dangerList', 'tempAccess'],
    ({ restTime, dangerTime, dangerList, tempAccess }) => {
      state.timerRest = setInterval(notifyRest, ONEMINUTE * restTime);
      state.timerDanger = setInterval(notifyMindless, ONEMINUTE * dangerTime);
      state.dangerList = dangerList;
      state.tempAccess = syncTempAccess(tempAccess);
      chrome.tabs.onActivated.addListener(handleTabChange);
      chrome.storage.onChanged.addListener((changes) => handleStorageChange(changes, state));
      chrome.webRequest.onBeforeRequest.addListener(
        ({ url }) => handlePageLoad({ url }, state),
        {
          urls: ['<all_urls>'],
          types: ['main_frame'],
        },
        ['blocking']
      );
    }
  );
});

}