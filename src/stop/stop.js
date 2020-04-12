import dayjs from 'dayjs';
import utilities from '../utilities';
import createTimerButton from '../components/createTimerButton';

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
ga('require', 'displayfeatures');
// Modifications:
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/stop'); // Set page, avoiding rejection due to chrome-extension protocol

const closeTab = (e) => {
  chrome.tabs.getCurrent((tab) => {
    chrome.tabs.remove(tab.id, () => { });
  });
};

const goToOptions = () => {
  chrome.tabs.create({ url: 'options.html' });
};

chrome.storage.sync.get(['copy'], ({ copy }) => {
  const breathCounter = document.getElementById('breathCounter');

  let breathsLeft = copy ? 20 : 30;

  breathCounter.textContent = breathsLeft;

  const timer = setInterval(() => {
    breathsLeft--;
    breathCounter.textContent = breathsLeft;
    if (breathsLeft === 0) {
      clearInterval(timer);
      setupAfterBreaths();
    }
  }, 1000);
});

let currentIndex = 0;
let motivationNode = '';
let motivationAuthor = '';
let htmlString = '';

chrome.storage.sync.get(['defaultQuotes', 'userQuotes', 'copy'], (result) => {
  if (result.defaultQuotes) {
    let qoutes = result.defaultQuotes.reduce((total, current, index, array) => {
      if (current.show) {
        total.push({ qoute: current.qoute, author: current.author });
      }

      return total;
    }, []);

    if (result.userQuotes) {
      qoutes = qoutes.concat(result.userQuotes.map((qoute) => ({ qoute })));
    }
    if (qoutes.length === 0) {
      qoutes = [
        {
          qoute:
            'You don’t need a new plan for next year. You need a commitment',
          author: 'Seth Godin',
        },
      ];
    }

    const index = Math.floor(Math.random() * qoutes.length);
    const author = qoutes[index].author ? qoutes[index].author : '';
    const motivationSplit = qoutes[index].qoute.split('');

    motivationNode = document.getElementById('motivation-text');
    motivationAuthor = document.getElementById('motivation-author');

    htmlString = motivationSplit.reduce(
      (htmlString, char, index) =>
        (htmlString += `<span data-index=${index}>${char}</span>`),
      ''
    );
    motivationNode.innerHTML = htmlString;
    motivationAuthor.innerHTML = author;

    if (result.copy) {
      handleCopying(motivationSplit, author);
    } else {
      handleNotCopying();
    }
  }

  // console.log(motivationSplit);
  function handleCopying(motivationSplit) {
    motivationNode.insertAdjacentElement(
      'afterbegin',
      utilities.htmlToElement('<span class="blinking-cursor">|</span>')
    );

    document.addEventListener('keydown', registerKeyDonw);

    function isCorrectKeyCode(pressedKey, expected) {
      return pressedKey.toLowerCase() === expected.toLowerCase();
    }

    function registerKeyDonw(e) {
      const currentChar = motivationSplit[currentIndex];

      if (isCorrectKeyCode(e.key, currentChar)) {
        const charHtml = motivationNode.querySelector(
          `[data-index='${currentIndex}']`
        );

        charHtml.previousElementSibling &&
          motivationNode.removeChild(charHtml.previousElementSibling);
        utilities.insertAfter(
          utilities.htmlToElement('<span class="blinking-cursor">|</span>'),
          charHtml
        );

        charHtml.classList.add('mark');
        currentIndex++;
      }

      if (currentIndex === motivationSplit.length) {
        document.removeEventListener('keydown', registerKeyDonw);
        makeTempAccess();
      }
    }
  }
});

function makeTempAccess() {
  const url = new URL(window.location.href);
  const blockUrl = url.searchParams.get('url');
  const blockPattern = url.searchParams.get('pattern');

  const accessContainer = document.querySelector('#access-container');
  accessContainer.innerHTML = '';

  accessContainer.innerHTML = '';
  createTimerButton('access-container', 'access-dropdown', (time) => {
    chrome.storage.sync.get(['tempAccess'], (result) => {
      let tempAccess = [];

      if (result.tempAccess) {
        tempAccess = result.tempAccess;
      }

      tempAccess.push({ blockPattern, firstAccess: dayjs().format(), time });

      chrome.storage.sync.set({ tempAccess }, () => {
        window.location.replace(blockUrl);
      });
    });
  });
}

function setupAfterBreaths() {
  document.querySelector('.breath').style.display = 'none';
  document.getElementById('afterBreath').style.display = 'flex';
}

function handleNotCopying() {
  document.querySelector('.motivation-text-intro').style.display = 'none';
  makeTempAccess();
}

document.querySelector('.logo').addEventListener('click', goToOptions);
document.querySelector('.accessBtn--close').addEventListener('click', closeTab);
document
  .querySelector('.accessBtn--options')
  .addEventListener('click', goToOptions);

console.log(window.location.href);
