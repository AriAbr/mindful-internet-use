/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:e,s:n,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return!e&&r&&(l=r),r||!e&&l},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u,$offset:n.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:h[o]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),r=M(t,n,!0);return r&&(e.$L=r),e},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/motivation.js
var defaultQuotes = [{
  qoute: 'Mindfulness means being awake. It means knowing what you are doing',
  author: 'Jon Kabat-Zinn'
}, {
  qoute: 'Only put off until tomorrow what you are willing to die having left undone',
  author: 'Pablo Picasso'
}, {
  qoute: 'The difference between technology and slavery is that slaves are fully aware that they are not free',
  author: 'Nassim Nicholas Taleb'
}, {
  qoute: 'You may delay, but time will not',
  author: 'Benjamin Franklin'
}, {
  qoute: 'You cannot escape the responsibility of tomorrow by evading it today',
  author: 'Abraham Lincoln'
}, {
  qoute: 'Until we can manage time, we can manage nothing else',
  author: 'Peter Drucker'
}, {
  qoute: 'Time is at once the most valuable and the most perishable of all our possessions',
  author: 'John Randolph'
}, {
  qoute: 'Lost time is never found again',
  author: 'Benjamin Franklin'
}, {
  qoute: "You don't need a new plan for next year. You need a commitment",
  author: 'Seth Godin'
}, {
  qoute: 'There is no substitute for hard work',
  author: 'Thomas Edison'
}, {
  qoute: 'Action is the foundational key to all success',
  author: 'Pablo Picasso'
}, {
  qoute: 'Only put off until tomorrow what you are willing to die having left undone',
  author: 'Pablo Picasso'
}, {
  qoute: 'A year from now you may wish you had started today',
  author: 'Karen Lamb'
}, {
  qoute: "Don't wait. The time will never be just right",
  author: 'Napoleon Hill'
}, {
  qoute: 'The best way to get something done is to begin'
}];
/* harmony default export */ var motivation = ({
  defaultQuotes: defaultQuotes
});
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(1);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// CONCATENATED MODULE: ./src/background/utilities/utilities.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterSubStrings = function filterSubStrings(strings, string) {
  return strings.filter(function (elem) {
    return string.toLowerCase().indexOf(elem.toLowerCase()) !== -1;
  });
};
var syncQuotes = function syncQuotes(newQoutes, currentQoutes) {
  if (!currentQoutes) {
    return newQoutes.map(function (qoute) {
      return _objectSpread({}, qoute, {
        show: true
      });
    });
  }

  return newQoutes.map(function (newQoute) {
    var qoute = currentQoutes.find(function (currentQoute) {
      return currentQoute.qoute === newQoute.qoute;
    });
    var show = typeof qoute === 'undefined' ? false : qoute.show;
    return _objectSpread({}, newQoute, {
      show: show
    });
  });
};
var filterShowAndConcat = function filterShowAndConcat(quotes, newQoute) {
  return quotes.filter(function (quote) {
    return quote.show;
  }).map(function (quote) {
    return quote.qoute;
  }).concat(newQoute);
};

var randomIntegerBetween = function randomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomElement = function getRandomElement(list) {
  return list && list.length > 0 ? list[randomIntegerBetween(0, list.length - 1)] : undefined;
};
var getRandomQuote = function getRandomQuote(quoteObjects, quotes) {
  return getRandomElement(filterShowAndConcat(quoteObjects, quotes));
};
var subStringInArray = function subStringInArray(string, array) {
  return array.find(function (elem) {
    return string.toLowerCase().indexOf(elem.toLowerCase()) !== -1;
  });
};
var arrayHasSubString = function arrayHasSubString(array, string) {
  return array.find(function (elem) {
    return elem.toLowerCase().indexOf(string.toLowerCase()) !== -1;
  });
};
var generateNotification = function generateNotification(defaults, userDefined) {
  return {
    type: 'basic',
    title: 'Mindful Internet Use',
    iconUrl: '../img/logoBlue128.png',
    message: getRandomQuote(defaults, userDefined) || 'Until we can manage time, we can manage nothing else'
  };
};
// CONCATENATED MODULE: ./src/background/API/API.js


