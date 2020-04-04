export default (id, storageKey, callbackAfterSetStorage) => new TimeList(id, storageKey, callbackAfterSetStorage);

class TimeList {
  constructor(id, type) {
    this.container = document.getElementById(id);
    this.type = type;
    // console.log(this.container);

    // set up handler
    document.addEventListener('click', this.closeAllSelect);

    this.setUpHtml();
    this.setUpList();
    this.loadTimer();
  }

  loadTimer() {
    const key = `${this.type.toLowerCase()}Time`;
    chrome.storage.sync.get([key], (result) => {
      if (!result[key]) {
        return;
      }

      const time = result[key];
      // console.log('this.container.children[0]', this.container.children[0]);
      this.container.children[0].children[1].textContent = `${time}min`;
    });
  }

  setUpHtml() {
    this.container.innerHTML = `
    <div class="custom-select custom-select-${this.type}">
    <select class="custom-select__select">
        <option value="10">10min</option>
        <option value="10">10min</option>
        <option   selected = 'selected'value="15">15min</option>
        <option value="20">20min</option>
        <option value="30">30min</option>
        <option value="45">45min</option>
        <option value="60">60min</option>
        
    </select>
    </div>
    `;
  }

  setUpList() {
    const self = this;
    let i;
    let j;
    let selElmnt;
    let a;
    let b;
    let c;
    /* Look for any elements with the class "custom-select": */
    const x = document.getElementsByClassName(`custom-select-${this.type}`);

    // console.log(this.type, x);
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
          let y;
          let i;
          let k;

          const s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          const h = this.parentNode.previousSibling;
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

  closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */

    let i;

    const arrNo = [];
    const x = document.getElementsByClassName('select-items');
    const y = document.getElementsByClassName('select-selected');
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

  timeHandler(e) {
    const minutes = e.target.textContent.substring(0, e.target.textContent.length - 3);

    if (this.type === 'DANGER') {
      chrome.storage.sync.set({ dangerTime: parseInt(minutes) }, () => {
        this.loadTimer();
      });
    } else if (this.type === 'REST') {
      chrome.storage.sync.set({ restTime: parseInt(minutes) }, () => {
        this.loadTimer();
      });
    }
  }
}
