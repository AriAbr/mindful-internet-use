export default (id, storageKey, generalSwitch) => new DefaultList(id, storageKey, generalSwitch);

class DefaultList {
  constructor(id, storageKey, generalSwitch) {
    this.container = document.getElementById(id);
    this.storageKey = storageKey;
    this.generalSwitch = generalSwitch;
    this.list = this.setupHTML();
    this.render = this.render.bind(this);
    this.setAll = this.setAll.bind(this);
    // set up handlers
    this.container.addEventListener('click', e => this.swithHandler(e));

    this.render();
  }

  render() {
    // console.log('this.generalSwitch', this.generalSwitch);
    chrome.storage.sync.get([this.storageKey], (result) => {
      const items = result[this.storageKey];

      if (!items) {
        return;
      }
      let html = '';
      for (let i = 0; i < items.length; i++) {
        const showClass = items[i].show ? '' : 'default-list__item-quote--hidden';
        const checked = items[i].show ? 'checked' : '';
        html += `
                        <li class="default-list__item">
                            <span class="default-list__item-quote ${showClass}">
                            ${items[i].qoute} <span class="default-list__item-author ${showClass}">
                            ${items[i].author ? items[i].author : ''}
                            </span>
                            </span>
                            <label class="switch">
                                <input type="checkbox"
                                class="switch__input" data-index=${i} ${checked}>
                                <span class="slider"></span>
                            </label>
                        </li>`;
      }
      this.list.innerHTML = html;

      if (this.generalSwitch) {
        const allFalse = result[this.storageKey].every((quote) => {
          this.generalSwitch.hide();
          return !quote.show;
        });
        if (allFalse) {
          this.generalSwitch.hide();
          this.generalSwitch.set(false);
        } else {
          this.generalSwitch.set(true);
        }
      }
    });
  }

  setAll() {
    chrome.storage.sync.get([this.storageKey], (result) => {
      result[this.storageKey];
      result[this.storageKey] = result[this.storageKey].map((elem) => {
        // console.log('elem', elem);
        elem.show = this.generalSwitch.isChecked();
        return elem;
      });
      // console.log(' result[this.storageKey]', result[this.storageKey]);
      chrome.storage.sync.set({ [this.storageKey]: result[this.storageKey] }, () => {
        this.render(result[this.storageKey]);
      });
    });
  }

  setupHTML() {
    this.container.innerHTML = `
      <ul  class="default-list-list">
      </ul> `;
    // console.log(this.container.children);
    return this.container.children[0];
  }

  swithHandler(e) {
    const index = e.target.getAttribute('data-index');
    // console.log('Switch:', index);
    if (!index) {
      return;
    }

    chrome.storage.sync.get([this.storageKey], (result) => {
      if (!result[this.storageKey]) {
        return;
      }

      result[this.storageKey][index].show = !result[this.storageKey][index].show;
      chrome.storage.sync.set({ [this.storageKey]: result[this.storageKey] }, () => {
        this.render(result[this.storageKey]);
      });
    });
  }
}
