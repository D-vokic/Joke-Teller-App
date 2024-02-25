// JokeAPI Documentation: https://v2.jokeapi.dev/

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: "75811966d4af44c7be876265c7901f1b",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,racist,sexist,explicit,religious,political";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Errors Here
    console.log("Whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
