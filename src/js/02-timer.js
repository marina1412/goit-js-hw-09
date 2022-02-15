import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const startRef = document.querySelector('button[data-start]');
const myInput = document.getElementById('datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minsRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');
let eventDate = null;

startRef.setAttribute('disabled', false);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentTime = Date.now();
      if (selectedDates[0] < currentTime) {
          Notiflix.Notify.failure('Please choose a date in the future');
          return;
      };
      startRef.removeAttribute('disabled', false);
      eventDate = selectedDates[0].getTime();
  },
};

flatpickr(myInput, options);

startRef.addEventListener('click', onStart);

function onStart() {
    const intervalId = setInterval(() => {
        const time = eventDate - Date.now();
        const timerComponents = convertMs(time);
        startRef.setAttribute('disabled', false);
        if (time < 0) {
            clearInterval(intervalId);
            return;
        };
        updateClockFace(timerComponents);
    }, 1000);
    

}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${minutes}`;
    secRef.textContent = `${seconds}`;
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero (Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}



