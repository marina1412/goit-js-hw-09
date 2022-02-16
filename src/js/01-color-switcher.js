const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let intervalId;

stopRef.addEventListener('click', () => {
    clearInterval(intervalId);
    startRef.removeAttribute('disabled', false);
    stopRef.setAttribute('disabled', true);
})

startRef.addEventListener('click', () => {
    intervalId = setInterval(() => {
        bodyRef.style.background = getRandomHexColor();
    }, 1000);
    startRef.setAttribute('disabled', true);
    stopRef.removeAttribute('disabled', false);
});





function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
