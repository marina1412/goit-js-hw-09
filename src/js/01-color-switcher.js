const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

stopRef.addEventListener('click', () => {
    clearInterval(IntervalId);
    startRef.removeAttribute('disabled', false);
    stopRef.setAttribute('disabled', true);
    console.log('Нажата стоп');
})

startRef.addEventListener('click', () => {
    IntervalId = setInterval(() => {
        bodyRef.style.background = getRandomHexColor();
    }, 1000);
    startRef.setAttribute('disabled', true);
    stopRef.removeAttribute('disabled', false);
});





function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
