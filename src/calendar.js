// eslint-disable-next-line
import { parseDataFromLocalStorage, renderCalendarWithMemberFilter, deleteAllEventBoxes, deleteEventProcedure } from '../script/calendar_functions.js';

(function firstRender() {
  const localStorageParsedData = parseDataFromLocalStorage();
  const filter = document.getElementsByTagName('select')[0].value;
  deleteAllEventBoxes();
  renderCalendarWithMemberFilter(localStorageParsedData, filter);
}());

document.querySelector('#meeting_room').addEventListener('click', (event) => { deleteEventProcedure(event.target); });

document.querySelector('select').addEventListener('change', (event) => {
  const localStorageParsedData = parseDataFromLocalStorage();
  deleteAllEventBoxes();
  renderCalendarWithMemberFilter(localStorageParsedData, event.target.value);
});
