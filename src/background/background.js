/* eslint-disable no-undef */

import motivations from '../motivation';
import {

  syncTempAccess,
  reloadIfStopPage,
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
  isMIUEnabled: undefined
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
  chrome.storage.sync.get(
    ['restTime', 'dangerTime', 'dangerList', 'tempAccess', 'isMIUEnabled'],
    ({ restTime, dangerTime, dangerList, tempAccess, isMIUEnabled }) => {

      state.timerRest = setInterval(notifyRest, ONEMINUTE * restTime);
      state.timerDanger = setInterval(notifyMindless, ONEMINUTE * dangerTime);
      state.dangerList = dangerList;
      state.tempAccess = syncTempAccess(tempAccess);
      state.isMIUEnabled = isMIUEnabled
      chrome.tabs.onActivated.addListener(reloadIfStopPage);
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



