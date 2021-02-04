function getSelectedMembers() {
  const members = [];
  const options = Array.from(document.querySelector('#members').options);

  options.forEach((option) => {
    if (option.selected) {
      members.push(option.value);
    }
  });

  return members;
}

function isValid(name, members) {
  if (name === '' || members.length === 0) {
    const errorMessage = document.querySelector('#error_message');

    errorMessage.textContent = 'Failed to create an event! Please, enter the meeting title, select participants and try again.';
    errorMessage.style.display = 'block';
    return false;
  }
  return true;
}

function saveToLocalStorage(data) {
  const localStorageKey = `_event${data.day}${data.time}`;

  if (localStorage.getItem(localStorageKey)) {
    const errorMessage = document.querySelector('#error_message');
    errorMessage.textContent = 'Failed to create an event! This time is already taken.';
    errorMessage.style.display = 'block';
  } else {
    const json = JSON.stringify(data);

    localStorage.setItem(localStorageKey, json);
    window.location.href = '../index.html';
  }
}

export { getSelectedMembers, isValid, saveToLocalStorage };
