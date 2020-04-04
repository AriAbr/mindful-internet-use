/* eslint-disable no-undef */
import dayjs from "dayjs";
import motivations from "../motivation";

// UNComment to test
// const chrome = require('sinon-chrome');
// module.exports = { filterSubStrings };

const write = (obj, callback = () => {}) =>
  chrome.storage.sync.set(obj, callback);

const read = (keys, callback) => chrome.storage.sync.get(keys, callback);

const syncTempAccess = tempAccess => {
  // read(['tempAccess'], ({ tempAccess }) => {
  //   if (!tempAccess) {
  //     return;
  //   }

  const dayjsObj = dayjs();
  const updated = tempAccess.filter(
    temp => dayjsObj.diff(dayjs(temp.firstAccess), "minutes") < temp.time
  );

  if (updated.length < tempAccess.length) {
    write({ tempAccess: updated });
  }
  return updated;
  // });
};

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Filter all string which includes string
const filterSubStrings = (arr, string) =>
  arr.filter(elem => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1);

// If no prevArr -> show all new quotes
// else sync newArrs' show with prevArr and don't show new quotes
const syncQuotes = (newArr, prevArr) => {
  if (!prevArr) {
    return newArr.map(qoute => ({ ...qoute, show: true }));
  }

  return newArr.map(newQoute => {
    const qoute = prevArr.find(prevQoute => prevQoute.qoute === newQoute.qoute);
    const show = typeof qoute === "undefined" ? false : qoute.show;
    return { ...newQoute, show };
  });
};

let lastUrl;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (lastUrl !== tab.url) {
    lastUrl = tab.url;
    tempAccessGlobal = syncTempAccess(tempAccessGlobal);

    if (typeof handlePageLoad({ url: tab.url }) !== "undefined") {
      chrome.tabs.reload(tabId);
    }
  }
});

const handleTabChange = () => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true
    },
    tabs => {
      if (!(tabs && tabs[0] && tabs[0].url)) {
        return;
      }
      const { url } = tabs[0];
      const isStopPage = url.includes(chrome.extension.getURL("/stop.html"));
      if (isStopPage) {
        chrome.tabs.update(tabs[0].id, { url });
      }
    }
  );
};

const syncStorage = (rawQuotes, callback = () => {}) => {
  read(
    [
      "dangerTime",
      "restTime",
      "dangerReminderSwitch",
      "restReminderSwitch",
      "defaultQuotes",
      "defaultRemindersRest",
      "defaultRemindersDanger",
      "copy",
      "dangerList",
      "tempAccess",
      "userQuotes",
      "userRemindersDanger",
      "userRemindersRest"
    ],
    res => {
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
            typeof res.dangerReminderSwitch === "undefined"
              ? true
              : res.dangerReminderSwitch,
          restReminderSwitch:
            typeof res.restReminderSwitch === "undefined"
              ? false
              : res.restReminderSwitch,
          copy: typeof res.copy === "undefined" ? false : res.copy
        },
        () => callback()
      );
    }
  );
};

const filterShowAndConcat = (defaults, userDefined) =>
  defaults
    .filter(quote => quote.show)
    .map(quote => quote.qoute)
    .concat(userDefined);

const getRandomElement = list =>
  list || list.length > 0 ? list[randomBetween(0, list.length - 1)] : undefined;

const getRandomQuote = (defaults, userDefined) =>
  getRandomElement(filterShowAndConcat(defaults, userDefined));

const generateNotification = (defaults, userDefined) => ({
  type: "basic",
  title: "Mindful Internet Use",
  iconUrl: "img/logoBlue128.png",
  message:
    getRandomQuote(defaults, userDefined) ||
    "Until we can manage time, we can manage nothing else"
});

const notifyRest = () => {
  read(
    [
      "defaultRemindersRest",
      "userRemindersRest",
      "restReminderSwitch",
      "dangerList"
    ],
    ({
      defaultRemindersRest = [],
      userRemindersRest = [],
      restReminderSwitch,
      dangerList = []
    }) => {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true
        },
        tabs => {
          if (!(tabs && tabs[0] && tabs[0].url && restReminderSwitch)) {
            return;
          }
          if (subStringInArray(tabs[0].url, dangerList)) {
            return;
          }

          chrome.notifications.create(
            "ReminderRest",
            generateNotification(defaultRemindersRest, userRemindersRest),
            id => setTimeout(() => chrome.notifications.clear(id), 15000)
          );
        }
      );
    }
  );
};

const notifyMindless = () => {
  read(
    [
      "defaultRemindersDanger",
      "userRemindersDanger",
      "dangerReminderSwitch",
      "dangerList"
    ],
    ({
      defaultRemindersDanger = [],
      userRemindersDanger = [],
      dangerReminderSwitch,
      dangerList = []
    }) => {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true
        },
        tabs => {
          if (!(tabs && tabs[0] && tabs[0].url && dangerReminderSwitch)) {
            return;
          }
          if (!subStringInArray(tabs[0].url, dangerList)) {
            return;
          }

          chrome.notifications.create(
            "ReminderMindless",
            generateNotification(defaultRemindersDanger, userRemindersDanger),
            id => setTimeout(() => chrome.notifications.clear(id), 15000)
          );
        }
      );
    }
  );
};

const subStringInArray = (string, array) =>
  array.find(elem => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1);

const arrayHasSubString = (array, string) =>
  array.find(elem => elem.toLowerCase().indexOf(string.toLowerCase()) !== -1);

const isMindless = (url, mindlessURLs, tempAccessURLs) => {
  if (/^chrome-extension:/.test(url) || !mindlessURLs) {
    return;
  }

  const isMindless = !!subStringInArray(url, mindlessURLs);
  const longestMatch = filterSubStrings(dangerListGlobal, url).reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  const tempAccessPattern = arrayHasSubString(tempAccessURLs, longestMatch);

  if (!isMindless) return;

  if (!(tempAccessPattern && tempAccessPattern.length <= longestMatch.length)) {
    return longestMatch;
  }
};

let reload = true;
const handlePageLoad = ({ url }) => {
  const tempAccessURLs = tempAccessGlobal
    ? tempAccessGlobal.map(temp => temp.blockPattern)
    : [];
  const mindlessURLs = dangerListGlobal || [];
  const pattern = isMindless(url, mindlessURLs, tempAccessURLs);
  const stopUrl = chrome.extension.getURL("/stop.html");
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
      )
    };
  }
};

const handleStorageChange = changes => {
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
    ["restTime", "dangerTime", "dangerList", "tempAccess"],
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
          urls: ["<all_urls>"],
          types: ["main_frame"]
        },
        ["blocking"]
      );
    }
  );
});
