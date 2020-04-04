export default {
  htmlToElement: (html) => {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },
  handleClass(shouldContain, className, element) {
    //   //console.log(shouldContain, className, element);
    if (shouldContain) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  },
  updateStorageValue(key, value, callback) {
    chrome.storage.sync.set({[key]: value}, () => {
      callback();
    });
  },
  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  },
};
