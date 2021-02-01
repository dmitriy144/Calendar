function toLocalStorage(data) {
  const localStorageKey = `_event${data.day}${data.time}`;
  const json = JSON.stringify(data);

  if (localStorage.getItem(localStorageKey)) {
    const errorMessage = document.querySelector('#error_message');
    errorMessage.textContent = 'Failed to create an event! This time is already taken';
    errorMessage.style.display = 'block';
  } else {
    localStorage.setItem(localStorageKey, json);
    window.location.href = '../index.html';
  }
}

function getSelectedMembers() {
  const result = [];
  const options = Array.from(document.querySelector('#members').options);

  options.forEach((option) => {
    if (option.selected) {
      result.push(option.value);
    }
  });

  return result;
}

function isValid(name, members) {
  const errorMessage = document.querySelector('#error_message');

  if (name === '' || members.length === 0) {
    errorMessage.textContent = 'Failed to create an event! Please, enter the meeting title and select participants.';
    errorMessage.style.display = 'block';
    return false;
  }
  return true;
}

document.querySelector('#create-event').addEventListener('click', () => {
  const newEventData = {
    name: document.querySelector('#event_name').value,
    members: getSelectedMembers(),
    day: Number(document.querySelector('#day').value) + 1,
    time: document.querySelector('#time').value,
  };

  if (isValid(newEventData.name, newEventData.members)) {
    toLocalStorage(newEventData);
  }
});
