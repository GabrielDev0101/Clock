const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

let lastSecondsDegrees = 90;

function updateHands(element, degrees) {
  if (degrees === 90 && lastSecondsDegrees === 444) { // 444 avoids the "snapback" issue when moving from 360 to 0 degrees.
    element.style.transition = 'none'; // Remove transition to avoid the snap.
  } else {
    element.style.transition = 'all 0.05s';
  }
  element.style.transform = `rotate(${degrees}deg)`;
}

function setDate() {
  const now = new Date();

  // Seconds
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  updateHands(secondHand, secondsDegrees);
  lastSecondsDegrees = secondsDegrees;

  // Minutes
  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  updateHands(minuteHand, minutesDegrees);

  // Hours
  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
  updateHands(hourHand, hoursDegrees);

  requestAnimationFrame(setDate); // Continue the animation loop
}

requestAnimationFrame(setDate);
