let rateInput = document.querySelector("#rateInput");
let pitchInput = document.querySelector("#pitchInput");
let voiceSelect = document.querySelector("#voices");
let voices = [];

function loadVoices(){
  voices = window.speechSynthesis.getVoices();
  // console.log(voices);
}

function populateVoices(){
  loadVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice,index)=>{
    // console.log(voice);
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} ${voice.lang} `;
    voiceSelect.appendChild(option);
  });
}

// loadVoices();
window.speechSynthesis.addEventListener("voiceschanged", populateVoices);
populateVoices(voices);

document.querySelector("#speak").addEventListener("click", () => {
  let message = document.querySelector("#textInput").value;
  // console.log(message);
  let speech = new SpeechSynthesisUtterance(message);
  speech.rate = getSpeechRate();
  speech.pitch = getSpeechPitch();
  speech.voice = voices[voiceSelect.value];
  // console.log(`rate = ${speech.rate}, pitch = ${speech.pitch}`);
  window.speechSynthesis.speak(speech);
});

document.querySelector("#stop").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

function getSpeechRate() {
  // console.log(rateInput.value);
  return Number(rateInput.value);
}

function getSpeechPitch() {
  return Number(pitchInput.value);
}

//display rate and pitch value
document.querySelector("#rateInput").addEventListener("input",()=>{
  document.querySelector("#rateDisplay").textContent = rateInput.value;
});
document.querySelector("#pitchInput").addEventListener("input",()=>{
  document.querySelector("#pitchDisplay").textContent = pitchInput.value;
});