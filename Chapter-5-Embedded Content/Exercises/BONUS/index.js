const sampleData = [
    { name: "Ah-ha", file: "audio/ah-ha.mp3" },
    { name: "Dan", file: "audio/dan.mp3" },
    { name: "Back of the Net", file: "audio/back-of-the-net.mp3" },
    { name: "Bang Out of Order", file: "audio/bangoutoforder.mp3" },
    { name: "Email of the Evening", file: "audio/emailoftheevening.mp3" },
    { name: "Hello Partridge", file: "audio/hellopartridge.mp3" },
    { name: "I Ate a Scotch Egg", file: "audio/iateascotchegg.mp3" },
    { name: "I’m Confused", file: "audio/imconfused.mp3" },
    { name: "Surprise!", file: "audio/hellopartridge.mp3" },
    { name: "Alone", file: "audio/alone-296348.mp3" },
    { name: "Email of the Evening", file: "audio/emailoftheevening.mp3" },
    { name: "So Fresh", file: "audio/so-fresh-315255.mp3" },
    { name: "I Ate Scotch Egg", file: "audio/iateascotchegg.mp3" },
    { name: "Gorila", file: "audio/gorila-315977.mp3" },
    { name: "Gardens Stylish Chill", file: "audio/gardens-stylish-chill-303261.mp3" },
    { name: "Experimental Cinematic Hip-Hop", file: "audio/experimental-cinematic-hip-hop-315904.mp3" }
];

const samplesPerPage = 9;
let currentPage = 0;
const soundboard = document.getElementById("soundboard");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function loadSamples(page) {
  soundboard.innerHTML = "";
  const start = page * samplesPerPage;
  const end = Math.min(start + samplesPerPage, sampleData.length);
  const visibleSamples = sampleData.slice(start, end);

  visibleSamples.forEach(sample => {
    const btn = document.createElement("div");
    btn.className = "sample-button";
    btn.textContent = sample.name;

    const audio = new Audio(sample.file);
    audio.addEventListener("loadedmetadata", () => {
      const duration = document.createElement("div");
      duration.className = "duration";
      duration.textContent = `${audio.duration.toFixed(1)}s`;
      btn.appendChild(duration);
    });

    // Add click event to play sound when button is clicked
    btn.addEventListener("click", () => {
      audio.currentTime = 0; // Restart audio from the beginning
      audio.play();
    });

    soundboard.appendChild(btn);
  });

  // Show or hide navigation buttons based on the page number
  prevBtn.style.display = page === 0 ? "none" : "inline-block";
  nextBtn.style.display = end >= sampleData.length ? "none" : "inline-block";
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    loadSamples(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if ((currentPage + 1) * samplesPerPage < sampleData.length) {
    currentPage++;
    loadSamples(currentPage);
  }
});

loadSamples(currentPage);

// Text to Speech
document.getElementById("tts-button").addEventListener("click", () => {
  const text = document.getElementById("tts-input").value;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
});

  
