import utilities from "../utilities";

export default (id, containerId, key) =>
  new GeneralSwitch(id, containerId, key);

class GeneralSwitch {
  constructor(id, containerId, key) {
    this.switch = document.getElementById(id);
    this.container = document.getElementById(containerId);
    // console.log('container', this.container);
    this.key = key;
    this.setupHtml();

    if (this.key) {
      // console.log('this.key', this.key);
      this.loadSwitchValue();
      this.switch.children[0].children[0].addEventListener("click", () => {
        this.switchHandler();
      });
    }
  }

  isChecked() {
    return this.switch.children[0].children[0].checked;
  }

  setCallback(callbackChange) {
    this.callbackChange = callbackChange;
    this.switch.children[0].children[0].addEventListener("click", () => {
      // console.log(' this.callbackChange ', this.callbackChange);
      this.callbackChange();
    });
  }

  set(value) {
    this.switch.children[0].children[0].checked = value;
  }

  hide() {
    this.container.classList.add("default-list__header--hidden");
  }

  show() {
    this.container.classList.remove("default-list__header--hidden");
  }

  switchHandler() {
    chrome.storage.sync.get([this.key], result => {
      // console.log(!result[this.key]);
      utilities.updateStorageValue(this.key, !result[this.key], () => {
        utilities.handleClass(
          result[this.key],
          "hidden-container",
          this.container
        );
      });
    });
  }

  loadSwitchValue() {
    chrome.storage.sync.get([this.key], result => {
      this.switch.children[0].children[0].checked = result[this.key];
      utilities.handleClass(
        !result[this.key],
        "hidden-container",
        this.container
      );
    });
  }

  getSwitch() {
    return this.switch;
  }

  setupHtml() {
    this.switch.innerHTML = `
    <label class="switch"> 
    <input class="switch__input" type="checkbox" 
    id=default-list__general-switch' checked>
    <span class="slider slider--general"></span>
    </label>`;
  }
}
