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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["a"] = ({
  htmlToElement: function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result

    template.innerHTML = html;
    return template.content.firstChild;
  },
  handleClass: function handleClass(shouldContain, className, element) {
    //   //console.log(shouldContain, className, element);
    if (shouldContain) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  },
  updateStorageValue: function updateStorageValue(key, value, callback) {
    chrome.storage.sync.set(_defineProperty({}, key, value), function () {
      callback();
    });
  },
  insertAfter: function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:e,s:n,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return!e&&r&&(l=r),r||!e&&l},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u,$offset:n.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:h[o]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),r=M(t,n,!0);return r&&(e.$L=r),e},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(1);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// EXTERNAL MODULE: ./src/utilities.js
var utilities = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/createTimerButton.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* harmony default export */ var createTimerButton = (function (id, name, onchange) {
  return new TimerButton(id, name, onchange);
});

var TimerButton = /*#__PURE__*/function () {
  function TimerButton(id, name, onchange) {
    _classCallCheck(this, TimerButton);

    this.container = document.getElementById(id);
    this.name = name;
    this.onchange = onchange; // console.log(this.container);

    this.minutes = [5, 10, 15, 30, 45, 60]; // set up handler

    document.addEventListener("click", this.closeAllSelect);
    this.setUpHtml();
    this.setUpList();
    this.startKeyBoardController();
  }

  _createClass(TimerButton, [{
    key: "setUpHtml",
    value: function setUpHtml() {
      this.container.innerHTML = "\n    <div  class=\"custom-select-access custom-select-access-".concat(this.name, "\">\n    <select class=\"custom-select-access__select\">\n        <option  value=\"\">ACCESS</option>\n        <option  value=").concat(this.minutes[0], ">").concat(this.minutes[0], "min</option>\n        <option value=").concat(this.minutes[1], ">").concat(this.minutes[1], "min</option>\n        <option value=").concat(this.minutes[2], ">").concat(this.minutes[2], "min</option>\n        <option value=").concat(this.minutes[3], ">").concat(this.minutes[3], "min</option>\n        <option value=").concat(this.minutes[4], ">").concat(this.minutes[4], "min</option>\n        <option value=").concat(this.minutes[5], ">").concat(this.minutes[5], "min</option>\n        \n    </select>\n    </div>\n    ");
    }
  }, {
    key: "setUpList",
    value: function setUpList() {
      var self = this;
      var i;
      var j;
      var selElmnt;
      var a;
      var b;
      var c;
      /* Look for any elements with the class "custom-select": */

      var x = document.getElementsByClassName("custom-select-access-".concat(this.name)); // console.log(this.name, x);

      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */

        a = document.createElement("DIV");
        a.setAttribute("class", "select-access-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */

        b = document.createElement("DIV");
        b.setAttribute("class", "select-access-items select-access-hide");

        for (j = 1; j < selElmnt.length; j++) {
          /* For each option in the original select element,
          create a new DIV that will act as an option item: */
          c = document.createElement("DIV");
          c.setAttribute("minute", this.minutes[j - 1]);
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
              and the selected item: */
            self.timeSet(e);
            var y;
            var i;
            var k;
            var s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            var h = this.parentNode.previousSibling;

            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected-access");

                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }

                this.setAttribute("class", "same-as-selected-access");
                break;
              }
            }

            h.click();
          });
          b.appendChild(c);
        }

        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation();
          self.closeAllSelect(this);
          this.nextSibling.classList.toggle("select-access-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
    }
  }, {
    key: "closeAllSelect",
    value: function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var i;
      var arrNo = [];
      var x = document.getElementsByClassName("select-access-items");
      var y = document.getElementsByClassName("select-access-selected");

      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }

      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-access-hide");
        }
      }
    }
  }, {
    key: "startKeyBoardController",
    value: function startKeyBoardController() {
      var _this = this;

      var accessItems = document.querySelector(".select-access-items");
      var options = accessItems.children;
      var select = document.querySelector(".select-access-selected");
      select.classList.add("focus");
      var focusedIndex = 0;
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          var focused = document.querySelector(".focus");
          var minute = focused.getAttribute("minute");

          if (minute) {
            _this.onchange(minute);
          }
        }

        if (e.key === "ArrowDown") {
          select.classList.remove("focus");
          options[focusedIndex].classList.remove("focus");

          if (!select.classList.contains("select-arrow-active")) {
            select.classList.add("select-arrow-active");
            accessItems.classList.remove("select-access-hide");
          } else {
            focusedIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : options.length - 1;
          }
        } else if (e.key === "ArrowUp") {
          options[focusedIndex].classList.remove("focus");

          if (focusedIndex > 0) {
            focusedIndex--;
          } else {
            select.classList.remove("select-arrow-active");
            accessItems.classList.add("select-access-hide");
            select.classList.add("focus");
          }
        }

        options[focusedIndex].classList.add("focus");
      });
    }
  }, {
    key: "timeSet",
    value: function timeSet(e) {
      var minutes = e.target.textContent.substring(0, e.target.textContent.length - 3);
      this.onchange(minutes);
    }
  }]);

  return TimerButton;
}();
// CONCATENATED MODULE: ./src/stop/stop.js




