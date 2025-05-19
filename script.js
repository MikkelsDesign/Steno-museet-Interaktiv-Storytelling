// START KNAP FUNCTIONALITY
const startBtn = document.getElementById('start-knap');
const body = document.body;

startBtn.addEventListener('click', () => {
    // Create a container for the video
    const videoContainer = document.createElement('div');
    videoContainer.id = 'video-container';
    videoContainer.style.position = 'fixed';
    videoContainer.style.top = '0';
    videoContainer.style.left = '0';
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    videoContainer.style.zIndex = '500';
    videoContainer.style.backgroundColor = 'black';
    videoContainer.style.opacity = '0';
    videoContainer.style.transition = 'opacity 1s ease';
    
    // Create video element
    const video = document.createElement('video');
    video.id = 'intro-video';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'contain';
    video.controls = false;
    video.autoplay = false;
    
    // Add source to video
    const source = document.createElement('source');
    source.src = '/Video/Steno Video 3.mp4'; 
    source.type = 'video/mp4';
    
    video.appendChild(source);
    videoContainer.appendChild(video);
    body.appendChild(videoContainer);
    
    // Fade out all elements except menu
    const elementsToFade = document.querySelectorAll('body > *:not(#menu):not(#video-container):not(#burgericon)');
    elementsToFade.forEach(element => {
        element.style.transition = 'opacity 1s ease';
        element.style.opacity = '0';
    });
    
  // After fade out, play video
    setTimeout(() => {
        elementsToFade.forEach(element => {
            element.style.display = 'none';
        });
        videoContainer.style.opacity = '1';
        video.play();
        
        // When video ends, redirect to game page or show the next screen
        video.addEventListener('ended', () => {
            window.location.href = 'introTilSpil.html'; // Redirect to your game page
        });
    }, 1000); // Added timeout duration of 1000ms (1 second)
});


//BURGERMENU
let menu = document.querySelector("#menu");
const burgericon = document.querySelector("#burgericon");
const closeBtn = document.querySelector("#close");

burgericon.onclick = aabenOgLukMenu;
closeBtn.onclick = aabenOgLukMenu; // Gør at krydset kan lukke menuen

let synlig = false;

function aabenOgLukMenu() {
    if (!synlig) {
        menu.style.display = "flex";
        burgericon.style.display = "none"; // Skjul burgerikon
        synlig = true;
    } else {
        synlig = false;
        menu.style.display = "none";
        burgericon.style.display = "block"; // Vis burgerikon igen
    }
}
// SPROG OVERSÆTTELSE

// Oversættelser (sprog)
const translations = {
    da: {
        headline: "Hej med dig"
        
    },
    en: {
        headline: "Hello there"
    }
};
// Sprog-skift
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', function() {
    const valgtSprog = this.value;
    document.getElementById('headline').textContent = translations[valgtSprog].headline;
});


// mute/unmute---
const audio = document.getElementById("background-audio");
const muteButton = document.getElementById("mute-button");

audio.volume = 1.0; // Maks lyd
audio.muted = true;

muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "🔇 Slå lyd til" : "🔈 Slå lyd fra";
    if (!audio.muted) {
        audio.play(); // Nogle browsere kræver et play-kald efter unmute
    }
});