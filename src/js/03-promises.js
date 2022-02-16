import Notiflix from 'notiflix';
const firstDelayRef = document.querySelector('input[name=delay]');
const stepRef = document.querySelector('input[name=step]');
const amountRef = document.querySelector('input[name=amount]');
const formRef = document.querySelector('.form')

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        }
        reject({ position, delay });
      }, delay);
    });
  };




formRef.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const step = Number(stepRef.value);
const amount = Number(amountRef.value);
const delay = Number(firstDelayRef.value);
  let time = delay;
  formRef.reset();
  for (let i = 1; i <= amount; i += 1) {
    
      createPromise(i, time)
  .then(({ position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    time = time + step;
  }
})

  