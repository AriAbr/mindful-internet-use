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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/utilities.js
var utilities = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/createInputList.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/* harmony default export */ var createInputList = (function (id, storageKey, callbackAfterSetStorage) {
  return new createInputList_InputList(id, storageKey, callbackAfterSetStorage);
});

var createInputList_InputList = /*#__PURE__*/function () {
  function InputList(id, storageKey) {
    var _this = this;

    var callbackAfterSetStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    _classCallCheck(this, InputList);

    // console.log(`$Inputlist: id=${id} storageKey=${storageKey}`);
    this.container = document.getElementById(id);
    this.list = this.setupHTML();
    this.storageKey = storageKey;
    this.callbackAfterSetStorage = callbackAfterSetStorage; // event handlers

    this.container.addEventListener('focusout', function (e) {
      _this.updateHandler(e);
    });
    this.container.addEventListener('click', function (e) {
      _this.removeHandler(e);
    });
    this.container.addEventListener('click', function (e) {
      _this.newItemHandler(e);
    });
    this.render();
  }

  _createClass(InputList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      chrome.storage.sync.get([this.storageKey], function (result) {
        var items = result[_this2.storageKey];

        if (!items) {
          return;
        }

        var html = '';

        for (var i = 0; i < items.length; i++) {
          html += "\n                <li class=\"input-list__item\" \n                data-index = \"".concat(i, "\">\n                <input class=\"input-list__item-input\" \n                value=\"").concat(items[i], "\" type=text>\n                <button class=\"input-list__remove-btn\"></button>\n                </li>");
        }

        _this2.list.innerHTML = html;
      });
    }
  }, {
    key: "updateHandler",
    value: function updateHandler(event) {
      var _this3 = this;

      if (event.type != 'focusout' || !event.target.classList.contains('input-list__item-input')) {
        return;
      }

      var index = event.target.parentNode.getAttribute('data-index');

      if (event.target.value.trim() === '') {
        this.removeHandler(event);
        return;
      }

      chrome.storage.sync.get([this.storageKey], function (result) {
        // console.log('this.list:', this.list);
        var elements = _this3.list.children;
        var items = result[_this3.storageKey] ? result[_this3.storageKey] : [];

        if (elements.length == items.length) {
          items[index] = event.target.value;
        } else {
          items.push(event.target.value);
        }

        chrome.storage.sync.set(_defineProperty({}, _this3.storageKey, items), function () {
          typeof _this3.callbackAfterSetStorage === 'function' && _this3.callbackAfterSetStorage(items);

          _this3.render();
        });
      });
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(event) {
      if (event.type === 'click' && !event.target.classList.contains('input-list__remove-btn')) {
        return;
      }

      var item = event.target.parentNode;
      var index = item.getAttribute('data-index');
      this.removeIndex(index);
    }
  }, {
    key: "newItemHandler",
    value: function newItemHandler(e) {
      if (!e.target.classList.contains('input-list__add-btn')) {
        return;
      }

      this.addItem();
    }
  }, {
    key: "setupHTML",
    value: function setupHTML() {
      this.container.innerHTML = "\n      <ul class=\"input-list__list\" >\n      </ul>\n      <div>\n          <button \n          class=\"input-list__add-btn\">\n          Add\n          </button>\n      </div>";
      return this.container.children[0];
    }
  }, {
    key: "addItem",
    value: function addItem() {
      var index = this.list.children.length;
      var li = utilities["a" /* default */].htmlToElement(this.getHtmlStringItem('', index));
      this.list.appendChild(li);
      li.querySelector('.input-list__item-input').focus();
    }
  }, {
    key: "getHtmlStringItem",
    value: function getHtmlStringItem(value, index) {
      return "\n        <li class=\"input-list__item\" \n        data-index = \"".concat(index, "\">\n        <input class=\"input-list__item-input\" \n        value=\"").concat(value, "\" type=text>\n        <button class=\"input-list__remove-btn\"></button>\n        </li>");
    }
  }, {
    key: "removeIndex",
    value: function removeIndex(index) {
      var _this4 = this;

      chrome.storage.sync.get([this.storageKey], function (result) {
        if (!result[_this4.storageKey]) {
          return;
        }

        result[_this4.storageKey].splice(index, 1);

        chrome.storage.sync.set(_defineProperty({}, _this4.storageKey, result[_this4.storageKey]), function () {
          typeof _this4.callbackAfterSetStorage === 'function' && _this4.callbackAfterSetStorage(result[_this4.storageKey]);

          _this4.render();
        });
      });
    }
  }]);

  return InputList;
}();
// CONCATENATED MODULE: ./src/components/createDefaultList.js
function createDefaultList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createDefaultList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createDefaultList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createDefaultList_createClass(Constructor, protoProps, staticProps) { if (protoProps) createDefaultList_defineProperties(Constructor.prototype, protoProps); if (staticProps) createDefaultList_defineProperties(Constructor, staticProps); return Constructor; }

