// only allow one sound to play at a time using a singleton cache
const playOneSound = (name) => {
  if (window.currentPupAudioFile) {
    window.currentPupAudioFile.pause();
  }
  window.currentPupAudioFile = playSound(name);
}

// This plays the audio clip on mouse click of the button
const playSound = (name) => {
  const audioElement = document.createElement('audio');
  const path = `assets/audio/${name}-audio.wav`;

  audioElement.setAttribute('src', path);

  // This last bit of code should stop the mouse click spam. Instead audioElement returns as  "<audio src="assets/audio/marshall-audio.wav"></audio>"
  // While the working version of audio on button click returns "<audio src="assets/audio/marshall-audio.wav"></audio>"
  audioElement.currentTime = 0;
  audioElement.play();
  return audioElement;
}

const playSoundAndAnimate = (name) => {
  const el = document.getElementById(`pup-${name}`);

  console.log(name);
  el.classList.add('playing');
  playOneSound(name);
}

// remove playing from pup div
const removePlayingClass = (e) => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// handleClick factory binding onClick with name
const handleOnClick = name => e => playSoundAndAnimate(name);

const handleOnPress = (e) => {
  const pup = KeyPupMap[e.keyCode];
  if (!pup) return;  // Stops function if there are no keys that match

  playSoundAndAnimate(pup);
}

// setup removeTransition and pupClickHandler
const addPupEventListenter = (name) => {
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
  55: 'tracker',
  56: 'everest',
  57: 'robodog',
  48: 'ryder',
};

window.addEventListener('load', (e) => {
  console.log('hello paw patroller');

  window.addEventListener('keydown', handleOnPress); // This plays the audio clip on key keydown
  Object.values(KeyPupMap).forEach(addPupEventListenter)
});
