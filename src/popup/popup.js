document.getElementById('addToDanger').addEventListener('click', addActiveUrlToDanger);
document.getElementById('goToOptions').addEventListener('click', goToOptions);
/*
 * document.querySelector('.popup-switch').addEventListener('click', (e) => {
 *     let header = e.target.parentNode.parentNode.parentNode
 *     if(e.target.checked){
 *         header.classList.remove("checked")
 *     } else {
 *         header.classList.add("checked")
 *     }
 * })
 */

function goToOptions() {
  chrome.tabs.create({ url: 'options.html' });
}

function addActiveUrlToDanger(e) {
  chrome.storage.sync.get(['dangerList'], (result) => {
    let dangerList = [];
    if (result.dangerList) {
      dangerList = result.dangerList;
    }

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const alreadyExits = dangerList.some(url => tabs[0].url == url);

        if (!alreadyExits) {
          dangerList.push(tabs[0].url);
          chrome.storage.sync.set({ dangerList }, () => {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
          });
        }
      },
    );
  });
}
