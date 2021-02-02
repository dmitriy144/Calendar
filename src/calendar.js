const localStorageParsedData = [];

(function parseDataFromLocalStorage() {
  let keys = Object.keys(localStorage);
  keys = keys.filter((key) => key.startsWith('_event'));
  for (let i = 0; i < keys.length; i += 1) {
    const event = JSON.parse(localStorage.getItem(keys[i]));
    localStorageParsedData.push(event);
  }
}());

function renderCalendar(filter) {
  let filteredData;

  if (filter === 'all') {
    filteredData = localStorageParsedData;
  } else {
    filteredData = localStorageParsedData.filter((event) => event.members.includes(filter));
  }

  filteredData.forEach((event) => {
    const row = document.querySelector(`tr[data-event-time="${event.time}"]`);
    const tableCell = row.querySelector(`td:nth-child(${event.day})`);

    const eventBox = document.createElement('div');
    eventBox.innerHTML = `<p>${event.name}</p><div class="delete-btn">X</div>`;
    eventBox.setAttribute(
      'data-local-storage-key',
      `_event${event.day}${event.time}`,
    );
    eventBox.classList.add('event_box');

    tableCell.classList.add('event_cell');
    tableCell.appendChild(eventBox);
  });
}

document.querySelector('#meeting_room').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const currentCell = event.target.parentNode.parentNode;
    const calendarEventBox = event.target.parentNode;
    const eventName = calendarEventBox.querySelector('p').textContent;

    if (confirm(`Are you sure you want to delete "${eventName}" event?`)) {
      localStorage.removeItem(calendarEventBox.dataset.localStorageKey);
      currentCell.removeChild(calendarEventBox);
      currentCell.classList.remove('event_cell');
    }
  }
});

document
  .querySelector('#members > select')
  .addEventListener('change', (event) => {
    const eventCells = Array.from(document.querySelectorAll('.event_cell'));

    eventCells.forEach((eventCell) => {
      const calendarEventBox = eventCell.childNodes[0];
      eventCell.removeChild(calendarEventBox);
      eventCell.classList.remove('event_cell');
    });

    renderCalendar(event.target.value);
  });

renderCalendar(document.querySelector('#members > select').value);
