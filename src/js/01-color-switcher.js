const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let changeIntervalId = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick(event) {
  changeIntervalId = setInterval(changeColor, 1000);

  function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.setAttribute('disabled', '');
    console.log(`change color`);
  }
}

function onStopClick(event) {
  clearInterval(changeIntervalId);
  refs.startBtn.removeAttribute('disabled');
  console.log(`Interval with id ${changeIntervalId} has stopped!`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
