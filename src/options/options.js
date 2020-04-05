import createInputList from '../components/createInputList';
import createDefaultList from '../components/createDefaultList';
import createTimerList from '../components/createTimerList';
import createGeneralSwitch from '../components/createGeneralSwitch';
import createNavigation from '../components/createNavigation';

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
ga('send', 'pageview', '/options'); // Set page, avoiding rejection due to chrome-extension protocol

try {
  const timerListDanger = createTimerList('timerListDanger', 'DANGER');
  const timerListRest = createTimerList('timerListRest', 'REST');

  const dangerURLs = createInputList('danger-list', 'dangerList');

  const userDangerReminders = createInputList(
    'reminders-user-danger',
    'userRemindersDanger'
  );

  const userRestReminders = createInputList(
    'reminders-user-rest',
    'userRemindersRest'
  );

  const switchDangerReminder = createGeneralSwitch(
    'switch-danger-reminder',
    'reminder-container-danger',
    'dangerReminderSwitch'
  );
  const switchRestReminder = createGeneralSwitch(
    'switch-rest-reminder',
    'reminder-container-rest',
    'restReminderSwitch'
  );

  const switchDefaultQoutes = createGeneralSwitch(
    'switch-danger-default-quotes',
    'danger-default-quotes-container',
    undefined
  );

  const dangerDefaultQuotes = createDefaultList(
    'danger-default-quotes',
    'defaultQuotes',
    switchDefaultQoutes
  );

  switchDefaultQoutes.setCallback(dangerDefaultQuotes.setAll);

  const switchDangerDefaultReminders = createGeneralSwitch(
    'switch-danger-default-reminders',
    'switch-danger-default-reminders',
    undefined
  );

  const defaultDangerReminders = createDefaultList(
    'reminders-default-danger',
    'defaultRemindersDanger',
    switchDangerDefaultReminders
  );

  switchDangerDefaultReminders.setCallback(defaultDangerReminders.setAll);

  const switchRestDefaultReminders = createGeneralSwitch(
    'switch-rest-default-reminders',
    'switch-rest-default-reminders',
    undefined
  );

  const defaultRestReminders = createDefaultList(
    'reminders-default-rest',
    'defaultRemindersRest',
    switchRestDefaultReminders
  );

  switchRestDefaultReminders.setCallback(defaultRestReminders.setAll);

  const dangerUserQuotes = createInputList('danger-user-quotes', 'userQuotes');

  const copySwitch = createGeneralSwitch(
    'copy-switch',
    'copy-switch-container',
    'copy'
  );

  const navigation = createNavigation(
    'navigation',
    [
      {
        section: 'danger',
        text: 'MINDLESS WEBSITES',
      },
      {
        section: 'default-list',
        text: 'MOTIVATIONAL QUOTES',
      },
      {
        section: 'reminder_content',
        text: 'REMINDERS',
      },
    ],
    'img/logoBlue128.png'
  );
} catch (e) {
  console.error(e);
}
