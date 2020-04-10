import dayjs from "dayjs"
import {
    syncQuotes,
    subStringInArray,
    generateNotification,
    filterSubStrings,
    arrayHasSubString,
} from '../utilities/utilities';


const ONEMINUTE = 60 * 1000;



export const write = (obj, callback = () => { }) =>
    chrome.storage.sync.set(obj, callback);

export const read = (keys, callback) =>
    chrome.storage.sync.get(keys, callback);

export const syncTempAccess = (tempAccess) => {
    const dayjsObj = dayjs();
    const updated = tempAccess.filter(
        (temp) => dayjsObj.diff(dayjs(temp.firstAccess), 'minutes') < temp.time
    );

    if (updated.length < tempAccess.length) {
        write({ tempAccess: updated });
    }
    return updated;
};

export const handleTabChange = () => {
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

export const syncStorage = (rawQuotes, callback = () => { }) => {
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


export const notifyRest = () => {

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

export const notifyMindless = () => {
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

export const isMindless = (url, mindlessURLs, tempAccessURLs, state) => {
    if (/^chrome-extension:/.test(url) || !mindlessURLs) {
        return;
    }

    const isMindless = !!subStringInArray(url, mindlessURLs);
    const longestMatch = filterSubStrings(state.dangerList, url).reduce(
        (a, b) => (a.length > b.length ? a : b),
        ''
    );
    const tempAccessPattern = arrayHasSubString(tempAccessURLs, longestMatch);

    if (!isMindless) return;

    if (!(tempAccessPattern && tempAccessPattern.length <= longestMatch.length)) {
        return longestMatch;
    }
};

export const handleStorageChange = (changes, currentState) => {
    console.log("handleStorageChange", currentState)
    if (changes.dangerList) {
        currentState.dangerList = changes.dangerList.newValue;
    }
    if (changes.tempAccess) {
        currentState.tempAccess = changes.tempAccess.newValue;
    }
    if (changes.dangerTime) {
        clearInterval(currentState.timerDanger);
        currentState.timerDanger = setInterval(
            notifyMindless,
            ONEMINUTE * changes.dangerTime.newValue
        );
    }
    if (changes.restTime) {
        clearInterval(currentState.timerRest);
        currentState.timerRest = setInterval(
            notifyRest,
            ONEMINUTE * changes.restTime.newValue
        );
    }
};

export const handlePageLoad = ({ url }, currentState) => {
    console.log("handlePageLoad", currentState)
    const tempAccessURLs = currentState.tempAccess
        ? currentState.tempAccess.map((temp) => temp.blockPattern)
        : [];
    const mindlessURLs = currentState.dangerList || [];
    const pattern = isMindless(url, mindlessURLs, tempAccessURLs, currentState);
    const stopUrl = chrome.extension.getURL('/stop.html');
    const isStopPage = url.includes(stopUrl);

    if (isStopPage && currentState.reload) {
        currentState.reload = false;

        handleTabChange();
    } else {
        currentState.reload = true;
    }

    if (pattern) {
        return {
            redirectUrl: chrome.extension.getURL(
                `stop.html?url=${url}&pattern=${pattern}`
            ),
        };
    }
};