var closeTab = function closeTab(e) {
  chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.remove(tab.id, function () {});
  });
};

var goToOptions = function goToOptions() {
  chrome.tabs.create({
    url: "options.html"
  });
};

chrome.storage.sync.get(["copy"], function (_ref) {
  var copy = _ref.copy;
  var breathCounter = document.getElementById("breathCounter");
  var breathsLeft = copy ? 20 : 30;
  breathCounter.textContent = breathsLeft;
  var timer = setInterval(function () {
    breathsLeft--;
    breathCounter.textContent = breathsLeft;

    if (breathsLeft === 0) {
      clearInterval(timer);
      setupAfterBreaths();
    }
  }, 1000);
});
var currentIndex = 0;
var motivationNode = "";
var motivationAuthor = "";
var htmlString = "";
chrome.storage.sync.get(["defaultQuotes", "userQuotes", "copy"], function (result) {
  if (result.defaultQuotes) {
    var qoutes = result.defaultQuotes.reduce(function (total, current, index, array) {
      if (current.show) {
        total.push({
          qoute: current.qoute,
          author: current.author
        });
      }

      return total;
    }, []);

    if (result.userQuotes) {
      qoutes = qoutes.concat(result.userQuotes.map(function (qoute) {
        return {
          qoute: qoute
        };
      }));
    }

    if (qoutes.length === 0) {
      qoutes = [{
        qoute: "You don’t need a new plan for next year. You need a commitment",
        author: "Seth Godin"
      }];
    }

    var index = Math.floor(Math.random() * qoutes.length);
    var author = qoutes[index].author ? qoutes[index].author : "";
    var motivationSplit = qoutes[index].qoute.split("");
    motivationNode = document.getElementById("motivation-text");
    motivationAuthor = document.getElementById("motivation-author");
    htmlString = motivationSplit.reduce(function (htmlString, _char, index) {
      return htmlString += "<span data-index=".concat(index, ">").concat(_char, "</span>");
    }, "");
    motivationNode.innerHTML = htmlString;
    motivationAuthor.innerHTML = author;

    if (result.copy) {
      handleCopying(motivationSplit, author);
    } else {
      handleNotCopying();
    }
  } // console.log(motivationSplit);


  function handleCopying(motivationSplit) {
    motivationNode.insertAdjacentElement("afterbegin", utilities["a" /* default */].htmlToElement('<span class="blinking-cursor">|</span>'));
    document.addEventListener("keydown", registerKeyDonw);

    function isCorrectKeyCode(pressedKey, expected) {
      return pressedKey.toLowerCase() === expected.toLowerCase();
    }

    function registerKeyDonw(e) {
      var currentChar = motivationSplit[currentIndex];

      if (isCorrectKeyCode(e.key, currentChar)) {
        var charHtml = motivationNode.querySelector("[data-index='".concat(currentIndex, "']"));
        charHtml.previousElementSibling && motivationNode.removeChild(charHtml.previousElementSibling);
        utilities["a" /* default */].insertAfter(utilities["a" /* default */].htmlToElement('<span class="blinking-cursor">|</span>'), charHtml);
        charHtml.classList.add("mark");
        currentIndex++;
      }

      if (currentIndex === motivationSplit.length) {
        document.removeEventListener("keydown", registerKeyDonw);
        makeTempAccess();
      }
    }
  }
});

function makeTempAccess() {
  var url = new URL(window.location.href);
  var blockUrl = url.searchParams.get("url");
  var blockPattern = url.searchParams.get("pattern");
  var accessContainer = document.querySelector("#access-container");
  accessContainer.innerHTML = "";
  accessContainer.innerHTML = "";
  createTimerButton("access-container", "access-dropdown", function (time) {
    chrome.storage.sync.get(["tempAccess"], function (result) {
      var tempAccess = [];

      if (result.tempAccess) {
        tempAccess = result.tempAccess;
      }

      tempAccess.push({
        blockPattern: blockPattern,
        firstAccess: dayjs_min_default()().format(),
        time: time
      });
      chrome.storage.sync.set({
        tempAccess: tempAccess
      }, function () {
        window.location.replace(blockUrl);
      });
    });
  });
}

function setupAfterBreaths() {
  document.querySelector(".breath").style.display = "none";
  document.getElementById("afterBreath").style.display = "flex";
}

function handleNotCopying() {
  document.querySelector(".motivation-text-intro").style.display = "none";
  makeTempAccess();
}

document.querySelector(".logo").addEventListener("click", goToOptions);
document.querySelector(".accessBtn--close").addEventListener("click", closeTab);
document.querySelector(".accessBtn--options").addEventListener("click", goToOptions);
console.log(window.location.href);

/***/ })
/******/ ]);