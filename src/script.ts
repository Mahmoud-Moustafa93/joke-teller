import { VoiceRSS } from "./voice";

const button = document.getElementById("jokeButton") as HTMLButtonElement;
export const audioElement = document.getElementById(
  "jokeAudio"
) as HTMLAudioElement;

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMeAJoke(joke: string) {
  const apiKey = "4f5ea65acd3643fc881c688de9e5858b";
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  let joke = "";

  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    data?.joke
      ? (joke = data.joke)
      : (joke = `${data.setup} ... ${data.delivery}`);

    tellMeAJoke(joke);

    toggleButton();
  } catch (err: any) {
    console.error(err.message);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
