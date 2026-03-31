const form = document.querySelector("#form");
const ouptut = document.querySelector("#output");

const FPS = 60;
const TIME_LOST_TO_PAUSE = 64;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formObject = Object.fromEntries(new FormData(event.target));
  Object.keys(formObject).forEach((key) => formObject[key] = Number(formObject[key]))

  const pauseFrameCount = formObject["num_menus"] * TIME_LOST_TO_PAUSE;
  const totalMenuFrameCount = pauseFrameCount + formObject["num_cursor"] + formObject["idle_frames"];

  const secondsInFrames = formObject["seconds"] * FPS;
  const roomFrameCount = secondsInFrames + formObject["frames"];

  const timeWithoutMenu = roomFrameCount - totalMenuFrameCount;

  const secondsPortion = Math.floor(timeWithoutMenu / FPS).toString();
  const framePortion = (timeWithoutMenu % FPS).toString().padStart(2, "0");

  output.textContent = `${secondsPortion}'${framePortion}`;
  event.target.reset();
})
