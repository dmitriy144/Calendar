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

function renderCalendarWithMemberFilter(data, filter, deleteBtn) {
  let filteredData = data;

  if (filter) {
    filteredData = data.filter((event) => event.members.includes(filter));
  }

  filteredData.forEach((event) => {
    const row = document.querySelector(`tr[data-event-time="${event.time}"]`);
    const calendarCell = row.querySelector(`td:nth-child(${event.day})`);

    const eventBox = document.createElement('div');
    eventBox.innerHTML = `<p>${event.name}</p><img class="delete-btn" src="${deleteBtn}">`;
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
    const modalWindow = document.querySelector('#modal');
    const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'));

    modalWindow.querySelector('#message').textContent = `Are you sure you want to delete "${eventName}" event?`;
    modalWindow.style.display = 'flex';

    deleteBtns.forEach((btn) => {
      btn.classList.remove('delete-btn');
    });

    modalWindow.addEventListener('click', function deleteEvent(event) {
      if (event.target.id === 'modal_confirm') {
        modalWindow.style.display = 'none';
        localStorage.removeItem(calendarEventBox.dataset.localStorageKey);
        currentCell.removeChild(calendarEventBox);
        currentCell.classList.remove('event_cell');

        const deletedEventBtnIndex = deleteBtns.indexOf(deleteBtn);
        deleteBtns.splice(deletedEventBtnIndex, 1);
        deleteBtns.forEach((btn) => {
          btn.classList.add('delete-btn');
        });

        modalWindow.removeEventListener('click', deleteEvent);
      } else if (event.target.id === 'modal_abort') {
        deleteBtns.forEach((btn) => {
          btn.classList.add('delete-btn');
        });
        modalWindow.removeEventListener('click', deleteEvent);
        modalWindow.style.display = 'none';
      }
    });
  }
}

// eslint-disable-next-line
export { parseDataFromLocalStorage, renderCalendarWithMemberFilter, deleteAllEventBoxes, deleteEventProcedure };
