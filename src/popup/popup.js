(function (i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  'script',
  'https://www.google-analytics.com/analytics.js',
  'ga'
);

ga('create', 'UA-162836929-1', 'auto');

// Modifications:
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol

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
