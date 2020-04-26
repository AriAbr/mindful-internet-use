import setUpGoogleAnalytics from "../analytics"
import ToggleSwitch from "../components/toggle-switch"

setUpGoogleAnalytics("/page")





const disableSwitch = new ToggleSwitch((value) => console.log(value))

document.querySelector(".popup__items").appendChild(disableSwitch.render())

document
  .getElementById('addToDanger')
  .addEventListener('click', addActiveUrlToDanger);
document.getElementById('goToOptions').addEventListener('click', goToOptions);

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
        const alreadyExits = dangerList.some((url) => tabs[0].url == url);

        if (!alreadyExits) {
          dangerList.push(tabs[0].url);
          chrome.storage.sync.set({ dangerList }, () => {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
          });
        }
      }
    );
  });
}
