export default {
  render: (items, defaultList) => {
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
                    ${items[i].qoute}
                    <span class="default-list__item-autor ${showClass}">
                    ${items[i].author}
                    </span>
                    </span>
                    <label class="switch">
                        <input type="checkbox" 
                        class="switch__input" data-index=${i} ${checked}>
                        <span class="slider"></span>
                    </label>
                </li>`;
    }

    defaultList.innerHTML = html;
  },
};
