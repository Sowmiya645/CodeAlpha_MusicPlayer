const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const progressBar = document.getElementById('progress-bar');
const trackList = document.getElementById('track-list');

// Update the tracks array with actual song names and file names
const tracks = [
    { title: "Shape of You", src: "shape_of_you.mp3" },
    { title: "Blinding Lights", src: "blinding_lights.mp3" },
    { title: "Levitating", src: "levitating.mp3" }
];

let currentTrackIndex = 0;

// Load the initial track
loadTrack(currentTrackIndex);

// Function to load a track
function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    progressBar.value = 0; // Reset progress bar
    audio.currentTime = 0; // Reset audio time
}

// Function to play the track
function playTrack() {
    audio.play();
}

// Function to pause the track
function pauseTrack() {
    audio.pause();
}

// Function to play the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to the first track
    loadTrack(currentTrackIndex);
    playTrack();
}

// Function to play the previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loop back to the last track
    loadTrack(currentTrackIndex);
    playTrack();
}

// Update progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Seek the audio when the progress bar is changed
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Event listeners for buttons
playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

// Populate the playlist
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

// Optional: Automatically play the next track when the current one ends
audio.addEventListener('ended', nextTrack);