/* harmony default export */ var createDefaultList = (function (id, storageKey, generalSwitch) {
  return new DefaultList(id, storageKey, generalSwitch);
});

var DefaultList = /*#__PURE__*/function () {
  function DefaultList(id, storageKey, generalSwitch) {
    var _this = this;

    createDefaultList_classCallCheck(this, DefaultList);

    this.container = document.getElementById(id);
    this.storageKey = storageKey;
    this.generalSwitch = generalSwitch;
    this.list = this.setupHTML();
    this.render = this.render.bind(this);
    this.setAll = this.setAll.bind(this); // set up handlers

    this.container.addEventListener('click', function (e) {
      return _this.swithHandler(e);
    });
    this.render();
  }

  createDefaultList_createClass(DefaultList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log('this.generalSwitch', this.generalSwitch);
      chrome.storage.sync.get([this.storageKey], function (result) {
        var items = result[_this2.storageKey];

        if (!items) {
          return;
        }

        var html = '';

        for (var i = 0; i < items.length; i++) {
          var showClass = items[i].show ? '' : 'default-list__item-quote--hidden';
          var checked = items[i].show ? 'checked' : '';
          html += "\n                        <li class=\"default-list__item\">\n                            <span class=\"default-list__item-quote ".concat(showClass, "\">\n                            ").concat(items[i].qoute, " <span class=\"default-list__item-author ").concat(showClass, "\">\n                            ").concat(items[i].author ? items[i].author : '', "\n                            </span>\n                            </span>\n                            <label class=\"switch\">\n                                <input type=\"checkbox\"\n                                class=\"switch__input\" data-index=").concat(i, " ").concat(checked, ">\n                                <span class=\"slider\"></span>\n                            </label>\n                        </li>");
        }

        _this2.list.innerHTML = html;

        if (_this2.generalSwitch) {
          var allFalse = result[_this2.storageKey].every(function (quote) {
            _this2.generalSwitch.hide();

            return !quote.show;
          });

          if (allFalse) {
            _this2.generalSwitch.hide();

            _this2.generalSwitch.set(false);
          } else {
            _this2.generalSwitch.set(true);
          }
        }
      });
    }
  }, {
    key: "setAll",
    value: function setAll() {
      var _this3 = this;

      chrome.storage.sync.get([this.storageKey], function (result) {
        result[_this3.storageKey];
        result[_this3.storageKey] = result[_this3.storageKey].map(function (elem) {
          // console.log('elem', elem);
          elem.show = _this3.generalSwitch.isChecked();
          return elem;
        }); // console.log(' result[this.storageKey]', result[this.storageKey]);

        chrome.storage.sync.set(createDefaultList_defineProperty({}, _this3.storageKey, result[_this3.storageKey]), function () {
          _this3.render(result[_this3.storageKey]);
        });
      });
    }
  }, {
    key: "setupHTML",
    value: function setupHTML() {
      this.container.innerHTML = "\n      <ul  class=\"default-list-list\">\n      </ul> "; // console.log(this.container.children);

      return this.container.children[0];
    }
  }, {
    key: "swithHandler",
    value: function swithHandler(e) {
      var _this4 = this;

      var index = e.target.getAttribute('data-index'); // console.log('Switch:', index);

      if (!index) {
        return;
      }

      chrome.storage.sync.get([this.storageKey], function (result) {
        if (!result[_this4.storageKey]) {
          return;
        }

        result[_this4.storageKey][index].show = !result[_this4.storageKey][index].show;
        chrome.storage.sync.set(createDefaultList_defineProperty({}, _this4.storageKey, result[_this4.storageKey]), function () {
          _this4.render(result[_this4.storageKey]);
        });
      });
    }
  }]);

  return DefaultList;
}();
// CONCATENATED MODULE: ./src/components/createTimerList.js
function createTimerList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createTimerList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createTimerList_createClass(Constructor, protoProps, staticProps) { if (protoProps) createTimerList_defineProperties(Constructor.prototype, protoProps); if (staticProps) createTimerList_defineProperties(Constructor, staticProps); return Constructor; }

