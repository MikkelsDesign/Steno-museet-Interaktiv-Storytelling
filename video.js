"use strict";


const startBtn = document.getElementById("start-knap");
const body = document.body;

// Style til video container
startBtn.addEventListener("click", () => {
  const videoContainer = document.createElement("div");
  videoContainer.id = "video-container";
  videoContainer.style.position = "fixed";
  videoContainer.style.top = "0";
  videoContainer.style.left = "0";
  videoContainer.style.width = "100%";
  videoContainer.style.height = "100%";
  videoContainer.style.zIndex = "500";
  videoContainer.style.backgroundColor = "black";
  videoContainer.style.opacity = "0";
  videoContainer.style.transition = "opacity 1s ease";

    // Style til video
  const video = document.createElement("video");
  video.id = "intro-video";
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
  video.controls = false;
  video.autoplay = false;

  // Tilføjer kilde til videoen
  const source = document.createElement("source");
  source.src = "/Video/Steno Video 3.mp4";
  source.type = "video/mp4";

    // Tilføjer video til containeren og containeren til body
  video.appendChild(source);
  videoContainer.appendChild(video);
  body.appendChild(videoContainer);

    // Fade out effekten for alle elementer undtagen video containeren
  const elementsToFade = document.querySelectorAll(
    "body > *:not(#menu):not(#video-container):not(#burgericon)"
  );
  elementsToFade.forEach((element) => {
    element.style.transition = "opacity 1s ease";
    element.style.opacity = "0";
  });

    // Fade in video containeren
  setTimeout(() => {
    elementsToFade.forEach((element) => {
      element.style.display = "none";
    });
    videoContainer.style.opacity = "1";
    video.play();

    // Når videoen er færdig, skift til næste side med tutorial
    video.addEventListener("ended", () => {
      window.location.href = "introTilSpil.html";
    });
  }, 1000);
});
