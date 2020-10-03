'use strict';
const img = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progrssContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currenttimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadsong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// prevSong
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadsong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > 3) {
    songIndex = 0;
  }
  loadsong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadsong(songs[songIndex]);

// calculate duration
function updateDuration(duration) {
  // calculate Display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSecs = Math.floor(duration % 60);
  if (durationSecs < 10) {
    durationSecs = `0${durationSecs}`;
  }
  //Delay swtiching duration Element to aovid Nan
  if (durationSecs) {
    durationEl.textContent = `${durationMinutes}:${durationSecs}`;
  }
}

function updateCurrentTime(currentTime) {
  // calculate Display for current
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSecs = Math.floor(currentTime % 60);
  if (currentSecs < 10) {
    currentSecs = `0${currentSecs}`;
  }

  if (currentSecs) {
    currenttimeEl.textContent = `${currentMinutes}:${currentSecs}`;
  }
}

// Update progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update Progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    updateDuration(duration);
    updateCurrentTime(currentTime);
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickx = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickx / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progrssContainer.addEventListener('click', setProgressBar);
