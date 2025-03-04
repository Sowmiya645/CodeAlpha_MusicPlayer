const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const progressBar = document.getElementById('progress-bar');
const trackList = document.getElementById('track-list');


const tracks = [
    { title: "Shape of You", src: "shape_of_you.mp3" },
    { title: "Blinding Lights", src: "blinding_lights.mp3" },
    { title: "Levitating", src: "levitating.mp3" }
];

let currentTrackIndex = 0;


loadTrack(currentTrackIndex);


function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    progressBar.value = 0; 
    audio.currentTime = 0;
}


function playTrack() {
    audio.play();
}

function pauseTrack() {
    audio.pause();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; 
    loadTrack(currentTrackIndex);
    playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; 
    loadTrack(currentTrackIndex);
    playTrack();
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playTrack();
    });
    trackList.appendChild(li);
});

audio.addEventListener('ended', nextTrack);
