"use strict"; 

let isMuted = false; // Variabel der holder styr på, om lyden er slået fra eller ej

const backgroundAudio = document.getElementById('background-audio'); // Henter lyd-elementet fra DOM'en


document.getElementById('mute-icon').addEventListener('click', () => {
  isMuted = !isMuted; // Skifter mellem mute og ikke-mute

  const muteIcon = document.getElementById('mute-icon');
  muteIcon.src = isMuted ? 'img/lyd-fra.png' : 'img/lyd-til.png'; // Opdaterer ikonerne
 
 // muteIcon.alt = isMuted ? 'Lyd-fra' : 'Lyd-til'; // Opdaterer alternativ tekst for tilgængelighed

  // Mute eller afmute baggrundslyden
  if (backgroundAudio) {
    backgroundAudio.muted = isMuted;
  }
});
