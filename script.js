
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