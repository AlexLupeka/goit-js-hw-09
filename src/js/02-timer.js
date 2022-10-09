import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    const countdown = new Date(text.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      const { days, hours, minutes, seconds } = convertMs(countdown);
      daysTimer.textContent = days;
      hoursTimer.textContent = hours;
      minutesTimer.textContent = minutes;
      secondsTimer.textContent = seconds;
      if (seconds <= 9) {
        secondsTimer.style.color = 'tomato';
        secondsTimer.style.fontSize = '60px';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      secondsTimer.style.color = 'black';
      secondsTimer.style.fontSize = '30px';
      clearInterval(timer);
    }
  }, 1000);
});

flatpickr(text, options);
