console.log('hello paw patroller');

const removePlayingClass = (e) => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// This plays the audio clip on mouse click of the button
const playSound = (name) => {
  const audioElement = document.createElement('audio');
  const path = `assets/audio/${name}-audio.wav`;

  audioElement.setAttribute('src', path);

  // This last bit of code should stop the mouse click spam. Instead audioElement returns as  "<audio src="assets/audio/marshall-audio.wav"></audio>"
  // While the working version of audio on button click returns "<audio src="assets/audio/marshall-audio.wav"></audio>"
  audioElement.currentTime = 0;
  audioElement.play().then(() => audioElement.remove());
}

const playSoundAndAnimate = (name) => {
  const el = document.getElementById(`pup-${name}`);

  console.log(name);
  el.classList.add('playing');
  playSound(name);
}

// handleClick factory binding click handler to name
const handleOnClick = name => e => playSoundAndAnimate(name);

const handleOnPress = (e) => {
  const pup = KeyPupMap[e.keyCode];
  if (!pup) return;  // Stops function if there are no keys that match

  playSoundAndAnimate(pup);
}

// setup removeTransition and pupClickHandler
const setupPupClick = (name) => {
  const el = document.getElementById(`pup-${name}`);
  el.addEventListener('transitionend', removePlayingClass);
  el.addEventListener('click', handleOnClick(name));
}

const KeyPupMap = {
  49: 'chase',
  50: 'marshall',
  51: 'skye',
  52: 'rubble',
  53: 'rocky',
  54: 'zuma',
};

window.addEventListener('keydown', handleOnPress); // This plays the audio clip on key keydown
Object.values(KeyPupMap).forEach(setupPupClick)