/* harmony default export */ var createTimerList = (function (id, storageKey, callbackAfterSetStorage) {
  return new TimeList(id, storageKey, callbackAfterSetStorage);
});

var TimeList = /*#__PURE__*/function () {
  function TimeList(id, type) {
    createTimerList_classCallCheck(this, TimeList);

    this.container = document.getElementById(id);
    this.type = type; // console.log(this.container);
    // set up handler

    document.addEventListener('click', this.closeAllSelect);
    this.setUpHtml();
    this.setUpList();
    this.loadTimer();
  }

  createTimerList_createClass(TimeList, [{
    key: "loadTimer",
    value: function loadTimer() {
      var _this = this;

      var key = "".concat(this.type.toLowerCase(), "Time");
      chrome.storage.sync.get([key], function (result) {
        if (!result[key]) {
          return;
        }

        var time = result[key]; // console.log('this.container.children[0]', this.container.children[0]);

        _this.container.children[0].children[1].textContent = "".concat(time, "min");
      });
    }
  }, {
    key: "setUpHtml",
    value: function setUpHtml() {
      this.container.innerHTML = "\n    <div class=\"custom-select custom-select-".concat(this.type, "\">\n    <select class=\"custom-select__select\">\n        <option value=\"10\">10min</option>\n        <option value=\"10\">10min</option>\n        <option   selected = 'selected'value=\"15\">15min</option>\n        <option value=\"20\">20min</option>\n        <option value=\"30\">30min</option>\n        <option value=\"45\">45min</option>\n        <option value=\"60\">60min</option>\n        \n    </select>\n    </div>\n    ");
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

      var x = document.getElementsByClassName("custom-select-".concat(this.type)); // console.log(this.type, x);

      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName('select')[0];
        /* For each element, create a new DIV that will act as the selected item: */

        a = document.createElement('DIV');
        a.setAttribute('class', 'select-selected');
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */

        b = document.createElement('DIV');
        b.setAttribute('class', 'select-items select-hide');

        for (j = 1; j < selElmnt.length; j++) {
          /* For each option in the original select element,
          create a new DIV that will act as an option item: */
          c = document.createElement('DIV');
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener('click', function (e) {
            /* When an item is clicked, update the original select box,
              and the selected item: */
            self.timeHandler(e);
            var y;
            var i;
            var k;
            var s = this.parentNode.parentNode.getElementsByTagName('select')[0];
            var h = this.parentNode.previousSibling;

            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName('same-as-selected');

                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute('class');
                }

                this.setAttribute('class', 'same-as-selected');
                break;
              }
            }

            h.click();
          });
          b.appendChild(c);
        }

        x[i].appendChild(b);
        a.addEventListener('click', function (e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation();
          self.closeAllSelect(this);
          this.nextSibling.classList.toggle('select-hide');
          this.classList.toggle('select-arrow-active');
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
      var x = document.getElementsByClassName('select-items');
      var y = document.getElementsByClassName('select-selected');

      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove('select-arrow-active');
        }
      }

      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add('select-hide');
        }
      }
    }
  }, {
    key: "timeHandler",
    value: function timeHandler(e) {
      var _this2 = this;

      var minutes = e.target.textContent.substring(0, e.target.textContent.length - 3);

      if (this.type === 'DANGER') {
        chrome.storage.sync.set({
          dangerTime: parseInt(minutes)
        }, function () {
          _this2.loadTimer();
        });
      } else if (this.type === 'REST') {
        chrome.storage.sync.set({
          restTime: parseInt(minutes)
        }, function () {
          _this2.loadTimer();
        });
      }
    }
  }]);

  return TimeList;
}();
// CONCATENATED MODULE: ./src/components/createGeneralSwitch.js
function createGeneralSwitch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createGeneralSwitch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createGeneralSwitch_createClass(Constructor, protoProps, staticProps) { if (protoProps) createGeneralSwitch_defineProperties(Constructor.prototype, protoProps); if (staticProps) createGeneralSwitch_defineProperties(Constructor, staticProps); return Constructor; }


