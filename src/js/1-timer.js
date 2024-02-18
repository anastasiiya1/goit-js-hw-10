import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let countDownTimer;
const startBtn = document.querySelector('button');
const datetimePicker = document.querySelector('#datetime-picker');

disableStartBtn();

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        position: 'center',
        title: 'Error',
        message: 'Please choose a date in the future!',
      });
      disableStartBtn();
    } else {
      enableStartBtn();
    }
  },
});

function disableStartBtn() {
  startBtn.disabled = true;
}

function enableStartBtn() {
  startBtn.disabled = false;
  startBtn.addEventListener('click', startCountdown);
}

function startCountdown() {
  disableStartBtn();

  const currentTime = new Date().getTime();
  const remainingTime = userSelectedDate.getTime() - currentTime;

  if (countDownTimer) {
    clearInterval(countDownTimer);
  }

  countDownTimer = setInterval(function () {
    const now = new Date().getTime();
    const remainingTime = userSelectedDate.getTime() - now;

    if (remainingTime <= 0) {
      clearInterval(countDownTimer);
      updateTimerDisplay(0);
      enableStartBtn();
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}

function updateTimerDisplay(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
