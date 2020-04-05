/* eslint-disable no-undef */
import dayjs from 'dayjs';
import motivations from '../motivation';
import {
  syncQuotes,
  subStringInArray,
  generateNotification,
  filterSubStrings,
  arrayHasSubString,
} from './utilities/utilities';

const write = (obj, callback = () => {}) =>
  chrome.storage.sync.set(obj, callback);

const read = (keys, callback) => chrome.storage.sync.get(keys, callback);

const syncTempAccess = (tempAccess) => {
  const dayjsObj = dayjs();
  const updated = tempAccess.filter(
    (temp) => dayjsObj.diff(dayjs(temp.firstAccess), 'minutes') < temp.time
  );

  if (updated.length < tempAccess.length) {
    write({ tempAccess: updated });
  }
  return updated;
};

let lastUrl;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (lastUrl !== tab.url) {
    lastUrl = tab.url;
    tempAccessGlobal = syncTempAccess(tempAccessGlobal);

    if (typeof handlePageLoad({ url: tab.url }) !== 'undefined') {
      chrome.tabs.reload(tabId);
    }
  }
});

const handleTabChange = () => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },

    (tabs) => {
      if (!(tabs && tabs[0] && tabs[0].url)) {
        return;
      }
      const { url } = tabs[0];
      const isStopPage = url.includes(chrome.extension.getURL('/stop.html'));
      if (isStopPage) {
        chrome.tabs.update(tabs[0].id, { url });
      }
    }
  );
};

const syncStorage = (rawQuotes, callback = () => {}) => {
  read(
    [
      'dangerTime',
      'restTime',
      'dangerReminderSwitch',
      'restReminderSwitch',
      'defaultQuotes',
      'defaultRemindersRest',
      'defaultRemindersDanger',
      'copy',
      'dangerList',
      'tempAccess',
      'userQuotes',
      'userRemindersDanger',
      'userRemindersRest',
    ],
    (res) => {
      write(
        {
          userQuotes: res.userQuotes || [],
          userRemindersDanger: res.userRemindersDanger || [],
          userRemindersRest: res.userRemindersRest || [],
          dangerList: res.dangerList || [],
          dangerTime: res.dangerTime || 15,
          restTime: res.restTime || 15,
          defaultQuotes: syncQuotes(rawQuotes.defaultQuotes, res.defaultQuotes),
          defaultRemindersRest: syncQuotes(
            rawQuotes.defaultQuotes,
            res.defaultRemindersRest
          ),
          tempAccess: res.tempAccess || [],
          defaultRemindersDanger: syncQuotes(
            rawQuotes.defaultQuotes,
            res.defaultRemindersDanger
          ),
          dangerReminderSwitch:
            typeof res.dangerReminderSwitch === 'undefined'
              ? true
              : res.dangerReminderSwitch,
          restReminderSwitch:
            typeof res.restReminderSwitch === 'undefined'
              ? false
              : res.restReminderSwitch,
          copy: typeof res.copy === 'undefined' ? false : res.copy,
        },
        () => callback()
      );
    }
  );
};

const notifyRest = () => {
  read(
    [
      'defaultRemindersRest',
      'userRemindersRest',
      'restReminderSwitch',
      'dangerList',
    ],
    ({
      defaultRemindersRest = [],
      userRemindersRest = [],
      restReminderSwitch,
      dangerList = [],
    }) => {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true,
        },
        (tabs) => {
          if (!(tabs && tabs[0] && tabs[0].url && restReminderSwitch)) {
            return;
          }
          if (subStringInArray(tabs[0].url, dangerList)) {
            return;
          }

          chrome.notifications.create(
            'ReminderRest',
            generateNotification(defaultRemindersRest, userRemindersRest),
            (id) => setTimeout(() => chrome.notifications.clear(id), 15000)
          );
        }
      );
    }
  );
};

const notifyMindless = () => {
  read(
    [
      'defaultRemindersDanger',
      'userRemindersDanger',
      'dangerReminderSwitch',
      'dangerList',
    ],
    ({
      defaultRemindersDanger = [],
      userRemindersDanger = [],
      dangerReminderSwitch,
      dangerList = [],
    }) => {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true,
        },
        (tabs) => {
          if (!(tabs && tabs[0] && tabs[0].url && dangerReminderSwitch)) {
            return;
          }
          if (!subStringInArray(tabs[0].url, dangerList)) {
            return;
          }

          chrome.notifications.create(
            'ReminderMindless',
            generateNotification(defaultRemindersDanger, userRemindersDanger),
            (id) => setTimeout(() => chrome.notifications.clear(id), 15000)
          );
        }
      );
    }
  );
};

let reload = true;
const handlePageLoad = ({ url }) => {
  const tempAccessURLs = tempAccessGlobal
    ? tempAccessGlobal.map((temp) => temp.blockPattern)
    : [];
  const mindlessURLs = dangerListGlobal || [];
  const pattern = isMindless(url, mindlessURLs, tempAccessURLs);
  const stopUrl = chrome.extension.getURL('/stop.html');
  const isStopPage = url.includes(stopUrl);

  if (isStopPage && reload) {
    reload = false;

    handleTabChange();
  } else {
    reload = true;
  }

  if (pattern) {
    return {
      redirectUrl: chrome.extension.getURL(
        `stop.html?url=${url}&pattern=${pattern}`
      ),
    };
  }
};

const handleStorageChange = (changes) => {
  if (changes.dangerList) {
    dangerListGlobal = changes.dangerList.newValue;
  }
  if (changes.tempAccess) {
    tempAccessGlobal = changes.tempAccess.newValue;
  }
  if (changes.dangerTime) {
    clearInterval(timerDangerGlobal);
    timerDangerGlobal = setInterval(
      notifyMindless,
      ONEMINUTE * changes.dangerTime.newValue
    );
  }
  if (changes.restTime) {
    clearInterval(timerRestGlobal);
    timerRestGlobal = setInterval(
      notifyRest,
      ONEMINUTE * changes.restTime.newValue
    );
  }
};

const ONEMINUTE = 60 * 1000;
let timerRestGlobal;
let timerDangerGlobal;
let dangerListGlobal;
let tempAccessGlobal;

syncStorage(motivations, () => {
  read(
    ['restTime', 'dangerTime', 'dangerList', 'tempAccess'],
    ({ restTime, dangerTime, dangerList, tempAccess }) => {
      timerRestGlobal = setInterval(notifyRest, ONEMINUTE * restTime);
      timerDangerGlobal = setInterval(notifyMindless, ONEMINUTE * dangerTime);

      dangerListGlobal = dangerList;
      tempAccessGlobal = syncTempAccess(tempAccess);
      chrome.tabs.onActivated.addListener(handleTabChange);
      chrome.storage.onChanged.addListener(handleStorageChange);
      chrome.webRequest.onBeforeRequest.addListener(
        handlePageLoad,
        {
          urls: ['<all_urls>'],
          types: ['main_frame'],
        },
        ['blocking']
      );
    }
  );
});

const isMindless = (url, mindlessURLs, tempAccessURLs) => {
  if (/^chrome-extension:/.test(url) || !mindlessURLs) {
    return;
  }

  const isMindless = !!subStringInArray(url, mindlessURLs);
  const longestMatch = filterSubStrings(dangerListGlobal, url).reduce(
    (a, b) => (a.length > b.length ? a : b),
    ''
  );
  const tempAccessPattern = arrayHasSubString(tempAccessURLs, longestMatch);

  if (!isMindless) return;

  if (!(tempAccessPattern && tempAccessPattern.length <= longestMatch.length)) {
    return longestMatch;
  }
};
