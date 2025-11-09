// generate input untuk 7 musuh
const container = document.getElementById("input-container");
let html = "";
for (let i = 1; i <= 7; i++) { // fix 7 musuh
  html += `
    <div>
      <div class="input-group input-group-sm w-100">
        <span class="input-group-text">${i}</span>
        <input type="text" class="form-control" id="enemy${i}" placeholder="Musuh ${i}">
      </div>
    </div>`;
}
container.innerHTML = html;

// definisi ronde
const rounds = [
  { name: "Putaran 1", pattern: ["Creep", "P", "P", "P"], event: "Fate Lelang (lelang hero awal)" },
  { name: "Putaran 2", pattern: ["P", "P", "Creep", "P", "P", "P"], event: "Fate Box (pilihan buff/item acak)" },
  { name: "Putaran 3", pattern: ["P", "P", "Creep", "P", "P", "P"], event: "Fate Box" },
  { name: "Putaran 4", pattern: ["P", "P", "Creep", "P", "P", "P"], event: "Fate Box" },
  { name: "Putaran 5", pattern: ["P", "P", "Creep", "P", "P", "P"], event: "Fate Box (Final)" },
];

// fungsi generate prediksi
function generatePrediction() {
  const enemies = [];
  for (let i = 1; i <= 7; i++) { // ambil 7 musuh
    const val = document.getElementById(`enemy${i}`).value.trim() || `Musuh ${i}`;
    enemies.push(val);
  }

  let resultHTML = "";
  let enemyIndex = 0;

  rounds.forEach((round) => {
    resultHTML += `<div class="card mb-3 p-3">
      <h5 class="text-info mb-2">🌀 ${round.name}</h5>`;

    round.pattern.forEach((type, j) => {
      if (type === "Creep") {
        resultHTML += `<div class="white">Ronde ${j + 1}: <span class="creep">🧟 Creep</span></div>`;
      } else {
        resultHTML += `<div class="white">Ronde ${j + 1}: ${enemies[enemyIndex % enemies.length]}</div>`;
        enemyIndex++;
      }
    });

    resultHTML += `<div class="fate-event">🎯 ${round.event}</div>`;
    resultHTML += `</div>`;
  });

  document.getElementById("result").innerHTML = resultHTML;
}
