let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
};

const displayEndTime = (timetamp) => {
  const end = new Date(timetamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes} (${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes})`;
};

const startTime = (e) => {
  const seconds = parseInt(e.currentTarget.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mins = e.currentTarget.minutes.value;
  console.log(mins)
  timer(mins * 60);
  e.currentTarget.reset();
});
