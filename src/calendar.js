// eslint-disable-next-line
import { parseDataFromLocalStorage, renderCalendarWithMemberFilter, deleteAllEventBoxes, deleteEventProcedure } from './script/calendar_functions.js';
import './scss/style.scss';
import deleteBtn from './images/delete_btn.svg';

(function firstRender() {
  const localStorageParsedData = parseDataFromLocalStorage();
  const filter = document.getElementsByTagName('select')[0].value;
  deleteAllEventBoxes();
  renderCalendarWithMemberFilter(localStorageParsedData, filter, deleteBtn);
}());

document.querySelector('#meeting_room').addEventListener('click', (event) => { deleteEventProcedure(event.target); });

document.querySelector('select').addEventListener('change', (event) => {
  const localStorageParsedData = parseDataFromLocalStorage();
  deleteAllEventBoxes();
  renderCalendarWithMemberFilter(localStorageParsedData, event.target.value, deleteBtn);
});
