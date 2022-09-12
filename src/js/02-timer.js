import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('[id="datetime-picker"]'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
  values: document.querySelectorAll('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.setAttribute('disabled', '');
      return window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      time = selectedDates[0];
    }
  },
};

refs.timer.style.display = 'flex';
refs.timer.style.width = '400px';
refs.timer.style.justifyContent = 'space-between';
refs.values.forEach(field => {
  field.style.display = 'block';
  field.style.fontSize = '32px';
});

let intervalId = null;
let time = null;

flatpickr(refs.input, options);
refs.startBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', onClick);
function onClick() {
  refs.startBtn.setAttribute('disabled', '');
  intervalId = setInterval(timerUpdate, 1000);
}

function timerUpdate() {
  const timeLeftMs = time - new Date();
  if (timeLeftMs < 1000) {
    clearInterval(intervalId);
  }
  const timeLeft = convertMs(timeLeftMs);
  refs.days.textContent = addLeadingZero(timeLeft.days);
  refs.hours.textContent = addLeadingZero(timeLeft.hours);
  refs.minutes.textContent = addLeadingZero(timeLeft.minutes);
  refs.seconds.textContent = addLeadingZero(timeLeft.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