/* harmony default export */ var createGeneralSwitch = (function (id, containerId, key) {
  return new createGeneralSwitch_GeneralSwitch(id, containerId, key);
});

var createGeneralSwitch_GeneralSwitch = /*#__PURE__*/function () {
  function GeneralSwitch(id, containerId, key) {
    var _this = this;

    createGeneralSwitch_classCallCheck(this, GeneralSwitch);

    this["switch"] = document.getElementById(id);
    this.container = document.getElementById(containerId); // console.log('container', this.container);

    this.key = key;
    this.setupHtml();

    if (this.key) {
      // console.log('this.key', this.key);
      this.loadSwitchValue();
      this["switch"].children[0].children[0].addEventListener("click", function () {
        _this.switchHandler();
      });
    }
  }

  createGeneralSwitch_createClass(GeneralSwitch, [{
    key: "isChecked",
    value: function isChecked() {
      return this["switch"].children[0].children[0].checked;
    }
  }, {
    key: "setCallback",
    value: function setCallback(callbackChange) {
      var _this2 = this;

      this.callbackChange = callbackChange;
      this["switch"].children[0].children[0].addEventListener("click", function () {
        // console.log(' this.callbackChange ', this.callbackChange);
        _this2.callbackChange();
      });
    }
  }, {
    key: "set",
    value: function set(value) {
      this["switch"].children[0].children[0].checked = value;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.container.classList.add("default-list__header--hidden");
    }
  }, {
    key: "show",
    value: function show() {
      this.container.classList.remove("default-list__header--hidden");
    }
  }, {
    key: "switchHandler",
    value: function switchHandler() {
      var _this3 = this;

      chrome.storage.sync.get([this.key], function (result) {
        // console.log(!result[this.key]);
        utilities["a" /* default */].updateStorageValue(_this3.key, !result[_this3.key], function () {
          utilities["a" /* default */].handleClass(result[_this3.key], "hidden-container", _this3.container);
        });
      });
    }
  }, {
    key: "loadSwitchValue",
    value: function loadSwitchValue() {
      var _this4 = this;

      chrome.storage.sync.get([this.key], function (result) {
        _this4["switch"].children[0].children[0].checked = result[_this4.key];
        utilities["a" /* default */].handleClass(!result[_this4.key], "hidden-container", _this4.container);
      });
    }
  }, {
    key: "getSwitch",
    value: function getSwitch() {
      return this["switch"];
    }
  }, {
    key: "setupHtml",
    value: function setupHtml() {
      this["switch"].innerHTML = "\n    <label class=\"switch\"> \n    <input class=\"switch__input\" type=\"checkbox\" \n    id=default-list__general-switch' checked>\n    <span class=\"slider slider--general\"></span>\n    </label>";
    }
  }]);

  return GeneralSwitch;
}();
// CONCATENATED MODULE: ./src/components/createNavigation.js
function createNavigation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createNavigation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createNavigation_createClass(Constructor, protoProps, staticProps) { if (protoProps) createNavigation_defineProperties(Constructor.prototype, protoProps); if (staticProps) createNavigation_defineProperties(Constructor, staticProps); return Constructor; }


/* harmony default export */ var createNavigation = (function (id, items, logoUrl) {
  return new Navigation(id, items, logoUrl);
});