var ONEMINUTE = 60 * 1000;
var API_syncTempAccess = function syncTempAccess(tempAccess) {
  var dayjsObj = dayjs_min_default()();
  var updated = tempAccess.filter(function (temp) {
    return dayjsObj.diff(dayjs_min_default()(temp.firstAccess), 'minutes') <= temp.time;
  });

  if (updated.length < tempAccess.length) {
    chrome.storage.sync.set({
      tempAccess: updated
    });
  }

  return updated;
};
var handleTabChange = function handleTabChange() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    if (!(tabs && tabs[0] && tabs[0].url)) {
      return;
    }

    var url = tabs[0].url;
    var isStopPage = url.includes(chrome.extension.getURL('/stop.html'));

    if (isStopPage) {
      chrome.tabs.update(tabs[0].id, {
        url: url
      });
    }
  });
};
var API_syncStorage = function syncStorage(rawQuotes) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  chrome.storage.sync.get(['dangerTime', 'restTime', 'dangerReminderSwitch', 'restReminderSwitch', 'defaultQuotes', 'defaultRemindersRest', 'defaultRemindersDanger', 'copy', 'dangerList', 'tempAccess', 'userQuotes', 'userRemindersDanger', 'userRemindersRest'], function (res) {
    chrome.storage.sync.set({
      userQuotes: res.userQuotes || [],
      userRemindersDanger: res.userRemindersDanger || [],
      userRemindersRest: res.userRemindersRest || [],
      dangerList: res.dangerList || [],
      dangerTime: res.dangerTime || 15,
      restTime: res.restTime || 15,
      defaultQuotes: syncQuotes(rawQuotes.defaultQuotes, res.defaultQuotes),
      defaultRemindersRest: syncQuotes(rawQuotes.defaultQuotes, res.defaultRemindersRest),
      tempAccess: res.tempAccess || [],
      defaultRemindersDanger: syncQuotes(rawQuotes.defaultQuotes, res.defaultRemindersDanger),
      dangerReminderSwitch: typeof res.dangerReminderSwitch === 'undefined' ? true : res.dangerReminderSwitch,
      restReminderSwitch: typeof res.restReminderSwitch === 'undefined' ? false : res.restReminderSwitch,
      copy: typeof res.copy === 'undefined' ? false : res.copy
    }, function () {
      return callback();
    });
  });
};
var API_notifyRest = function notifyRest() {
  chrome.storage.sync.get(['defaultRemindersRest', 'userRemindersRest', 'restReminderSwitch', 'dangerList'], function (_ref) {
    var _ref$defaultReminders = _ref.defaultRemindersRest,
        defaultRemindersRest = _ref$defaultReminders === void 0 ? [] : _ref$defaultReminders,
        _ref$userRemindersRes = _ref.userRemindersRest,
        userRemindersRest = _ref$userRemindersRes === void 0 ? [] : _ref$userRemindersRes,
        restReminderSwitch = _ref.restReminderSwitch,
        _ref$dangerList = _ref.dangerList,
        dangerList = _ref$dangerList === void 0 ? [] : _ref$dangerList;
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      if (!(tabs && tabs[0] && tabs[0].url && restReminderSwitch)) {
        return;
      }

      if (subStringInArray(tabs[0].url, dangerList)) {
        return;
      }

      chrome.notifications.create('ReminderRest', generateNotification(defaultRemindersRest, userRemindersRest), function (id) {
        return setTimeout(function () {
          return chrome.notifications.clear(id);
        }, 15000);
      });
    });
  });
};
var API_notifyMindless = function notifyMindless() {
  chrome.storage.sync.get(['defaultRemindersDanger', 'userRemindersDanger', 'dangerReminderSwitch', 'dangerList'], function (_ref2) {
    var _ref2$defaultReminder = _ref2.defaultRemindersDanger,
        defaultRemindersDanger = _ref2$defaultReminder === void 0 ? [] : _ref2$defaultReminder,
        _ref2$userRemindersDa = _ref2.userRemindersDanger,
        userRemindersDanger = _ref2$userRemindersDa === void 0 ? [] : _ref2$userRemindersDa,
        dangerReminderSwitch = _ref2.dangerReminderSwitch,
        _ref2$dangerList = _ref2.dangerList,
        dangerList = _ref2$dangerList === void 0 ? [] : _ref2$dangerList;
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      if (!(tabs && tabs[0] && tabs[0].url && dangerReminderSwitch)) {
        return;
      }

      if (!subStringInArray(tabs[0].url, dangerList)) {
        return;
      }

      chrome.notifications.create('ReminderMindless', generateNotification(defaultRemindersDanger, userRemindersDanger), function (id) {
        return setTimeout(function () {
          return chrome.notifications.clear(id);
        }, 15000);
      });
    });
  });
};
var API_isMindless = function isMindless(url, mindlessURLs, tempAccessURLs, state) {
  if (/^chrome-extension:/.test(url) || !mindlessURLs) {
    return;
  }

  var isMindless = !!subStringInArray(url, mindlessURLs);
  var longestMatch = filterSubStrings(state.dangerList, url).reduce(function (a, b) {
    return a.length > b.length ? a : b;
  }, '');
  var tempAccessPattern = arrayHasSubString(tempAccessURLs, longestMatch);
  if (!isMindless) return;

  if (!(tempAccessPattern && tempAccessPattern.length <= longestMatch.length)) {
    return longestMatch;
  }
};
var handleStorageChange = function handleStorageChange(changes, currentState) {
  console.log("handleStorageChange", currentState);

  if (changes.dangerList) {
    currentState.dangerList = changes.dangerList.newValue;
  }

  if (changes.tempAccess) {
    currentState.tempAccess = changes.tempAccess.newValue;
  }

  if (changes.dangerTime) {
    clearInterval(currentState.timerDanger);
    currentState.timerDanger = setInterval(API_notifyMindless, ONEMINUTE * changes.dangerTime.newValue);
  }

  if (changes.restTime) {
    clearInterval(currentState.timerRest);
    currentState.timerRest = setInterval(API_notifyRest, ONEMINUTE * changes.restTime.newValue);
  }
};
var handlePageLoad = function handlePageLoad(_ref3, currentState) {
  var url = _ref3.url;
  console.log("handlePageLoad", currentState);
  var tempAccessURLs = currentState.tempAccess ? currentState.tempAccess.map(function (temp) {
    return temp.blockPattern;
  }) : [];
  var mindlessURLs = currentState.dangerList || [];
  var pattern = API_isMindless(url, mindlessURLs, tempAccessURLs, currentState);
  var stopUrl = chrome.extension.getURL('/stop.html');
  var isStopPage = url.includes(stopUrl);

  if (isStopPage && currentState.reload) {
    currentState.reload = false;
    handleTabChange();
  } else {
    currentState.reload = true;
  }

  if (pattern) {
    return {
      redirectUrl: chrome.extension.getURL("stop.html?url=".concat(url, "&pattern=").concat(pattern))
    };
  }
};
// CONCATENATED MODULE: ./src/background/background.js
/* eslint-disable no-undef */


