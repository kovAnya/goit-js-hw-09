import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(event.target.elements.delay.value);
  let step = Number(event.target.elements.step.value);
  let amount = Number(event.target.elements.amount.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return myPromise;
}