var Navigation = /*#__PURE__*/function () {
  function Navigation(id, items, logoUrl) {
    createNavigation_classCallCheck(this, Navigation);

    this.navigation = document.getElementById(id);
    this.items = items;
    this.logoUrl = logoUrl;
    this.setupHtml(); // set up hander

    this.navigation.addEventListener("click", this.navigationHandler);
  }

  createNavigation_createClass(Navigation, [{
    key: "navigationHandler",
    value: function navigationHandler(e) {
      var mainContent = document.querySelector(".main-content");
      var sideNavList = this.querySelector(".side-nav__list").children;

      if (!e.target.classList.contains("side-nav__item")) {
        return;
      }

      var sectionToActivate = e.target.getAttribute("data-section");

      for (var i = 0; i < sideNavList.length; i++) {
        if (sectionToActivate == sideNavList[i].getAttribute("data-section")) {
          sideNavList[i].classList.add("side-nav__item--active");
          mainContent.children[i].classList.remove("content--hidden");
        } else {
          sideNavList[i].classList.remove("side-nav__item--active");
          mainContent.children[i].classList.add("content--hidden");
        }
      }
    }
  }, {
    key: "setupHtml",
    value: function setupHtml() {
      var html = this.logoUrl ? "<div class=\"side-nav__logo\"> \n        <img class=\"side-nav__logo-img\" src=".concat(this.logoUrl, " />\n      </div>") : "";
      html += '<ul class="side-nav__list">';

      for (var i = 0; i < this.items.length; i++) {
        var activeString = i === 0 ? "--active" : "";
        html += "\n          <li data-section=\n          ".concat(this.items[i].section, " class=\"side-nav__item side-nav__item").concat(activeString, "\">\n          ").concat(this.items[i].text, "\n          </li>");
      }

      html += "</ul>";
      html += '<div class="side-nav__contacts"><a class="side-nav__link" href="https://chrome.google.com/webstore/detail/mindful-internet-use/hieolpjdilnibgamiafklnlcmagdngoo">CLICK HERE TO RATE OR REVIEW MIU</a></div>';
      this.navigation.innerHTML = html;
    }
  }]);

  return Navigation;
}();
// CONCATENATED MODULE: ./src/options/options.js






try {
  var timerListDanger = createTimerList("timerListDanger", "DANGER");
  var timerListRest = createTimerList("timerListRest", "REST");
  var dangerURLs = createInputList("danger-list", "dangerList");
  var userDangerReminders = createInputList("reminders-user-danger", "userRemindersDanger");
  var userRestReminders = createInputList("reminders-user-rest", "userRemindersRest");
  var switchDangerReminder = createGeneralSwitch("switch-danger-reminder", "reminder-container-danger", "dangerReminderSwitch");
  var switchRestReminder = createGeneralSwitch("switch-rest-reminder", "reminder-container-rest", "restReminderSwitch");
  var switchDefaultQoutes = createGeneralSwitch("switch-danger-default-quotes", "danger-default-quotes-container", undefined);
  var dangerDefaultQuotes = createDefaultList("danger-default-quotes", "defaultQuotes", switchDefaultQoutes);
  switchDefaultQoutes.setCallback(dangerDefaultQuotes.setAll);
  var switchDangerDefaultReminders = createGeneralSwitch("switch-danger-default-reminders", "switch-danger-default-reminders", undefined);
  var defaultDangerReminders = createDefaultList("reminders-default-danger", "defaultRemindersDanger", switchDangerDefaultReminders);
  switchDangerDefaultReminders.setCallback(defaultDangerReminders.setAll);
  var switchRestDefaultReminders = createGeneralSwitch("switch-rest-default-reminders", "switch-rest-default-reminders", undefined);
  var defaultRestReminders = createDefaultList("reminders-default-rest", "defaultRemindersRest", switchRestDefaultReminders);
  switchRestDefaultReminders.setCallback(defaultRestReminders.setAll);
  var dangerUserQuotes = createInputList("danger-user-quotes", "userQuotes");
  var copySwitch = createGeneralSwitch("copy-switch", "copy-switch-container", "copy");
  var navigation = createNavigation("navigation", [{
    section: "danger",
    text: "MINDLESS WEBSITES"
  }, {
    section: "default-list",
    text: "MOTIVATIONAL QUOTES"
  }, {
    section: "reminder_content",
    text: "REMINDERS"
  }], "img/logoBlue128.png");
} catch (e) {
  console.error(e);
}

/***/ })
/******/ ]);