var background_ONEMINUTE = 60 * 1000;
var background_state = {
  tempAccess: undefined,
  timerRest: undefined,
  timerDanger: undefined,
  dangerList: undefined,
  reload: true,
  lastUrl: undefined
};
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (background_state.lastUrl !== tab.url) {
    background_state.lastUrl = tab.url;
    background_state.tempAccess = API_syncTempAccess(background_state.tempAccess);

    if (typeof handlePageLoad({
      url: tab.url
    }, background_state) !== 'undefined') {
      chrome.tabs.reload(tabId);
    }
  }
});
API_syncStorage(motivation, function () {
  chrome.storage.sync.get(['restTime', 'dangerTime', 'dangerList', 'tempAccess'], function (_ref) {
    var restTime = _ref.restTime,
        dangerTime = _ref.dangerTime,
        dangerList = _ref.dangerList,
        tempAccess = _ref.tempAccess;
    background_state.timerRest = setInterval(API_notifyRest, background_ONEMINUTE * restTime);
    background_state.timerDanger = setInterval(API_notifyMindless, background_ONEMINUTE * dangerTime);
    background_state.dangerList = dangerList;
    background_state.tempAccess = API_syncTempAccess(tempAccess);
    chrome.tabs.onActivated.addListener(handleTabChange);
    chrome.storage.onChanged.addListener(function (changes) {
      return handleStorageChange(changes, background_state);
    });
    chrome.webRequest.onBeforeRequest.addListener(function (_ref2) {
      var url = _ref2.url;
      return handlePageLoad({
        url: url
      }, background_state);
    }, {
      urls: ['<all_urls>'],
      types: ['main_frame']
    }, ['blocking']);
  });
});

/***/ })

/******/ });