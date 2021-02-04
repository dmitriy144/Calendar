// eslint-disable-next-line
import { getSelectedMembers, isValid, saveToLocalStorage } from './script/create_event_functions.js';
import './scss/style.scss';

document.querySelector('#create-event').addEventListener('click', () => {
  const newEventData = {
    name: document.querySelector('#event_name').value,
    members: getSelectedMembers(),
    day: +document.querySelector('#day').value + 1,
    time: document.querySelector('#time').value,
  };

  if (isValid(newEventData.name, newEventData.members)) {
    saveToLocalStorage(newEventData);
  }
});
