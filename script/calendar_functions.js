function parseDataFromLocalStorage() {
  const localStorageParsedData = [];
  let keys = Object.keys(localStorage);

  keys = keys.filter((key) => key.startsWith('_event'));
  for (let i = 0; i < keys.length; i += 1) {
    const eventData = JSON.parse(localStorage.getItem(keys[i]));
    localStorageParsedData.push(eventData);
  }

  return localStorageParsedData;
}

function renderCalendarWithMemberFilter(data, filter) {
  let filteredData = data;

  if (filter) {
    filteredData = data.filter((event) => event.members.includes(filter));
  }

  filteredData.forEach((event) => {
    const row = document.querySelector(`tr[data-event-time="${event.time}"]`);
    const calendarCell = row.querySelector(`td:nth-child(${event.day})`);

    const eventBox = document.createElement('div');
    eventBox.innerHTML = `<p>${event.name}</p><div class="delete-btn">X</div>`;
    eventBox.setAttribute('data-local-storage-key', `_event${event.day}${event.time}`);
    eventBox.classList.add('event_box');

    calendarCell.classList.add('event_cell');
    calendarCell.appendChild(eventBox);
  });
}

function deleteAllEventBoxes() {
  const eventCells = Array.from(document.querySelectorAll('.event_cell'));

  eventCells.forEach((eventCell) => {
    const calendarEventBox = eventCell.childNodes[0];
    eventCell.removeChild(calendarEventBox);
    eventCell.classList.remove('event_cell');
  });
}

function deleteEventProcedure(deleteBtn) {
  if (deleteBtn.classList.contains('delete-btn')) {
    const calendarEventBox = deleteBtn.parentNode;
    const currentCell = calendarEventBox.parentNode;
    const eventName = calendarEventBox.querySelector('p').textContent;
    // eslint-disable-next-line
    if (confirm(`Are you sure you want to delete "${eventName}" event?`)) {
      localStorage.removeItem(calendarEventBox.dataset.localStorageKey);
      currentCell.removeChild(calendarEventBox);
      currentCell.classList.remove('event_cell');
    }
  }
}
// eslint-disable-next-line
export { parseDataFromLocalStorage, renderCalendarWithMemberFilter, deleteAllEventBoxes, deleteEventProcedure };
