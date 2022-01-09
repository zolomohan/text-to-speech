// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Set speech Language
speech.lang = "en";

// global array of available voices
let voices = [];

speechSynthesis.onvoiceschanged = () => {
  populateVoiceList();
}

function populateVoiceList() {
  // Get list of voices
  voices = speechSynthesis.getVoices();

  // Sort the list alphabetically
  voices.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
    if (fa < fb) { return -1; }
    if (fa > fb) { return 1; }
    return 0;
  });

  // Initially set the First Voice in the Array.
  speech.voice = voices[0];

  let voiceSelect = document.querySelector("#voices");

  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    // Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.
    option.setAttribute("value", i);

    voiceSelect.appendChild(option);
  })
}

// If the Browser supports speechSynthesis populate Voice List
if (typeof speechSynthesis !== "undefined") {
  populateVoiceList();
}

document.querySelector("#rate").addEventListener("input", () => {
  // Get rate Value from the input
  const rate = document.querySelector("#rate").value;

  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  // Get volume value from the input
  const volume = document.querySelector("#volume").value;

  // Set volume property of the SpeechSynthesisUtterance instance
  speech.volume = volume;

  // Update the volume label
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  // Get pitch value from the input
  const pitch = document.querySelector("#pitch").value;

  // Set pitch property of the SpeechSynthesisUtterance instance
  speech.pitch = pitch;

  // Update the pitch label
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  // On Voice change, use the value of the select menu (which is the index of the voice in the global voice array)
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  // Set the text property with the value of the textarea
  speech.text = document.querySelector("textarea").value;

  // Start Speaking
  speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  // Pause the speechSynthesis instance
  speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  // Resume the paused speechSynthesis instance
  speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  // Cancel the speechSynthesis instance
  speechSynthesis.cancel();
});
