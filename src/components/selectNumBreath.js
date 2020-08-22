export default (id) => new SelectNumBreath(id);

const items = [
    {
        value: 1,
        label: '1'
    },
    {
        value: 1,
        label: '1'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 3,
        label: '3'
    }, {
        value: 4,
        label: '4',
        default: true
    }, {
        value: 5,
        label: '5'
    },
    {
        value: 6,
        label: '6'
    },
    {
        value: 7,
        label: '7'
    },
    {
        value: 8,
        label: '8'
    }, {
        value: 9,
        label: '9'
    }, {
        value: 10,
        label: '10'
    }
]

class SelectNumBreath {
    constructor(id) {
        this.container = document.getElementById(id);
        // console.log(this.container);

        // set up handler
        document.addEventListener('click', this.closeAllSelect);

        this.setUpHtml(items);
        this.setUpList();
        this.loadNumBreath()

    }


    setUpHtml(items) {
        let html = ''
        html += `
        <div class="custom-select custom-select-list">
        <select class="custom-select__select">`

        html += items.reduce((optionStrings, item) => optionStrings += `<option selected="${item.default}" value="${item.value}">${item.label}</option>`, '')
        html += '</select></div>'
        this.container.innerHTML = html;
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
        const x = document.getElementsByClassName(`custom-select-list`)

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
                    self.setNumBreath(+e.target.innerText);
                    let y;
                    let i;
                    let k;

                    const s = this.parentNode.parentNode.getElementsByTagName(
                        'select'
                    )[0];
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

    loadNumBreath() {
        chrome.storage.sync.get(['numBreath'], (result) => {
            if (!result.numBreath) {
                throw new Error('numBreath not found in storage')
            }

            this.container.children[0].children[1].textContent = +result.numBreath
        });
    }

    setNumBreath(numBreath) {
        chrome.storage.sync.set({numBreath}, () => {
            this.loadNumBreath();
        });
    }
}
