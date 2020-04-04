export default (id, name, onchange) => new TimerButton(id, name, onchange);

class TimerButton {
  constructor(id, name, onchange) {
    this.container = document.getElementById(id);
    this.name = name;
    this.onchange = onchange;
    // console.log(this.container);
    this.minutes = [5, 10, 15, 30, 45, 60];
    // set up handler
    document.addEventListener("click", this.closeAllSelect);

    this.setUpHtml();
    this.setUpList();
    this.startKeyBoardController();
  }

  setUpHtml() {
    this.container.innerHTML = `
    <div  class="custom-select-access custom-select-access-${this.name}">
    <select class="custom-select-access__select">
        <option  value="">ACCESS</option>
        <option  value=${this.minutes[0]}>${this.minutes[0]}min</option>
        <option value=${this.minutes[1]}>${this.minutes[1]}min</option>
        <option value=${this.minutes[2]}>${this.minutes[2]}min</option>
        <option value=${this.minutes[3]}>${this.minutes[3]}min</option>
        <option value=${this.minutes[4]}>${this.minutes[4]}min</option>
        <option value=${this.minutes[5]}>${this.minutes[5]}min</option>
        
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
    const x = document.getElementsByClassName(
      `custom-select-access-${this.name}`
    );

    // console.log(this.name, x);
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

        c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
            and the selected item: */
          self.timeSet(e);
          let y;
          let i;
          let k;

          const s = this.parentNode.parentNode.getElementsByTagName(
            "select"
          )[0];
          const h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName(
                "same-as-selected-access"
              );
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

      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        self.closeAllSelect(this);
        this.nextSibling.classList.toggle("select-access-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }

  closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */

    let i;

    const arrNo = [];
    const x = document.getElementsByClassName("select-access-items");
    const y = document.getElementsByClassName("select-access-selected");
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

  startKeyBoardController() {
    const accessItems = document.querySelector(".select-access-items");
    const options = accessItems.children;
    const select = document.querySelector(".select-access-selected");
    select.classList.add("focus");
    let focusedIndex = 0;
    document.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const focused = document.querySelector(".focus");
        const minute = focused.getAttribute("minute");
        if (minute) {
          this.onchange(minute);
        }
      }

      if (e.key === "ArrowDown") {
        select.classList.remove("focus");
        options[focusedIndex].classList.remove("focus");
        if (!select.classList.contains("select-arrow-active")) {
          select.classList.add("select-arrow-active");
          accessItems.classList.remove("select-access-hide");
        } else {
          focusedIndex =
            focusedIndex < options.length - 1
              ? focusedIndex + 1
              : options.length - 1;
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

  timeSet(e) {
    const minutes = e.target.textContent.substring(
      0,
      e.target.textContent.length - 3
    );
    this.onchange(minutes);
  }
}
